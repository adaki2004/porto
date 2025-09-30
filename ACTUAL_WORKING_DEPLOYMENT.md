# Porto ↦ Gwyneth Deployment Cookbook

This log reflects the exact sequence we just ran on this machine to get Porto
contracts live on the local **Gwyneth** L1 (chain ID `160010`), boot the relay,
wire up a merchant, and exercise the sponsoring example. Treat it as the source
of truth until we discover a better flow.

---

## 0. Prerequisites

- Gwyneth node listening on `http://localhost:32002` with a funded deployer EOA.  
  Export the key via `.env.gwyneth` → `DEPLOYER_PRIVATE_KEY`.
- Node.js ≥ 22.5 and pnpm ≥ 10 available via `nvm`.
- Docker Desktop running (relay container).
- Project dependencies installed (`pnpm install`).
- `.env.gwyneth` also carries the relay mnemonic and optional owner/funder keys.

Helper scripts we rely on:

- `scripts/setup-gwyneth-relay.sh`: registers orchestrator + relay signers, and
  optionally prefunds them.
- `scripts/setup-merchant.sh`: creates a sponsor EOA, funds it, and writes
  `examples/sponsoring-vite/.env`.

Both scripts expect `DEPLOYER_PRIVATE_KEY` (and default to the shared mnemonic).

---

## 1. Enter the repo with Node 22

```bash
cd /Users/keszeyd/work/porto/porto
source ~/.nvm/nvm.sh
nvm use 22.19.0
```

---

## 2. Build + deploy contracts

We only saw the relaxed signature logic on-chain after refreshing the generated
TypeScript bundles. The sequence that works every time:

```bash
pnpm build:contracts                          # regenerates _generated/contracts/*
pnpm deploy:gwyneth                           # deploys everything to chain 160010
```

If Foundry refuses to rebuild, force it once first:  
`forge build --force --config-path ./contracts/account/foundry.toml`.

Verify the deployed IthacaAccount matches your local build length:

```bash
cast code --rpc-url http://localhost:32002 \
  0x6f00caa972723c5e1d1012cdac385753c2aa3a93
```

The bytecode length should equal the JSON in
`contracts/account/out/IthacaAccount.sol/IthacaAccount.json` (hashes may differ
because of immutable address packing).

Artifacts land in `config/gwyneth-addresses.json`; the script also seeds
SimpleFunder with 10 ETH.

---

## 3. Prep SimpleFunder + relay signers

Let the helper script do the on-chain wiring and initial gas top-ups:

```bash
set -a
source .env.gwyneth
set +a

./scripts/setup-gwyneth-relay.sh --prefund 0.1
```

That single call:

1. Confirms the RPC works.
2. Registers `Orchestrator` via `setOrchestrators`.
3. Registers 16 signer EOAs derived from the mnemonic via `setGasWallet`.
4. Sends `0.1 ether` to each signer.

---

## 4. Launch the relay (manual Docker path)

We consistently get logs only when starting the container ourselves. From the
repo root (with `.env.gwyneth` sourced as above):

```bash
docker rm -f porto-relay-gwyneth >/dev/null 2>&1

docker run -d --name porto-relay-gwyneth \
  -e RUST_LOG=trace \
  -e RUST_BACKTRACE=1 \
  -p 9119:9119 \
  -p 9120:9120 \
  -v "$PWD/config/relay-gwyneth-runtime.yaml:/app/config.yaml:ro" \
  ghcr.io/ithacaxyz/relay:v24.0.8 \
  --config /app/config.yaml \
  --skip-diagnostics \
  --http.addr 0.0.0.0 \
  --http.port 9119 \
  --http.metrics-port 9120 \
  --signers-mnemonic "${RELAY_MNEMONIC:-test test test test test test test test test test test junk}" \
  --orchestrator 0x6db20c530b3f96cd5ef64da2b1b931cb8f264009 \
  --delegation-proxy 0xdec3326be4badb9a1fa7be473ef8370da775889a \
  --simulator 0x70e9f1967498e8d863b371d0d6b22da6b53e8d05 \
  --funder 0xcc97bb833f9d361fd8f65e02ba4b8413e1e0ae0d \
  --escrow 0xbfff570853d97636b78ebf262af953308924d3d8 \
  --funder-signing-key "${RELAY_FUNDER_SIGNER_KEY:-$DEPLOYER_PRIVATE_KEY}" \
  --funder-owner-key "${RELAY_FUNDER_OWNER_KEY:-$DEPLOYER_PRIVATE_KEY}"
```

