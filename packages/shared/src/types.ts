import type { PAYMENT_STATUSES, SOURCE_TYPES } from "./constants";

export type SourceType = (typeof SOURCE_TYPES)[number];
export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];

export interface Wallet {
  id: string;
  address: string;
  provider: "circle" | "external";
  balanceUsd: number;
}

export interface ContentSource {
  id: string;
  title: string;
  publisher: string;
  url: string;
  type: SourceType;
  trustScore: number;
  relevanceScore: number;
  freshnessScore: number;
  citationPriceUsd: number;
  walletAddress: string;
  excerpt: string;
  license: string;
}

export interface RankedSource extends ContentSource {
  rankScore: number;
  shouldCite: boolean;
  paymentRequired: boolean;
  paymentReason: string;
}

export interface PaymentRecord {
  id: string;
  sourceId: string;
  sourceTitle: string;
  publisher: string;
  amountUsd: number;
  currency: "USDC";
  status: PaymentStatus;
  txHash: string;
  network: string;
  createdAt: string;
}

export interface ArcNetworkStatus {
  configuredRpcUrl: string;
  chainId: number;
  chainIdHex: string;
  expectedChainId: number;
  latestBlock: number | null;
  gasPriceWei: string | null;
  gasToken: "USDC";
  usdcContract: string;
  memoContract: string;
  healthy: boolean;
  mode: "live-rpc" | "demo-fallback";
  checkedAt: string;
  error?: string;
}

export interface ArcSettlementReceipt {
  txHash: string;
  network: string;
  chainId: number;
  memoContract: string;
  settlementMode: "live-rpc" | "demo-fallback";
}

export interface Citation {
  id: string;
  sourceId: string;
  title: string;
  publisher: string;
  url: string;
  trustScore: number;
  paymentStatus: PaymentStatus;
  txHash?: string;
}

export interface AgentStage {
  name: string;
  status: "queued" | "running" | "complete" | "failed";
  detail: string;
}

export interface QueryRequest {
  query: string;
  userId?: string;
  budgetUsd?: number;
}

export interface QueryResponse {
  id: string;
  query: string;
  answer: string;
  totalSpentUsd: number;
  unlockedContentCount: number;
  sources: RankedSource[];
  citations: Citation[];
  payments: PaymentRecord[];
  stages: AgentStage[];
}
