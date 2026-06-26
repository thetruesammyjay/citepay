# API Reference

Base URL:

```text
http://localhost:4000
```

## POST /api/query

Runs the full CitePay agent.

Request:

```json
{
  "query": "Best stablecoin payment rails for African creators",
  "budgetUsd": 0.018
}
```

Response includes:

- `answer`
- `sources`
- `citations`
- `payments`
- `stages`
- `totalSpentUsd`
- `unlockedContentCount`

## POST /api/pay

Executes a direct source payment.

Request:

```json
{
  "sourceId": "stablecoin-africa-report",
  "amountUsd": 0.0045,
  "destinationWallet": "0x9A4f8d3e2C0A901F44e92Ff8B0c1E339F0E72E10"
}
```

## GET /api/sources

Returns known source candidates.

## GET /api/arc/status

Checks Arc network readiness through JSON-RPC.

Response includes:

- configured RPC URL
- chain ID
- latest block
- gas price
- USDC gas token
- USDC contract address
- Memo contract address
- live or demo mode

## GET /api/payments

Returns payment records for the running API process.

## GET /api/history

Returns query history for the running API process.
