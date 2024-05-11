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

  const SCHEMA = '(string client, uint256 numberValidators, uint16 rank, bool isMinority)';
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
    hash: "0x112912512f051ac5f560121185f26daedf0be29b0a6c72549bf0ab70402ac72c",
  });
  const schemaId = receipt.logs[0].topics[1];
  console.log(schemaId)
}

const schemaId = '0xa1a90844685924ce85a895b8e037aa6c21206fbd183a2a416b560370d3fba357';

const createPortal = async () => {
      try {
          let txHash = await veraxSdk.portal.deployDefaultPortal(
            [],
            "MRI Portal",
            "This Portal is used for the MRI protocol",
            true,
            "The MRI protocol",
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
    hash: "0xbe4f6eca09e898e1a2b3d653fd69128e0d49242f45fe9ae1fee5d5f19aeb4821",
  });
  const decodedLogs = decodeEventLog({
    abi: parseAbi(["event PortalRegistered(string name, string description, address portalAddress)"]),
    data: receipt.logs[0].data,
    topics: receipt.logs[0].topics,
 });
 const portalId = decodedLogs.args.portalAddress;
  console.log(portalId)
}

const portalId = "0xBb444aDa8e3FE3457F70f33dEd66e0d9B9103C3A";

const attestClient = async () => {
      try {
          let txHash = await veraxSdk.portal.attest(
            portalId,
            {
                schemaId,
                expirationDate: Math.floor(Date.now() / 1000) + 2592000,
                subject: me,
                attestationData: [{client: "besu", numberValidators: 100000, rank: 3, isMinority: true}],
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
      hash: "0xf411a7e6b601ea92734d881dd72f25f5d4c348998f121237ae1bbbc0b0d70bce",
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

const attestationId ="0x000000000000000000000000000000000000000000000000000000000000188f"

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
