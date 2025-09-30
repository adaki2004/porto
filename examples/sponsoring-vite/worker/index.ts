import { env } from 'cloudflare:workers'
import { Route, Router } from 'porto/server'
import { http } from 'viem'
import * as Contracts from '../src/contracts.ts'

const relayTransport = env.MERCHANT_RELAY_URL
  ? http(env.MERCHANT_RELAY_URL)
  : undefined

export default Router({ basePath: '/porto' }).route(
  '/merchant',
  Route.merchant({
    address: env.MERCHANT_ADDRESS,
    key: env.MERCHANT_PRIVATE_KEY,
    ...(relayTransport ? { relay: relayTransport } : {}),
    sponsor(request) {
      return request.calls.every((call) => call.to === Contracts.exp1Address)
    },
  }),
) satisfies ExportedHandler<Env>
