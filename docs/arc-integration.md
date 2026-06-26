# Arc Integration

CitePay uses Arc as the settlement network for citation payments.

## Network Defaults

- Chain ID: `5042002`
- Hex chain ID: `0x4cef52`
- Gas token: `USDC`
- Public testnet RPC: `https://rpc.testnet.arc.network`
- Canteen RPC proxy: `https://arc-node.thecanteenapp.com/`
- USDC interface: `0x3600000000000000000000000000000000000000`
- Memo contract: `0x5294E9927c3306DcBaDb03fe70b92e01cCede505`

## Runtime Flow

1. The API checks Arc readiness with `eth_chainId`, `eth_blockNumber`, and `eth_gasPrice`.
2. The payment package validates that the connected chain is Arc testnet.
3. Citation micropayments carry a deterministic transaction hash in demo mode.
4. Payment records include the Arc network name and chain ID.
5. The dashboard shows chain health, latest block, gas token, USDC address, and Memo contract.

## Production Upgrade Path

The current implementation is intentionally split into live readiness checks and demo settlement receipts. This lets judges see the full CitePay flow even before funded wallets are configured.

Production settlement should add:

- Circle wallet signing for USDC transfer transactions.
- Arc transaction submission through the configured RPC.
- Memo contract calls that attach query ID, source ID, publisher wallet, and citation ID.
- x402 payment headers generated from the settled Arc transaction.
- Database persistence for receipts and memo references.

## Environment

```env
CANTEEN_API_KEY=
CANTEEN_ARC_RPC_URL=https://arc-node.thecanteenapp.com/
ARC_RPC_URL=https://rpc.testnet.arc.network
X402_NETWORK=arc-testnet
```
