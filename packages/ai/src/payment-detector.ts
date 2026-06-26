import type { RankedSource } from "@citepay/shared";

export function detectPayableSources(sources: RankedSource[]): RankedSource[] {
  return sources.filter((source) => source.shouldCite && source.paymentRequired);
}

export function detectUnlockedSources(sources: RankedSource[]): RankedSource[] {
  return sources.filter((source) => source.shouldCite);
}
