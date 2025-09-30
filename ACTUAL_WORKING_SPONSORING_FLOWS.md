# Porto ↦ Gwyneth Transaction Flows

This companion note complements `ACTUAL_WORKING_DEPLOYMENT.md` and focuses on
what actually happens when a user submits a transaction with, or without,
merchant sponsorship. Both flows assume the user already upgraded to an Ithaca
smart account (AA proxy) on Gwyneth.


---

## 1. Unsponsored Flow (User Pays Gas)

When no `merchantUrl` is provided to the connector, the relay quotes gas against
the user’s own account. The merchant worker and `SimpleFunder` contract are not
involved.

![Unsponsored flow graphic](docs/images/unsponsored-flow.png)

```mermaid
sequenceDiagram
    actor User
    participant Dialog as Porto Dialog (Browser)
    participant Relay as Porto Relay
    participant Account as Ithaca Account (User)
    participant Chain as Gwyneth L1

    User->>Dialog: sendCalls(calls)
    Dialog-->>Relay: wallet_prepareCalls
    Relay-->>Relay: Quote fee (payer = user AA)
    Relay-->>Dialog: fee totals + digest
    Dialog->>User: Prompt for WebAuthn signature
    User-->>Dialog: Sign digest (AA key)
    Dialog-->>Relay: wallet_sendPreparedCalls(signature)
    Relay-->>Chain: Execute bundle (payer = user AA)
    Chain-->>Relay: Bundle mined (fee deducted from AA balance)
    Relay-->>Dialog: callsStatus = success
    Dialog-->>User: Success toast / refetch balance
```

**Key points**

- The account that signs is the user’s upgraded Ithaca Account; it always
  remains an AA proxy even when sponsorship is disabled.
- Gas comes directly from the account’s configured fee token (typically native
  ETH). Make sure the user AA holds enough ETH before calling `sendCalls`.
- `SimpleFunder` is unused—its ETH balance remains untouched.
- No merchant RPC or signature is required; `wallet_prepareCalls` talks directly
  to the relay’s public endpoint.

---

## 2. Sponsored Flow (Merchant Pays Gas)

When the connector is given `merchantUrl`, the dialog asks the merchant worker
for a sponsorship quote. The worker signs the fee authorization, while the relay
withdraws the actual gas from the pre-funded `SimpleFunder` contract during
execution.

![Sponsored flow graphic](docs/images/sponsored-flow.png)

```mermaid
sequenceDiagram
    actor User
    participant Dialog as Porto Dialog (Browser)
    participant Merchant as Merchant Worker (Wrangler)
    participant Relay as Porto Relay
    participant Funder as SimpleFunder Contract
    participant Account as Ithaca Account (User)
    participant Chain as Gwyneth L1

    User->>Dialog: sendCalls(calls, merchantUrl)
    Dialog-->>Merchant: wallet_prepareCalls (HTTP)
    Merchant-->>Relay: wallet_prepareCalls (feePayer = merchant)
    Relay-->>Merchant: Quote + digest (payer = merchant)
    Merchant-->>Merchant: Sign feeSignature (merchant key)
    Merchant-->>Dialog: feeSignature + context
    Dialog->>User: Prompt for WebAuthn signature (execution digest)
    User-->>Dialog: Sign digest (AA key)
    Dialog-->>Relay: wallet_sendPreparedCalls (feeSignature + user sig)
    Relay-->>Funder: Pull gas via fund() (authorized by merchant)
    Funder-->>Account: Transfer ETH to account / orchestrator
    Relay-->>Chain: Execute bundle (gas paid from pulled ETH)
    Chain-->>Relay: Bundle mined
    Relay-->>Dialog: callsStatus = success
    Dialog-->>User: Success toast / updated balance
```

**What is really paying for gas?**

- The merchant worker (`MERCHANT_ADDRESS`) only signs the fee authorization
  (`feeSignature`). Its balance never changes because it does not broadcast an
  on-chain transaction.
- `SimpleFunder` (`config.gwyneth-addresses.json -> funder`) holds the ETH that
  actually covers priority + base fee. During execution the Orchestrator invokes
  `SimpleFunder.fund(...)`, which transfers ETH to settle gas costs.
- As long as `SimpleFunder` has ETH, the merchant can approve sponsorships
  without their EOA balance moving.

**What if `SimpleFunder` is empty?**

- The relay returns `PaymentError`, mirroring the behaviour you saw earlier.
  Top up the funder (`cast send <funder> --value X`) or disable sponsorship so
  the user account pays.

---

## 3. Summary Table

