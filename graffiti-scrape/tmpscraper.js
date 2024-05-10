const axios = require('axios')
const express = require('express')
const mongoose = require('mongoose')
const sleep = require('util').promisify(setTimeout)

class Scraper {
  /**
   * Creates a new Scraper instance with the given port number,
   * initializes the Express app and MongoDB connection, and sets up the endpoints.
   *
   * @param {number} port - The port number to listen on.
   * @param {string} apiKey - The API key for the beaconcha.in API
   * @param {string} dbConnectionString - The connection string for connecting to the DB
   * @param {string} apiBaseUrl - The base url for the beaconcha.in API
   */
  constructor(port, apiKey, dbConnectionString, apiBaseUrl) {
    this.port = port
    this.apiKey = apiKey
    this.dbConnectionString = dbConnectionString
    this.apiBaseUrl = apiBaseUrl

    this.app = express()
    this.slots = this.getDbModel(mongoose)
    this.setupEndpoints()
  }

  /**
   * Starts the scraper app, connecting to the MongoDB database and listening for HTTP requests on the configured port.
   */
  async start() {
    await mongoose.connect(this.dbConnectionString, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })

    this.app.listen(this.port, () => {
      console.log(`Graffiti scraper listening on port ${this.port}`)
    })
  }

  /**
   * Sets up the HTTP endpoints for the scraper app.
   */
  setupEndpoints() {
    this.app.get('/sync', async (req, res) => {
      let lastSyncedEpoch, latestFinalizedEpochNumber, results

      const now = new Date().toUTCString()

      console.log('\nsyncing DB at:', now)

      // first get last known sync point from DB
      try {
        const lastSyncedSlot = await this.getLastSynchedEpoch()

        lastSyncedEpoch = lastSyncedSlot ? lastSyncedSlot.epoch : 'finalized'

        // lastSyncedEpoch = 'finalized'

        console.log('\nlast synced epoch', lastSyncedEpoch)
      } catch (e) {
        console.error('\nerror getting last known sync point from DB:', e.message, '\n')
        console.error(e)

        res.send(e)

        return
      }

      // then get the number of the last finalized epoch
      try {
        latestFinalizedEpochNumber = await this.getLatestFinalizedEpochNumber()

        // lastSyncedEpoch = 282,600

        if (!latestFinalizedEpochNumber) {
          throw new Error('Unable to retrieve latest finalized epoch from DB')
        }
      } catch (e) {
        console.error('\nerror getting the number of the last finalized epoch:', e.message, '\n')
        console.error(e)

        res.send(e)

        return
      }

      // iterate over each epoch until the last finalized one
      try {
        lastSyncedEpoch = lastSyncedEpoch == 'finalized' ? lastSyncedEpoch : lastSyncedEpoch + 1

        // lastSyncedEpoch = 'finalized'

        results = await this.syncSlotsToDb(282595, 282600)
      } catch (e) {
        console.error(
          '\nerror iterating over each epoch until the last finalized one:',
          e.message,
          '\n'
        )
        console.error(e)

        res.send(e)

        return
      }

      res.set('Content-Type', 'application/json')

      res.send({ epoch: latestFinalizedEpochNumber, status: 'OK', slots_synced: results.length })
    })

    this.app.get('/slots', async (req, res) => {
      const slotdata = await this.getSlotData()

      res.set('Content-Type', 'text/csv')

      res.send(slotdata)
    })

    this.app.get('/slots/:epoch', async (req, res) => {
      const slotdata = await this.getSlotData(req.params.epoch)

      res.set('Content-Type', 'text/csv')

      res.send(slotdata)
    })

    this.app.get('/status', async (req, res) => {
      const status = await this.getStatus()

      res.set('Content-Type', 'application/json')

      res.send(status)
    })
  }

  /**
   * Returns the MongoDB model for the "slots" collection.
   *
   * @param {mongoose} dbinstance - The mongoose ORM isntance
   * @return {mongoose.Model} - The model for the "slots" collection.
   */
  getDbModel(dbinstance) {
    const connection = dbinstance.connection

    connection.once('open', function () {
      console.log('MongoDB database connection established successfully')
    })

    const Schema = mongoose.Schema

    const slot = new Schema({
      epoch: Number,
      slot_number: Number,
      graffiti: String,
      proposer: Number,
      exec_fee_recipient: String,
      exec_block_hash: String,
      exec_block_number: Number,
      exec_timestamp: Number,
    })

    return mongoose.model('slots', slot)
  }

  /**
   * Retrieves slot data for the given epoch from the beaconcha.in API.
   *
   * @param {string} epoch - The epoch to retrieve data for, default is "finalized".
   * @return {Promise<Array>} - A Promise that resolves to an array of slot data objects.
   */
  async getEpochSlots(epoch = 'finalized') {
    console.log('\nretrieving data for', epoch)

    const url = `${this.apiBaseUrl}/${epoch}/slots?apikey=${this.apiKey}`

    let res = {}

    try {
      res = await axios.get(url)
    } catch (e) {
      console.error(e.code, url)
    }

    let data = []

    data = res && res.data && res.data.data

    console.log('retrieved data for', data && data[0].epoch)

    const graffiti = data
      // .filter((s) => s.graffiti_text.length)
      .map((s) => ({
        epoch: s.epoch,
        slot_number: s.slot,
        graffiti: s.graffiti_text,
        exec_fee_recipient: s.exec_fee_recipient,
        proposer: s.proposer,
        exec_block_hash: s.exec_block_hash,
        exec_block_number: s.exec_block_number,
        exec_timestamp: s.exec_timestamp,
      }))

    return graffiti
  }

  async getStatus() {
    let data = {}

    try {
      const lastSyncedSlot = await this.slots.findOne({}).sort({ epoch: 'desc' }).exec()
      const numberSlots = await this.slots.count({})

      data = {
        epoch: lastSyncedSlot.epoch,
        slot: lastSyncedSlot.slot_number,
        numberSlots,
      }
    } catch (err) {
      console.error(err)
    }

    return data
  }

  /**
   * Retrieves slot data from the MongoDB database for the given epoch or all epochs.
   *
   * @param {string|number} epoch - The epoch to retrieve data for, or undefined to retrieve data for all epochs.
   * @return {Promise<string>} - A Promise that resolves to the slot data in CSV format.
   */
  async getSlotData(epochNumber) {
    let csv =
      '"Epoch","Slot","Graffiti","Proposer","Fee Recipient","Exec Block Hash","Exec Block Number","Exec Block Timestamp"\n'

    try {
      const query =
        epochNumber != undefined && !isNaN(epochNumber) ? { epoch: { $gte: epochNumber } } : {}

      const data = await this.slots.find(query)

      console.log('\nexporting data, epoch: ', epochNumber)

      csv += data
        .map((slot) =>
          [
            `"${slot.epoch}"`,
            `"${slot.slot_number}"`,
            `"${slot.graffiti.replace(/"/g, '""')}"`,
            `"${slot.proposer}"`,
            `"${slot.exec_fee_recipient}"`,
            `"${slot.exec_block_hash}"`,
            `"${slot.exec_block_number}"`,
            `"${slot.exec_timestamp}"`,
          ].join(',')
        )
        .join('\n')
    } catch (err) {
      console.log(err)
    }

    return csv
  }

  /**
   * Retrieves the last synced epoch number from the MongoDB database.
   *
   * @return {Promise<number|null>} - A Promise that resolves to the epoch number of the last synced slot, or null if no slots have been synced yet.
   */
  async getLastSynchedEpoch() {
    const lastSyncedEpoch = this.slots.findOne({}).sort({ epoch: 'desc' }).exec()

    return lastSyncedEpoch
  }

  /**
   * Retrieves the epoch number of the latest finalized epoch from the beaconcha.in API.
   *
   * @return {Promise<number>} - A Promise that resolves to the epoch number of the latest finalized epoch.
   */
  async getLatestFinalizedEpochNumber() {
    const url = `${this.apiBaseUrl}/finalized?apikey=${this.apiKey}`

    let res = {}

    try {
      res = await axios.get(url)
    } catch (e) {
      console.error(e.code, url)
    }

    const data = res && res.data && res.data.data

    return data ? data.epoch : 0
  }

  /**
   * Syncs slot data for the specified range of epochs to the MongoDB database.
   *
   * @param {string|number} from - The epoch to start syncing from, or "finalized" to start syncing from the latest finalized epoch.
   * @param {number} to - The epoch to sync up to.
   * @param {Array} data - An array of slot data objects to append new data to.
   * @return {Promise<Array>} - A Promise that resolves to an array of all slot data objects that were synced.
   */
  async syncSlotsToDb(from, to, data = []) {
    console.log('\n starting from to', from)
    if (from > to) {
      console.log('\n completed sync!')

      return data
    }

    const graffiti = await this.getEpochSlots(from)

    data = [...data, ...graffiti]

    try {
      await this.slots.insertMany(graffiti)
    } catch (e) {
      console.error(e)
    }

    from = from == 'finalized' ? graffiti[0].epoch : from

    from++

    await sleep(1000)

    return await this.syncSlotsToDb(from, to, data)
  }
}

module.exports = Scraper
