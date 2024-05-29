# The-MRI-protocol
A generalizable protocol for reporting and incentivizing aspects of node diversity, that can be used for Ethereum and beyond. 

For the Consensys Cypherpunk hackathon 2024, we developed a simple and efficient protocol addressing the current lack of Client diversity on Ethereum. 

## The proposed Minority Report Incentive protocol

Teku's latest release contains an opt-out Graffiti usage to tag consensus and execution client information on chain ([release](https://github.com/Consensys/teku/releases/tag/24.4.0)). The trend seems to be going in the direction of other clients adopting this standard: [Lodestar](https://github.com/ChainSafe/lodestar/issues/6463), [Lighthouse](https://github.com/sigp/lighthouse/issues/5284).

This will improve the reporting of aspects of node diversity in order to take action based off these data.

The MRI committee uses the Verax attestation protocol to issue quarterly attestations for each client to report the client’s distribution using this newly reported data. Verax is Linea's attestation registry whose main issuers are Trusta and Gitcoin passport (https://explorer.ver.ax/linea).

Via an Ecosystem-friendly relay that would only accept blocks that send 1% of the MEV to the MRI contract, we collect funds in a smart contract that can then pay out to client development teams and possibly, in a later iteration, to node runners to encourage reporting.

Every quarter, client developments teams can request funds from the MRI smart contract that will look to Verax to attest the validity of the request. Funds will be distibuted with a premium for minority clients to strengthen their footprint and their contributors base. 

![alt text](<protocol-diagrams/The MRI protocol.png>)

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
- on a more social level, I think with time, it can become a norm to share this data and we won't even think about it. Moreover, the argument is that issuing this information makes you a target in case their is a bug discovered on the client you are running. My point is that the number of clients is small and if a bug is discovered, an attack consisting of reaching out to random validators without knowing what client they run would work as well. Especially if it's Geth, you have 2/3 chances to reach a validator running it

**What's the difference with Protocol Guild ?**

While Protocol Guild is also a source of funding, it has as incentive to keep the talent pool working on the L1 and does not specifically focus on Client Diversity. The funding is distributed to individuals and not teams. The funds raised can be in the form of
- L2s tokens. Core dev's portfolio is a mirror of the ecosystem
- or in fiat. It then requires an audit step before funds can be released.
The MRI protocol is stays in the Ethereum L1 realm, with funds in Eth, but is not embedded in the core protocol.


Happy to discuss any of the above in a PR, have more insights for the protocol and improve the FAQ section !

## Graffiti's usage since Teku's 24.4.0 release

Teku 24.4.0 was released on Week 17. 
Since its release, out of the 60% of Graffitis that are used

|        | Week 18 | Week 19 | Week 20 | Week 21 |
|--------|---------|---------|---------|---------|
|Teku tag| 5%      |    12%  |     15% |     16% |

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

## Bibliography

- Ethereum Foundation Client Incentive Program
https://blog.ethereum.org/2021/12/13/client-incentive-program

- About the importance of Client diversity
https://clientdiversity.org/

- Current data about Client diversity
https://supermajority.info/

- Spec for Execution Layer to expose client information via engine API
https://github.com/ethereum/execution-apis/pull/517

- Teku's blogpost about latest release
https://mirror.xyz/0x65a63ceE206bFA6B2a3287479D28c8902B4055E9/8u3oxjWyAU1JVBhu7U1y0luO5hRBXFj1Plrby-X1kMI

- MEV data
https://transparency.flashbots.net/

- Video about Protocol Guild
https://youtu.be/9Tc2g7pu-gc?t=368
