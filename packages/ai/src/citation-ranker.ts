import type { ContentSource, RankedSource } from "@citepay/shared";
import { calculateTrustScore, explainTrust } from "./trust-engine";

export function rankSources(sources: ContentSource[], budgetUsd: number): RankedSource[] {
  let runningCost = 0;

  return [...sources]
    .map((source) => {
      const trust = calculateTrustScore(source);
      const pricePenalty = source.citationPriceUsd * 700;
      const rankScore = Math.round(trust - pricePenalty);
      return { source, rankScore };
    })
    .sort((a, b) => b.rankScore - a.rankScore)
    .map(({ source, rankScore }) => {
      const paymentRequired = source.type !== "open" && source.citationPriceUsd > 0;
      const affordable = runningCost + source.citationPriceUsd <= budgetUsd;
      const shouldCite = source.type === "open" || (rankScore >= 82 && affordable);
      if (shouldCite) runningCost += source.citationPriceUsd;

      return {
        ...source,
        rankScore,
        shouldCite,
        paymentRequired,
        paymentReason: paymentRequired ? explainTrust(source) : "Open-access source included without payment."
      };
    });
}
