# The-MRI-protocol
A generalizable protocol for reporting and incentivizing aspects of node diversity, that can be used for Ethereum and beyond. 

For the hackathon, we developed a simple and efficient protocol tackling the current lack of Client diversity on Ethereum. 

The proposed Minority Report Incentive protocol is the following: 

Clients release an opt-out Graffiti usage to tag client information on chain

This will improve the reporting of aspects of node diversity in order to take action based off these data

The MRI committee uses the Verax attestation protocol to issue an attestation quarterly for reporting the client’s distribution using this auditable data

Via transaction bundling and MEV capture techniques, 1% tithing / donations can be made by users (via Smart Transactions) to a smart contract that can pay out to client development teams and possibly to node runners to encourage reporting

Every quarter, client developments teams can request funds from the smart contract that will use Verax to attest the validity of the request 

In this repo

## protocol-diagrams

Diagrams to understand the MRI protocol

## graffiti-scrape

Data files containing Graffiti scrapes since the Teku release of an opt-out client information in the Graffiti

We used the following repo to obtain the information: https://github.com/orbmis/beacon-chain-graffiti-scraper

For which we replaced the `scraper.js` by `tmpscraper.js` to sync a wide range of slots

A call to `localhost:3000/sync` than syncs data from Beacon.in API to mongodb

## front-end

To issue Proof of minority attestations on Verax

`yarn install`

`npm run dev`

## smart-contracts

MRI contract to collect and release funds