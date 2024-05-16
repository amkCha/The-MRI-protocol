# The-MRI-protocol
A generalizable protocol for reporting and incentivizing aspects of node diversity, that can be used for Ethereum and beyond. 

For the hackathon, we developed a simple and efficient protocol tackling the current lack of Client diversity on Ethereum. 

## The proposed Minority Report Incentive protocol

Clients release an opt-out Graffiti usage to tag client information on chain

This will improve the reporting of aspects of node diversity in order to take action based off these data

The MRI committee uses the Verax attestation protocol to issue an attestation quarterly for reporting the client’s distribution using this newly reported data

Via transaction bundling and MEV capture techniques, 1% tithing / donations can be made by users (via Smart Transactions) to a smart contract that can pay out to client development teams and possibly to node runners to encourage reporting

Every quarter, client developments teams can request funds from the smart contract that will use Verax to attest the validity of the request 

## FAQ about the protocol

**Validators can spoof the client information reported making the reporting unreliable**

There are many arguments that one can put forward to address this question: 
- this protocol has google-like incentives. Validators share their data in return of which they will have a better product: better bug-proof supported clients and a better diversified network
- the amount of funding at play would make a difference for a development team, but is not enough for an actor to want to run thousands of validators to hack the diversity report
- the data collected from the Graffiti could be crossed with the data collected from polls and be used by the MRI committee taking care of the attestation issuance. It's still more information than we currently have
- finally, one of the solutions we thought about would be to split the collected funds equally between the client teams. It would represent a significant amount for minority clients and still help strengthen their community. The goal here is really to create a social norm via the Ecosytem friendly MEV relay. Clients are also very supportive of one another and wouldn't want a distribution of funds that is strongly skewed (30% difference max)

**Validators can be wary to report their client information to avoid attacks**

This is a good point. On this, we can have a technical answer and a social answer
- for the technical answer, research is being done to issue this information anonymously. Here is a report done by the Nethermind team
https://ethresear.ch/t/research-report-allowing-validators-to-share-client-information-privately-a-project-by-nethermind-research/19506
- on a more social level, I think with time, it can become a norm to share this data and we won't even think about it. We share more sensitive information today that we don't think of imo. Moreover, the argument is that issuing this information makes you a target in case their is a bug discovered on the client you are running. My point is that the number of clients is small and if a bug is discovered, an attack consisting of reaching out to random validators without knowing what client they run would work as well. Especially if it's Geth, you have 2/3 chances to reach a validator running it

Please open a PR to discuss any of the above, would be happy to have more insights and improve the FAQ section !

## Graffiti's usage since Teku's release

Out of the 60% of Graffitis that are used

| |Week 1| Week 2 | Week 3 |
|-----|--------|--------|--------|
|Teku tag| 5% | 12% | 16% |

## Structure of the repo

### protocol-diagrams

Diagrams to understand the MRI protocol

### graffiti-scrape

Data files containing Graffiti scrapes since the Teku release of an opt-out client information in the Graffiti

We used the following repo to obtain the information: https://github.com/orbmis/beacon-chain-graffiti-scraper

For which we replaced the `scraper.js` by `tmpscraper.js` to sync a wide range of slots

A call to `localhost:3000/sync` than syncs data from Beacon.in API to mongodb

### front-end

To issue Proof of minority attestations on Verax

`yarn install`

`npm run dev`

### smart-contracts

MRI contract to collect and release funds

### linea-attestation-registry-mock

Mock of linea's attestation registry explorer https://github.com/Consensys/linea-attestation-registry/tree/dev/explorer

Include the MRI protocol as issuer

`yarn install`

`npm run dev`

Go to `http://localhost:5173/linea`