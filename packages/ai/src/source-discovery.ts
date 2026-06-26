import type { ContentSource } from "@citepay/shared";

export async function discoverSources(query: string): Promise<ContentSource[]> {
  const normalized = query.toLowerCase();
  const africaBoost = normalized.includes("africa") || normalized.includes("creator");

  return [
    {
      id: "stablecoin-africa-report",
      title: "Stablecoin settlement rails for African digital creators",
      publisher: "Creator Economy Research Lab",
      url: "https://example.com/research/stablecoin-africa-creators",
      type: "x402",
      trustScore: 94,
      relevanceScore: africaBoost ? 97 : 82,
      freshnessScore: 91,
      citationPriceUsd: 0.0045,
      walletAddress: "0x9A4f8d3e2C0A901F44e92Ff8B0c1E339F0E72E10",
      excerpt: "Compares USDC, local ramps, mobile money bridges, settlement finality, and creator payout reliability.",
      license: "pay-per-citation"
    },
    {
      id: "circle-usdc-guide",
      title: "USDC programmable payments and wallet infrastructure guide",
      publisher: "Circle Developer Archive",
      url: "https://example.com/circle/usdc-wallet-guide",
      type: "premium",
      trustScore: 91,
      relevanceScore: 90,
      freshnessScore: 88,
      citationPriceUsd: 0.003,
      walletAddress: "0x2E6B9A9bE08b762742Cef4A3e42265C47370683d",
      excerpt: "Explains wallet-controlled USDC flows, compliance considerations, and programmable payout APIs.",
      license: "pay-per-access"
    },
    {
      id: "arc-finality-brief",
      title: "Arc settlement design notes for low-cost application payments",
      publisher: "Arc Network Notes",
      url: "https://example.com/arc/settlement-design",
      type: "premium",
      trustScore: 89,
      relevanceScore: 86,
      freshnessScore: 95,
      citationPriceUsd: 0.0025,
      walletAddress: "0x77DfE8295A8EA10F5EBD7f70a5492fCe377c7Ad3",
      excerpt: "Details fast settlement assumptions, gas characteristics, and application payment patterns.",
      license: "pay-per-citation"
    },
    {
      id: "world-bank-remittance",
      title: "Remittance costs and regional payout constraints",
      publisher: "Open Development Data",
      url: "https://example.com/open/remittance-costs",
      type: "open",
      trustScore: 84,
      relevanceScore: 76,
      freshnessScore: 72,
      citationPriceUsd: 0,
      walletAddress: "0x0000000000000000000000000000000000000000",
      excerpt: "Open dataset on cross-border payment fees and transfer availability across regional markets.",
      license: "open-access"
    },
    {
      id: "x402-content-access",
      title: "Machine-payable content access patterns with x402",
      publisher: "Protocol Monetization Review",
      url: "https://example.com/x402/content-access",
      type: "x402",
      trustScore: 87,
      relevanceScore: 91,
      freshnessScore: 90,
      citationPriceUsd: 0.0038,
      walletAddress: "0x14dcDA5cC564870AC9444fc24a9f6936bF1C0012",
      excerpt: "Shows how agents negotiate protected content access using HTTP-native payment requirements.",
      license: "x402-unlock"
    }
  ];
}
