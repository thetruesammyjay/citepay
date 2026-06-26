import type { RankedSource } from "@citepay/shared";

export interface X402Unlock {
  sourceId: string;
  paymentHeader: string;
  unlocked: boolean;
}

export async function unlockX402Content(source: RankedSource, txHash: string): Promise<X402Unlock> {
  return {
    sourceId: source.id,
    paymentHeader: `X-PAYMENT ${source.citationPriceUsd.toFixed(6)} USDC ${txHash}`,
    unlocked: source.type === "x402"
  };
}
