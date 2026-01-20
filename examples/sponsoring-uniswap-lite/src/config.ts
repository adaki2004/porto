import { defineChain } from 'viem'
import { createConfig, createStorage, http } from 'wagmi'
import { injected } from 'wagmi/connectors'

const L1_RPC_URL = import.meta.env.VITE_L1_RPC_URL || 'http://127.0.0.1:32002'
const L2A_RPC_URL = import.meta.env.VITE_L2A_RPC_URL || 'http://127.0.0.1:32006'
const L2B_RPC_URL = import.meta.env.VITE_L2B_RPC_URL || 'http://127.0.0.1:32007'

export const gwynethL1 = defineChain({
  blockExplorers: {
    default: {
      name: 'Gwyneth Explorer (devnet)',
      url: L1_RPC_URL,
    },
  },
  id: 160010,
  name: 'Gwyneth L1',
  nativeCurrency: { decimals: 18, name: 'Ether', symbol: 'ETH' },
  network: 'gwyneth-l1',
  rpcUrls: {
    default: { http: [L1_RPC_URL] },
    public: { http: [L1_RPC_URL] },
  },
})

export const gwynethL2A = defineChain({
  blockExplorers: {
    default: {
      name: 'Gwyneth Explorer (devnet)',
      url: L2A_RPC_URL,
    },
  },
  id: 167010,
  name: 'Gwyneth L2A',
  nativeCurrency: { decimals: 18, name: 'Ether', symbol: 'ETH' },
  network: 'gwyneth-l2a',
  rpcUrls: {
    default: { http: [L2A_RPC_URL] },
    public: { http: [L2A_RPC_URL] },
  },
})

export const gwynethL2B = defineChain({
  blockExplorers: {
    default: {
      name: 'Gwyneth Explorer (devnet)',
      url: L2B_RPC_URL,
    },
  },
  id: 167011,
  name: 'Gwyneth L2B',
  nativeCurrency: { decimals: 18, name: 'Ether', symbol: 'ETH' },
  network: 'gwyneth-l2b',
  rpcUrls: {
    default: { http: [L2B_RPC_URL] },
    public: { http: [L2B_RPC_URL] },
  },
})

const storage =
  typeof window === 'undefined' ? undefined : window.sessionStorage
const wagmiStorage = storage
  ? createStorage({ key: 'gwyneth-uniswap-lite', storage })
  : undefined

export const config = createConfig({
  chains: [gwynethL1, gwynethL2A, gwynethL2B],
  connectors: [injected({ shimDisconnect: true })],
  multiInjectedProviderDiscovery: false,
  storage: wagmiStorage,
  transports: {
    [gwynethL1.id]: http(L1_RPC_URL),
    [gwynethL2A.id]: http(L2A_RPC_URL),
    [gwynethL2B.id]: http(L2B_RPC_URL),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
