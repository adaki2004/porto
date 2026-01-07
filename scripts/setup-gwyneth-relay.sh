#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'USAGE'
Usage: setup-gwyneth-relay.sh [options]

Automates the SimpleFunder configuration for the Gwyneth deployment.

Options:
  --mnemonic <phrase>    Relay signer mnemonic (defaults to RELAY_MNEMONIC env or repo default).
  --signer-count <n>     Number of signer derivations to register (default: 16).
  --start-index <n>      Derivation index offset (default: 0).
  --prefund <eth>        Amount of ETH to send to each signer (default: 0, i.e. no prefund).
  --print-signers        Print derived signer addresses and exit.
  --dry-run              Show actions without broadcasting transactions.
  -h, --help             Show this help message.

Environment:
  DEPLOYER_PRIVATE_KEY   Required for on-chain transactions.
  GWYNETH_RPC_URL        RPC endpoint (default: http://localhost:32002).
  RELAY_MNEMONIC         Default mnemonic when --mnemonic is not supplied.

Dependencies: cast (Foundry), jq, bc
USAGE
}

RPC_URL=${GWYNETH_RPC_URL:-http://localhost:32002}
ADDRESSES_FILE="config/gwyneth-addresses.json"
MNEMONIC=${RELAY_MNEMONIC:-"test test test test test test test test test test test junk"}
SIGNER_COUNT=1
START_INDEX=0
PREFUND_AMOUNT="0"
PRINT_SIGNERS=false
DRY_RUN=false
GAS_PRICE=${RELAY_GAS_PRICE:-"1gwei"}
GAS_LIMIT_CONTRACT=${RELAY_GAS_LIMIT_CONTRACT:-"5000000"}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --mnemonic)
      MNEMONIC="$2"; shift 2 ;;
    --signer-count)
      SIGNER_COUNT="$2"; shift 2 ;;
    --start-index)
      START_INDEX="$2"; shift 2 ;;
    --prefund)
      PREFUND_AMOUNT="$2"; shift 2 ;;
    --print-signers)
      PRINT_SIGNERS=true; shift ;;
    --dry-run)
      DRY_RUN=true; shift ;;
    -h|--help)
      usage; exit 0 ;;
    *)
      echo "Unknown argument: $1" >&2
      usage
      exit 1 ;;
  esac
done

if [[ ! -f "$ADDRESSES_FILE" ]]; then
  echo "Error: $ADDRESSES_FILE not found. Run contract deployment first." >&2
  exit 1
fi

if [[ -z ${DEPLOYER_PRIVATE_KEY:-} && $DRY_RUN != true ]]; then
  echo "Error: DEPLOYER_PRIVATE_KEY must be set." >&2
  exit 1
fi

for cmd in jq cast bc; do
  if ! command -v "$cmd" &>/dev/null; then
    echo "Error: required tool '$cmd' not found in PATH." >&2
    exit 1
  fi
done

ORCHESTRATOR=$(jq -r '.contracts.orchestrator' "$ADDRESSES_FILE")
FUNDER=$(jq -r '.contracts.funder' "$ADDRESSES_FILE")

if [[ -z "$ORCHESTRATOR" || "$ORCHESTRATOR" == "null" ]]; then
  echo "Error: orchestrator address missing from $ADDRESSES_FILE" >&2
  exit 1
fi
if [[ -z "$FUNDER" || "$FUNDER" == "null" ]]; then
  echo "Error: funder address missing from $ADDRESSES_FILE" >&2
  exit 1
fi

mnemonic_to_addresses() {
  local mnemonic="$1"
  local start="$2"
  local count="$3"
  local addresses=()
  for ((i=0; i<count; i++)); do
    local index=$((start + i))
    addresses+=("$(cast wallet address --mnemonic "$mnemonic" --mnemonic-derivation-path "m/44'/60'/0'/0/$index")")
  done
  printf '%s\n' "${addresses[@]}"
}

SIGNER_ADDRESSES=( $(mnemonic_to_addresses "$MNEMONIC" "$START_INDEX" "$SIGNER_COUNT") )

if [[ "$PRINT_SIGNERS" == true ]]; then
  printf '%s\n' "${SIGNER_ADDRESSES[@]}"
  exit 0
fi

printf 'Detected %d signer addresses.\n' "${#SIGNER_ADDRESSES[@]}"

if [[ $DRY_RUN == true ]]; then
  echo "--- DRY RUN ---"
fi

send_and_check() {
  local to="$1"
  shift

  if [[ $DRY_RUN == true ]]; then
    echo "cast send --rpc-url $RPC_URL --private-key *** --legacy --gas-price $GAS_PRICE --gas-limit $GAS_LIMIT_CONTRACT $to $*"
    return 0
  fi

  local out tx_hash status
  out=$(cast send \
    --rpc-url "$RPC_URL" \
    --private-key "$DEPLOYER_PRIVATE_KEY" \
    --legacy \
    --gas-price "$GAS_PRICE" \
    --gas-limit "$GAS_LIMIT_CONTRACT" \
    --json \
    "$to" \
    "$@")

  tx_hash=$(echo "$out" | jq -r '.transactionHash // empty')
  if [[ -z "$tx_hash" || "$tx_hash" == "null" ]]; then
    echo "Error: failed to parse transactionHash from cast output:" >&2
    echo "$out" >&2
    exit 1
  fi

  status=$(cast receipt --rpc-url "$RPC_URL" "$tx_hash" | awk '/^status/{print $2}')
  if [[ "$status" != "1" ]]; then
    echo "Error: transaction failed (status=$status) tx=$tx_hash" >&2
    echo "debug_traceTransaction(callTracer):" >&2
    curl -s -X POST -H 'Content-Type: application/json' \
      --data "{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"debug_traceTransaction\",\"params\":[\"$tx_hash\", {\"tracer\":\"callTracer\"}]}" \
      "$RPC_URL" >&2 || true
    echo >&2
    exit 1
  fi

  echo "ok tx=$tx_hash"
}

# 1. Register orchestrator
echo "Setting orchestrator on SimpleFunder..."
send_and_check \
  "$FUNDER" \
  "setOrchestrators(address[],bool)" "[$ORCHESTRATOR]" true

# 2. Register gas wallets
JOINED_SIGNERS=$(printf '%s,' "${SIGNER_ADDRESSES[@]}")
JOINED_SIGNERS=${JOINED_SIGNERS%,}
echo "Registering gas wallets..."
send_and_check \
  "$FUNDER" \
  "setGasWallet(address[],bool)" "[$JOINED_SIGNERS]" true

# 3. Prefund signers if requested
if [[ "$PREFUND_AMOUNT" != "0" ]]; then
  if [[ $DRY_RUN == true ]]; then
    echo "Would prefund each signer with $PREFUND_AMOUNT ETH"
  else
    echo "Prefunding each signer with $PREFUND_AMOUNT ETH..."
    for addr in "${SIGNER_ADDRESSES[@]}"; do
      cast send \
        --rpc-url "$RPC_URL" \
        --private-key "$DEPLOYER_PRIVATE_KEY" \
        --legacy \
        --gas-price "$GAS_PRICE" \
        "$addr" \
        --value "${PREFUND_AMOUNT}ether"
    done
  fi
fi

echo "Setup complete."
