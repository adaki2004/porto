# Gwyneth “Uniswap-like” UI (Wallet first → Porto later)

This example is a clean, Uniswap-style UI that targets the local Gwyneth devnet.

Phase 1 (current): **connect an injected wallet** (e.g. MetaMask) and test:
- L1 add liquidity + swap (chain `160010`)
- L2A/L2B connect + read balances (chains `167010` / `167011`)
- L2 portal cross-swap (initiate on L2, execute swap on L1)

Phase 2 (later): plug in **Porto passkeys + relay sponsorship** behind a toggle.

## Local devnet endpoints

- L1: `http://127.0.0.1:32002` (chainId `160010`)
- L2A: `http://127.0.0.1:32006` (chainId `167010`)
- L2B: `http://127.0.0.1:32007` (chainId `167011`)

## Run

```sh
source ~/.nvm/nvm.sh && nvm use 22
pnpm i
pnpm dev
```

Open `http://127.0.0.1:5177/`.
