import type { Wallet } from "@citepay/shared";

export async function getAgentWallet(): Promise<Wallet> {
  return {
    id: process.env.CIRCLE_WALLET_SET_ID ?? "demo-wallet-set",
    address: process.env.PLATFORM_TREASURY_WALLET ?? "0xC17ePay000000000000000000000000000000001",
    provider: "circle",
    balanceUsd: 250
  };
}
