import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
import { App } from './App.tsx'
import { config } from './config.ts'

const queryClient = new QueryClient()

if (typeof window !== 'undefined') {
  const hostname = window.location.hostname
  if (hostname === '127.0.0.1' || hostname === '0.0.0.0') {
    const url = new URL(window.location.href)
    url.hostname = 'localhost'
    window.location.replace(url.toString())
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>,
)
