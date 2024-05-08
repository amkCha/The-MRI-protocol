import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { WagmiProvider } from 'wagmi'
import { mainnet, lineaTestnet} from '@wagmi/core/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {ReactNode} from "react";

// 0. Setup queryClient
const queryClient = new QueryClient()

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = '36b690162c1a64cc8e24c39c78357750'

// 2. Create wagmiConfig
const metadata = {
  name: 'Proof of minority clients',
  description: 'Issue attestation of minority clients',
  url: 'https://github.com/amkCha/The-MRI-protocol', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [mainnet, lineaTestnet] as const
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata
})

// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
})

interface Web3ModalProviderProps {
    children: ReactNode;
}

export function Web3ModalProvider({children}: Readonly<Web3ModalProviderProps>)  {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}