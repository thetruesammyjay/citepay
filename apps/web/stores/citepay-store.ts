import type { AgentStage, ContentSource, PaymentRecord, QueryResponse } from "@citepay/shared";
import { create } from "zustand";

interface CitePayState {
  walletAddress: string;
  walletBalanceUsd: number;
  query: string;
  result?: QueryResponse;
  paymentLogs: PaymentRecord[];
  sourceLogs: ContentSource[];
  stages: AgentStage[];
  setQuery: (query: string) => void;
  setResult: (result: QueryResponse) => void;
  connectWallet: () => void;
}

export const useCitePayStore = create<CitePayState>((set) => ({
  walletAddress: "0xC17e...Pay",
  walletBalanceUsd: 250,
  query: "Best stablecoin payment rails for African creators",
  paymentLogs: [],
  sourceLogs: [],
  stages: [],
  setQuery: (query) => set({ query }),
  setResult: (result) =>
    set({
      result,
      paymentLogs: result.payments,
      sourceLogs: result.sources,
      stages: result.stages,
      walletBalanceUsd: Math.max(0, 250 - result.totalSpentUsd)
    }),
  connectWallet: () => set({ walletAddress: "0x9A4f...2E10" })
}));
