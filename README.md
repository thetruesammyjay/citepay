# CitePay

## AI Answers That Pay Their Sources

CitePay is an AI-powered research assistant that compensates creators, publishers, and data providers whenever their content is cited or used to generate an answer.

Traditional AI systems extract value from the open internet without creating a payment path back to the people who produced that knowledge. CitePay introduces a citation economy where AI agents can discover sources, evaluate trust, unlock premium content, execute USDC micropayments, and generate final answers with transparent payment receipts.

Every citation becomes a payment.

Repository: https://github.com/thetruesammyjay/citepay

## Hackathon Context

CitePay is being built for the Lepton Hackathon by Canteen, Circle, and Arc.

The project focuses on:

- Autonomous AI agents
- Circle Wallets
- USDC micropayments
- Arc settlement
- x402 protected content access
- Creator and publisher monetization

The core thesis is simple: if an AI answer benefits from a source, that source should be attributed and paid.

## Problem

Creators, researchers, journalists, analysts, and data providers produce valuable knowledge. AI systems use that knowledge to generate answers, but the original sources often receive no compensation.

This creates a broken incentive model:

- Creators publish useful work.
- AI systems extract value from it.
- Users receive answers.
- The creator receives no payment.
- The source of truth becomes harder to sustain.

CitePay turns attribution into programmable revenue.

## Solution

When a user asks a research question, CitePay runs an agent workflow:

1. The user submits a query.
2. The AI agent discovers relevant sources.
3. Sources are ranked by trust, relevance, freshness, and licensing terms.
4. Premium or x402 protected sources are detected.
5. The agent executes USDC micropayments.
6. Paid content is unlocked.
7. The final answer is generated with citations.
8. Each cited source receives a payment record.

## Current Status

CitePay currently includes:

- A production monorepo scaffold with apps and packages.
- A Next.js frontend with landing page, query console, dashboard, publisher view, docs page, header, mobile menu, and footer.
- A Fastify API with query, payment, source, history, and Arc status endpoints.
- A typed AI orchestration package with discovery, trust scoring, citation ranking, payment detection, and answer generation.
- A payments package with Circle, Arc, x402, wallet, and micropayment modules.
- Arc testnet readiness checks through JSON-RPC.
- Prisma schema for users, wallets, sources, queries, payments, and citations.
- Shared TypeScript types and Zod schemas.
- Documentation for architecture, API, agent flow, demo script, and Arc integration.

Important note: the project currently performs real Arc network readiness checks and simulated settlement receipts. The next production step is signed USDC transfer execution through Circle wallets and Arc transaction submission.

## Architecture

```mermaid
flowchart TD
    A[User Prompt] --> B[Next.js Web App]
    B --> C[Fastify API]
    C --> D[AI Agent Orchestrator]
    D --> E[Source Discovery]
    D --> F[Trust Engine]
    D --> G[Citation Ranker]
    G --> H{Payment Required}
    H -->|No| I[Answer Generator]
    H -->|Yes| J[Payment Engine]
    J --> K[Circle Wallets]
    J --> L[Arc JSON-RPC]
    J --> M[x402 Unlock]
    L --> N[Arc Settlement Metadata]
    K --> O[USDC Payment Record]
    M --> I
    N --> P[Prisma Database]
    O --> P
    I --> Q[Final Answer With Citations]
    Q --> B
```

## Agent Flow

```mermaid
flowchart LR
    A[Query Intake] --> B[Source Discovery]
    B --> C[Trust Scoring]
    C --> D[Citation Ranking]
    D --> E[Payment Detection]
    E --> F[USDC Micropayment]
    F --> G[Content Unlock]
    G --> H[Answer Generation]
    H --> I[Citations and Receipts]
```

## Payment Flow

```mermaid
sequenceDiagram
    participant User
    participant Web as Web App
    participant API as API
    participant Agent as AI Agent
    participant Pay as Payment Engine
    participant Arc as Arc Network
    participant Pub as Publisher

    User->>Web: Submit research query
    Web->>API: POST /api/query
    API->>Agent: Run source discovery and ranking
    Agent->>Pay: Request payment for premium source
    Pay->>Arc: Check chain ID and latest block
    Pay->>Arc: Prepare settlement metadata
    Pay->>Pub: Record USDC payment receipt
    Agent->>API: Return answer, citations, payments
    API->>Web: Query response
    Web->>User: Display cited answer and payment log
```

## Monorepo Structure

```bash
citepay/
  apps/
    web/                 # Next.js 15 frontend
    api/                 # Fastify API and agent runtime
  packages/
    ai/                  # Agent orchestration
    payments/            # Circle, Arc, x402, wallet, micropayments
    db/                  # Prisma schema, client, seed data
    shared/              # Shared types, schemas, constants
  docs/
    architecture.md
    api-reference.md
    agent-flow.md
    arc-integration.md
    demo-script.md
  .env.example
  package.json
  pnpm-workspace.yaml
  turbo.json
```

## Applications

### apps/web

The frontend is built with Next.js 15 App Router and includes:

- Landing page
- Query console
- Payment intelligence dashboard
- Publisher monetization view
- Documentation page
- Mobile responsive navigation
- Footer with product and resource links
- React Query API data fetching
- Zustand state management

### apps/api

The API is built with Fastify and includes:

