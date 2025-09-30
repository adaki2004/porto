# Merchant Sponsoring (Vite)

## 1. Setup

```sh
pnpx gitpick ithacaxyz/porto/tree/main/examples/sponsoring-vite porto-sponsoring && cd porto-sponsoring
```

## 2. Onboard Merchant (Sponsor) Account

Run the following command to onboard a new Porto Merchant (Sponsor) Account.

```sh
pnpx porto onboard --admin-key --testnet
```

Place the address and private key of the merchant account into the `.env` file.

```sh
MERCHANT_ADDRESS=0x...
MERCHANT_PRIVATE_KEY=0x...
# Optional: defaults to `window.location.origin + /porto/merchant`
# VITE_PORTO_MERCHANT_URL=https://localhost:8787/porto/merchant
```

### Local Gwyneth Shortcut

The onboarding CLI only targets the public Porto relays (Base & Base Sepolia). When
working against a custom Gwyneth environment, create and fund the sponsor account
manually:

1. Generate an EOA and capture the address/private key:

   ```sh
   cast wallet new | tee merchant.txt
   ```

2. Prefund the address on Gwyneth so it can reimburse the relay:

   ```sh
   cast send \
     --rpc-url http://localhost:32002 \
     --private-key $DEPLOYER_PRIVATE_KEY \
     <merchant_address> \
     --value 1ether
   ```

3. Copy the values into `.env`:

   ```sh
   MERCHANT_ADDRESS=<merchant_address>
   MERCHANT_PRIVATE_KEY=<merchant_private_key>
   ```

The Cloudflare Worker will use this EOA when signing sponsorship payloads, so no
additional setup is required.

## 3. Install & Start

Then, install dependencies and start the app.

```sh
pnpm i
USE_CLOUDFLARE_PLUGIN=true pnpm dev
```

> The Cloudflare plugin serves the `/porto/merchant` route locally so the dapp
> can fetch sponsorship quotes. If you expose the worker on a different origin,
> set `VITE_PORTO_MERCHANT_URL` accordingly.
