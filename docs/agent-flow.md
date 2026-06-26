# Agent Flow

The CitePay agent works in 6 stages.

## Stage 1 - Query Intake

Receive the user prompt, assign a query ID, and initialize the spending policy.

## Stage 2 - Discovery

Search relevant content sources across open, premium, and x402-protected catalogs.

## Stage 3 - Trust Scoring

Rank sources by publisher authority, relevance, freshness, and evidence quality.

## Stage 4 - Payment Decision

Determine which sources require payment and whether each one is worth unlocking under the query budget.

## Stage 5 - Payment Execution

Execute USDC micropayments through Circle Wallets, submit Arc settlement metadata, and unlock x402 content.

## Stage 6 - Response Generation

Generate the final answer with transparent citations, payment statuses, transaction hashes, and publisher attribution.

```mermaid
flowchart LR
    A[User Query] --> B[Source Discovery]
    B --> C[Trust Evaluation]
    C --> D[Citation Ranking]
    D --> E[Payment Detection]
    E --> F[USDC Micropayment]
    F --> G[Source Unlock]
    G --> H[Final AI Answer]
    H --> I[Citation + Payment Log]
```
