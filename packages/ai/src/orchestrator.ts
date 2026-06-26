import { executeMicropayments } from "@citepay/payments";
import type { AgentStage, QueryRequest, QueryResponse } from "@citepay/shared";
import { generateAnswer, buildCitations } from "./answer-generator";
import { rankSources } from "./citation-ranker";
import { detectPayableSources, detectUnlockedSources } from "./payment-detector";
import { discoverSources } from "./source-discovery";

function stage(name: string, detail: string): AgentStage {
  return { name, detail, status: "complete" };
}

export async function runCitePayAgent(input: QueryRequest): Promise<QueryResponse> {
  const budgetUsd = input.budgetUsd ?? 0.018;
  const id = `qry_${crypto.randomUUID()}`;

  const discovered = await discoverSources(input.query);
  const ranked = rankSources(discovered, budgetUsd);
  const payable = detectPayableSources(ranked);
  const payments = await executeMicropayments(payable, id);
  const paymentHashes = new Map(payments.map((payment) => [payment.sourceId, payment.txHash]));
  const unlocked = detectUnlockedSources(ranked);
  const citations = buildCitations(unlocked, paymentHashes);
  const answer = generateAnswer(input.query, unlocked, citations);
  const totalSpentUsd = payments.reduce((sum, payment) => sum + payment.amountUsd, 0);

  return {
    id,
    query: input.query,
    answer,
    totalSpentUsd,
    unlockedContentCount: unlocked.length,
    sources: ranked,
    citations,
    payments,
    stages: [
      stage("Query Intake", "Captured user prompt and initialized budget policy."),
      stage("Discovery", `Discovered ${discovered.length} candidate sources.`),
      stage("Trust Scoring", "Ranked sources by authority, relevance, freshness, and price."),
      stage("Payment Decision", `Selected ${payable.length} paid sources for autonomous unlock.`),
      stage("Payment Execution", `Settled ${payments.length} USDC micropayments.`),
      stage("Response Generation", `Generated answer with ${citations.length} transparent citations.`)
    ]
  };
}