Quick health checks:

```bash
curl -s http://localhost:9119/health
docker logs --tail 200 porto-relay-gwyneth
```

Leave `RUST_LOG=trace` while debugging; Docker Desktop otherwise hides most
activity on this hardware.

---

## 5. Merchant + sponsoring Vite app

Create and fund the merchant EOA that the Cloudflare worker uses to sign
`sponsor` payloads:

```bash
set -a
source .env.gwyneth
set +a

./scripts/setup-merchant.sh
```

Output example:

```
Merchant address: 0xdEf66Fc348301B42833a410cd154BD36b0Ae4139
Credentials written to examples/sponsoring-vite/.env
```

(We observed `cast wallet new --json` now returns an array, so the script
normalises that shape before writing the `.env` file.)

Run the merchant worker so the relay can fetch sponsorship quotes (either local via Wrangler in a Linux container or remote deploy):

```bash
cd examples/sponsoring-vite
pnpm wrangler dev \
  --var MERCHANT_ADDRESS=$MERCHANT_ADDRESS \
  --var MERCHANT_PRIVATE_KEY=$MERCHANT_PRIVATE_KEY \
  --var MERCHANT_RELAY_URL=http://localhost:9119 \
  --port 8787
```

In `examples/sponsoring-vite/.env` set:

```
MERCHANT_ADDRESS=$MERCHANT_ADDRESS
MERCHANT_PRIVATE_KEY=$MERCHANT_PRIVATE_KEY
MERCHANT_RELAY_URL=http://localhost:9119
VITE_PORTO_MERCHANT_URL=http://localhost:8787/porto/merchant
```

Restart the Vite dev server after changing the env file; Wrangler picks up env
changes automatically.

If macOS prevents the local runtime from starting, deploy the worker to Cloudflare instead:

```bash
pnpm wrangler deploy --name porto-merchant-local \
  --var MERCHANT_ADDRESS=$MERCHANT_ADDRESS \
  --var MERCHANT_PRIVATE_KEY=$MERCHANT_PRIVATE_KEY \
  --var MERCHANT_RELAY_URL=http://localhost:9119
```

Use the printed `workers.dev` URL in `VITE_PORTO_MERCHANT_URL` (append `/porto/merchant`).

Start the Vite example from the same Node 22 shell:

```bash
pnpm --filter sponsoring-vite-example dev -- --host --https

After redeploying contracts, either rerun `pnpm build:contracts` or manually
copy the fresh token addresses from `config/gwyneth-addresses.json` into
`examples/sponsoring-vite/src/contracts.ts` (the app reads `exp1Address`).
```

UI lives on the port Vite prints (usually `http://localhost:4173`). Use it to
connect, then attempt the noop operation, watching relay logs for activity.

---

## 6. Account upgrade + mint sanity check

1. Connect in the dialog and approve the upgrade prompt. Wait for
   `useWaitForCallsStatus` (or the dialog toast) to show the bundle succeeded.
2. Verify the account is live by checking code:

   ```bash
   cast code \
     --rpc-url http://localhost:32002 \
     0xaf23cb75e127fd1d0b5211c0c7e139a742fc8144
   ```

   A non-zero response means the proxy deployed and `wallet_prepareCalls`
   stops re-staging the upgrade.
3. In the sponsoring app click **Mint 100 EXP**. The relay now quotes via the
   local sponsor and the bundle lands without `PaymentError`. Confirm the
   balance widget increments by 100 within ~2 seconds.

If minting ever reverts:

- Ensure Wrangler is forwarding to `http://localhost:9119` (logs note the RPC
  URL).
- Make sure `exp1Address` in the example matches the deployed demo token.
- Confirm the merchant address still holds ETH: `cast balance
  $MERCHANT_ADDRESS --rpc-url http://localhost:32002`.
- If the account lost state, re-run the upgrade flow and wait for the bundle to
  finalize before retrying.

---

## 7. Notes / observations

- Running `pnpm relay:gwyneth` still hides logs; stick to the manual Docker
  invocation for clarity.
- The merchant helper rewrites `examples/sponsoring-vite/.env`; re-run it when
  you want a fresh sponsor EOA.
- `wallet_upgradeAccount` is stable once Multicall3 exists at
  `0xcA11…CA11`.

---

## 8. Tear-down

- `Ctrl+C` stops the Vite dev server.
- `docker rm -f porto-relay-gwyneth` stops the relay.
- Gwyneth node keeps running separately—shut it down via your local process
  manager when done.
