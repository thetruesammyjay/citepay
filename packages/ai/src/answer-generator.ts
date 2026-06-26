import type { Citation, RankedSource } from "@citepay/shared";

export function generateAnswer(query: string, sources: RankedSource[], citations: Citation[]): string {
  const citedPublishers = citations.map((citation) => citation.publisher).join(", ");

  return [
    `For "${query}", the strongest recommendation is to combine USDC wallet infrastructure with fast application settlement and x402-gated premium knowledge access.`,
    "Circle Wallets provide programmable custody and payout flows, Arc gives the product a low-latency settlement path, and x402 lets research agents pay for protected content without manual checkout.",
    "For African creators specifically, the winning architecture should optimize for local off-ramps, predictable stablecoin settlement, transparent fees, and source-level attribution so the same rails can pay both creators and publishers.",
    `This answer cites ${citations.length} sources, including ${citedPublishers}, and records citation payments alongside the final response.`
  ].join("\n\n");
}

export function buildCitations(sources: RankedSource[], paymentHashes: Map<string, string>): Citation[] {
  return sources
    .filter((source) => source.shouldCite)
    .map((source) => ({
      id: `cit_${source.id}`,
      sourceId: source.id,
      title: source.title,
      publisher: source.publisher,
      url: source.url,
      trustScore: source.trustScore,
      paymentStatus: source.paymentRequired ? "settled" : "skipped",
      txHash: paymentHashes.get(source.id)
    }));
}
