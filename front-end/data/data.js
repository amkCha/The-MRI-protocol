import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { decodeEventLog, parseAbi } from "viem";
import {waitForTransactionReceipt} from "viem/actions";
import {useAccount} from "wagmi";
import {VeraxSdk} from "@verax-attestation-registry/verax-sdk";
import { config } from './Web3ModalProvider'


function App() {


  const {address, chainId} = useAccount();

  const me ="0x18cAF1E4E9c2e179678d8cc538f10298b503CCcd"

  const sdkConf = chainId === 59144 ? VeraxSdk.DEFAULT_LINEA_MAINNET_FRONTEND : VeraxSdk.DEFAULT_LINEA_TESTNET_FRONTEND;
  const veraxSdk = new VeraxSdk(sdkConf, address);

  const SCHEMA = '(string client, uint16 numberValidators, bool isMinority)';
  const [count, setCount] = useState(0)

  const createSchema = async () => {
        try {
            let txHash = await veraxSdk.schema.create(
              "Tutorial Schema",
              "This Schema is used for the tutorial",
              "https://ver.ax/#/tutorials",
              SCHEMA,
          );
          console.log(txHash)
        } catch (e) {
            console.log(e);
            if (e instanceof Error) {
                alert(`Oops, something went wrong: ${e.message}`);
            }
        }
};

const getSchemaId = async () => { 
  const receipt = await waitForTransactionReceipt(config.getClient(), {
    hash: "0x87f7938bfbea968d45dd1a23332335c67b2ff70f3b70a10a880919037f1014e6",
  });
  const schemaId = receipt.logs[0].topics[1];
  console.log(schemaId)
}

const schemaId = '0xeae119334efc0d38d562c53f2347b4f9c33f4b3addf6d1d9f02274be8ef31399';

const createPortal = async () => {
      try {
          let txHash = await veraxSdk.portal.deployDefaultPortal(
            [],
            "Tutorial Portal",
            "This Portal is used for the tutorial",
            true,
            "Verax Tutorial",
        );
        console.log(txHash)
      } catch (e) {
          console.log(e);
          if (e instanceof Error) {
              alert(`Oops, something went wrong: ${e.message}`);
          }
      }
};

const getPortalId= async () => { 
  const receipt = await waitForTransactionReceipt(config.getClient(), {
    hash: "0x0240a5fff2064a35251dd66ba5b4eb0ce6031cb9d1f8442a2231614380c29f09",
  });
  const decodedLogs = decodeEventLog({
    abi: parseAbi(["event PortalRegistered(string name, string description, address portalAddress)"]),
    data: receipt.logs[0].data,
    topics: receipt.logs[0].topics,
 });
 const portalId = decodedLogs.args.portalAddress;
  console.log(portalId)
}

const portalId = "0xD0c295322D1bcfF4D0532D5e671584f127edCF03";

const attestClient = async () => {
      try {
          let txHash = await veraxSdk.portal.attest(
            portalId,
            {
                schemaId,
                expirationDate: Math.floor(Date.now() / 1000) + 2592000,
                subject: me,
                attestationData: [{client: "besu", numberValidators: 10, isMinority: true}],
            },
            [],
        );
       console.log(txHash)
      } catch (e) {
          console.log(e);
          if (e instanceof Error) {
              alert(`Oops, something went wrong: ${e.message}`);
          }
      }
};

const getAttestationId = async () => {
  try {
    const receipt = await waitForTransactionReceipt(config.getClient(), {
      hash: "0xaa010066d96573be845be0f2b1c37068d4bbac1361b9175a8a50e9aed846b513",
    });
   const attestationId = receipt.logs?.[0].topics[1];
   console.log(attestationId)
  } catch (e) {
      console.log(e);
      if (e instanceof Error) {
          alert(`Oops, something went wrong: ${e.message}`);
      }
  }
};

const attestationId ="0x0000000000000000000000000000000000000000000000000000000000001881"

const getAttestation = async () => {
  try {
    const attestation = await veraxSdk.attestation.getAttestation(attestationId);
   console.log(attestation)
  } catch (e) {
      console.log(e);
      if (e instanceof Error) {
          alert(`Oops, something went wrong: ${e.message}`);
      }
  }
};

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={() => createSchema()}>
          create schema
        </button>
        <button onClick={() => createPortal()}>
          create portal
        </button>
        <button onClick={() => getSchemaId()}>
          get schema Id
        </button>
        <button onClick={() => getPortalId()}>
          get portal Id
        </button>
        <button onClick={() => attestClient()}>
          attest a client
        </button>
        <button onClick={() => getAttestationId()}>
          get Attestation Id
        </button>
        <button onClick={() => getAttestation()}>
          get Attestation
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
