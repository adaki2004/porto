import { cloudflare } from '@cloudflare/vite-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const useCloudflarePlugin = process.env.USE_CLOUDFLARE_PLUGIN === 'true'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), ...(useCloudflarePlugin ? [cloudflare()] : [])],
  server: {
    cors: {
      origin: '*',
    },
  },
})
