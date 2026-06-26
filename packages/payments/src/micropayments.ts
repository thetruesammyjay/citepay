import type { PaymentRecord, RankedSource } from "@citepay/shared";
import { createCircleUsdcTransfer } from "./circle";
import { submitArcSettlement } from "./arc";
import { unlockX402Content } from "./x402";

export async function executeMicropayments(sources: RankedSource[], queryId: string): Promise<PaymentRecord[]> {
  const payments: PaymentRecord[] = [];

  for (const source of sources) {
    const idempotencyKey = `${queryId}_${source.id}`;
    const transfer = await createCircleUsdcTransfer({
      amountUsd: source.citationPriceUsd,
      destinationWallet: source.walletAddress,
      idempotencyKey
    });
    const settlement = await submitArcSettlement(transfer.transferId);
    await unlockX402Content(source, settlement.txHash);

    payments.push({
      id: `pay_${crypto.randomUUID()}`,
      sourceId: source.id,
      sourceTitle: source.title,
      publisher: source.publisher,
      amountUsd: source.citationPriceUsd,
      currency: "USDC",
      status: "settled",
      txHash: settlement.txHash,
      network: `${settlement.network}:${settlement.chainId}`,
      createdAt: new Date().toISOString()
    });
  }

  return payments;
}