- Agent orchestration routes
- Payment execution routes
- Arc network status checks
- Source discovery route
- Query history route
- Payment history route

## Packages

### packages/ai

Contains the agent pipeline:

- `source-discovery.ts`
- `trust-engine.ts`
- `citation-ranker.ts`
- `payment-detector.ts`
- `answer-generator.ts`
- `orchestrator.ts`

### packages/payments

Contains the payment layer:

- `circle.ts`
- `arc.ts`
- `x402.ts`
- `micropayments.ts`
- `wallet.ts`

### packages/db

Contains:

- Prisma schema
- Prisma client singleton
- Seed script

### packages/shared

Contains:

- Shared constants
- Shared TypeScript types
- Zod schemas

## Tech Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Zustand
- React Query
- Fastify
- PostgreSQL
- Prisma ORM
- Zod
- Lucide Icons
- Turborepo
- pnpm workspace

## API Surface

### POST /api/query

Runs the full CitePay agent workflow.

```json
{
  "query": "Best stablecoin payment rails for African creators",
  "budgetUsd": 0.018
}
```

### POST /api/pay

Executes a direct payment flow for a premium source.

```json
{
  "sourceId": "stablecoin-africa-report",
  "amountUsd": 0.0045,
  "destinationWallet": "0x9A4f8d3e2C0A901F44e92Ff8B0c1E339F0E72E10"
}
```

### GET /api/arc/status

Checks Arc network readiness through JSON-RPC.

The response includes:

- Configured RPC URL
- Chain ID
- Expected chain ID
- Latest block
- Gas price
- Gas token
- USDC contract address
- Memo contract address
- Live or fallback mode

### GET /api/sources

Returns known source candidates.

### GET /api/payments

Returns payment records for the running API process.

### GET /api/history

Returns query history for the running API process.

## Arc Integration

CitePay uses Arc as the settlement network for citation payments.

Current Arc defaults:

- Chain ID: `5042002`
- Hex chain ID: `0x4cef52`
- Gas token: `USDC`
- Public testnet RPC: `https://rpc.testnet.arc.network`
- Canteen RPC proxy: `https://arc-node.thecanteenapp.com/`
- USDC interface: `0x3600000000000000000000000000000000000000`
- Memo contract: `0x5294E9927c3306DcBaDb03fe70b92e01cCede505`

The dashboard shows Arc readiness so judges can verify that CitePay is checking live network metadata.

More details are in [docs/arc-integration.md](docs/arc-integration.md).

## Database Model

The Prisma schema includes:

- `User`
- `Wallet`
- `Source`
- `Query`
- `Payment`
- `Citation`

```mermaid
erDiagram
    User ||--o{ Wallet : owns
    User ||--o{ Query : submits
    Query ||--o{ Citation : includes
    Query ||--o{ Payment : creates
    Source ||--o{ Citation : cited_by
    Source ||--o{ Payment : earns
```

## Environment Variables

Create a `.env` file from `.env.example`.

```env
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:4000
API_PORT=4000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/citepay
OPENAI_API_KEY=
CIRCLE_API_KEY=
CIRCLE_ENTITY_SECRET=
CIRCLE_WALLET_SET_ID=
CANTEEN_API_KEY=
CANTEEN_ARC_RPC_URL=https://arc-node.thecanteenapp.com/
ARC_RPC_URL=https://rpc.testnet.arc.network
X402_NETWORK=arc-testnet
PLATFORM_TREASURY_WALLET=0x0000000000000000000000000000000000000000
```

## Local Development

Install dependencies:

```bash
pnpm install
```

Generate Prisma client:

```bash
pnpm db:generate
```

Push the database schema:

```bash
pnpm db:push
```

Run the full monorepo:

```bash
pnpm dev
```

Run only the frontend:

```bash
pnpm --filter @citepay/web dev
```

Run only the API:

```bash
pnpm --filter @citepay/api dev
```

## Verification

Typecheck all workspaces:

```bash
pnpm typecheck
```

Build all workspaces:

```bash
pnpm build
```

Run the web production build:

```bash
pnpm --filter @citepay/web build
```

## Demo Script

1. Open the landing page.
2. Go to the query console.
3. Submit: `Best stablecoin payment rails for African creators`
4. Show source discovery and trust scoring.
5. Show paid citation records.
6. Open the dashboard.
7. Show Arc readiness, USDC gas token, latest block, and Memo contract metadata.
8. Show publisher monetization.

## Production Roadmap

Near term:

- Add signed Circle wallet transactions.
- Submit real Arc transactions.
- Write citation metadata to the Arc Memo contract.
- Persist query, payment, and citation records in PostgreSQL.
- Add x402 protected source endpoints.
- Add publisher wallet onboarding.

Later:

- Add source owner dashboards.
- Add trust scoring based on real publisher metadata.
- Add pricing rules for pay per citation and pay per access.
- Add subscription based source bundles.
- Add replayable receipts for every answer.

## Documentation

- [Architecture](docs/architecture.md)
- [API Reference](docs/api-reference.md)
- [Agent Flow](docs/agent-flow.md)
- [Arc Integration](docs/arc-integration.md)
- [Demo Script](docs/demo-script.md)

## Team

Built by Samuel Justin Ifiezibe.

GitHub: https://github.com/thetruesammyjay
