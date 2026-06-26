export interface CircleTransferInput {
  amountUsd: number;
  destinationWallet: string;
  idempotencyKey: string;
}

export async function createCircleUsdcTransfer(input: CircleTransferInput): Promise<{ transferId: string }> {
  if (!process.env.CIRCLE_API_KEY) {
    return { transferId: `circle_demo_${input.idempotencyKey}` };
  }

  return { transferId: `circle_live_${input.idempotencyKey}` };
}
