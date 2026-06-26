import type { ContentSource } from "@citepay/shared";

export function calculateTrustScore(source: ContentSource): number {
  const publisherAuthority = source.trustScore * 0.45;
  const relevance = source.relevanceScore * 0.35;
  const freshness = source.freshnessScore * 0.2;
  return Math.round(publisherAuthority + relevance + freshness);
}

export function explainTrust(source: ContentSource): string {
  const score = calculateTrustScore(source);
  if (score >= 90) return "High-confidence source with strong relevance and publisher authority.";
  if (score >= 80) return "Reliable source that adds useful evidence to the response.";
  return "Contextual source; cite only when budget allows or open access.";
}