| Aspect                          | Unsponsored                                         | Sponsored                                                     |
| ------------------------------- | --------------------------------------------------- | ------------------------------------------------------------- |
| Uses merchant worker            | No                                                  | Yes (`merchantUrl` required)                                  |
| Who signs fee authorization?    | User AA only                                        | Merchant worker signs `feeSignature`                          |
| Where does ETH come from?       | User AA balance                                     | `SimpleFunder` contract (prefunded during deployment)         |
| Merchant EOA balance changes?   | n/a                                                 | No – signature only                                           |
| Smart account still required?   | Yes (always an Ithaca Account)                      | Yes (same account, but gas reimbursed)                        |
| Failure mode                    | Insufficient user ETH                               | Empty `SimpleFunder` or missing merchant signature            |

Use this sheet whenever you need to reason about fee flows or explain the
meaning of the merchant worker versus the on-chain funder.

---

## 4. Passkeys, Biometrics, and Ithaca Accounts

- **Passkey != EOA address.** The WebAuthn credential (stored in FaceID/TouchID
  or a hardware key) only holds the private key material used to sign upgrade
  digests and runtime bundles. The on-chain account is still the Ithaca smart
  account address published during the upgrade flow.
- **Biometric sign-in is a client-side unlock.** When the user approves a
  transaction, the dialog asks the platform authenticator to produce a signature
  with that passkey. Biometrics never leave the device; the resulting signature
  over the digest is what the relay verifies.
- **Porto stitches the pieces together.** After receiving the WebAuthn
  signature, Porto wraps it into the bundle sent to the relay (along with the
  merchant’s `feeSignature`, if any). The relay then executes the call on behalf
  of the Ithaca Account.
- **Sponsorship is optional.** Whether or not a merchant is involved, the user
  continues to sign with the same passkey and the same smart account executes
  the call. Sponsorship merely changes who reimburses gas.

### Signature Types the Ithaca Account Understands

- **WebAuthn (P-256).** Default in Porto Dialog. FaceID/TouchID merely unlocks
  the WebAuthn credential, which produces an ECDSA signature over a pre-hashed
  digest. The relay wraps it into the bundle and the Ithaca Account verifies it
  against the stored admin key via ECDSA-P256.
- **Secp256k1 EOA keys.** You can authorize an admin key backed by a plain
  secp256k1 private key (`porto viem Key.createSecp256k1`). In that case the user
  signs with their raw EOA (e.g. Ledger, MetaMask) and the Ithaca Account verifies
  the signature using regular Ethereum secp256k1 rules.
- **Session keys / permissions.** Additional keys can be provisioned with spend
  limits (e.g. for delegates or automated flows). During `prepareCalls` Porto
  picks whichever key matches the call permissions. The smart account checks the
  signature against the corresponding permission slot before executing.

The account proxy doesn’t care *how* the signature was produced—only that it
matches a key/hash it knows about. Porto’s job is to normalize the signature from
FaceID, a hardware key, or a raw private key into the format the relay/Ithaca
Account expect.

### Where “Stored Admin Keys” Come From

- During `prepareUpgradeAccount`, Porto bundles the initial administrator keys
  (by default the freshly created WebAuthn key). Those keys get encoded into the
  initialization pre-call.
- When `wallet_upgradeAccount` runs, the Orchestrator executes that pre-call and
  writes the key metadata into the smart account’s storage—role, permissions,
  and hash. That’s the “stored admin key” the account checks against later.
- Additional admin or session keys can be added or revoked after deployment via
  `authorizeKeys` / `revokeKeys` flows; the account simply keeps its key table in
  storage and validates signatures against it.

### Resetting Passkeys During Local Development

- Browsers treat `https://127.0.0.1:<port>` and `https://localhost:<port>` as
  distinct WebAuthn Relying Parties. If you restart the demo with a new port or
  profile, Chrome may reuse an old passkey and therefore an old Ithaca Account
  address.
- To start fresh, open `chrome://password-manager/passkeys` (or the OS passkey
  manager on macOS) and delete the entries named `127.0.0.1`/`localhost` before
  reconnecting.
- Always choose “Select existing account” in the Porto dialog if you want to
  reuse the already-upgraded account. Choosing “Create account” generates a new
  address that must go through the upgrade flow again.
- If the dialog never surfaces the upgrade step, use the helper in
  `docs/ACCOUNT_UPGRADE.md` (paste it in the browser console) to run
  `prepareUpgradeAccount`/`wallet_upgradeAccount` manually. Verify the account is
  deployed with `cast code <address> --rpc-url http://localhost:32002` before
  retriggering the mint.
- Quotes from the relay expire quickly (≈30 seconds). If you take too long to
  approve the passkey prompt, `relay_sendPreparedCalls` returns
  `quote expired` and the upgrade pre-call never executes. Retry immediately to
  fetch a fresh quote, or request the faucet first so you can approve without
  delay.
