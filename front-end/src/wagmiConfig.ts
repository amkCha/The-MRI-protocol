import {defaultWagmiConfig} from "@web3modal/wagmi/react/config";
import {linea, lineaTestnet, mainnet} from "wagmi/chains";

export const walletConnectProjectId = '68b9b40fbc3c45a909f03f864745955e'
const metadata = {
    name: 'Proof of Audit',
    description: 'Issue attestation of audits',
    url: 'https://audit.examples.ver.ax', // origin must match your domain & subdomain
    icons: ['https://avatars.githubusercontent.com/u/37784886']
}
const chains = [lineaTestnet, linea, mainnet] as const
export const wagmiConfig = defaultWagmiConfig({
    chains,
    projectId: walletConnectProjectId,
    metadata,
    enableCoinbase: false
})
