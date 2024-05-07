// import { Web3ModalProvider } from "./components/web3ModalProvider";
import {VeraxSdk} from "@verax-attestation-registry/verax-sdk";

const address = "0x18cAF1E4E9c2e179678d8cc538f10298b503CCcd"

const sdkConf = chain.id === 59144 ? VeraxSdk.DEFAULT_LINEA_MAINNET_FRONTEND : VeraxSdk.DEFAULT_LINEA_TESTNET_FRONTEND;
const veraxSdk = new VeraxSdk(sdkConf, address);

const SCHEMA = '(bool hasCompletedTutorial)';

const txHash = await veraxSdk.schema.create(
    "Tutorial Schema",
    "This Schema is used for the tutorial",
    "https://ver.ax/#/tutorials",
    SCHEMA,
);

console.log(txHash)

// const schemaId = (await veraxSdk.schema.getIdFromSchemaString(SCHEMA)) as Hex;

// const alreadyExists = (await veraxSdk.schema.getSchema(schemaId)) as boolean;

// const receipt = await waitForTransactionReceipt(getPublicClient(), {
//     hash: txHash,
// });
// const schemaId = receipt.logs[0].topics[1];