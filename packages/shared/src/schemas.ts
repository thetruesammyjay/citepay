import { z } from "zod";
import { PAYMENT_STATUSES, SOURCE_TYPES } from "./constants";

export const queryRequestSchema = z.object({
  query: z.string().min(8).max(600),
  userId: z.string().optional(),
  budgetUsd: z.number().positive().max(10).optional()
});

export const paymentRequestSchema = z.object({
  sourceId: z.string().min(1),
  amountUsd: z.number().positive(),
  destinationWallet: z.string().min(8),
  queryId: z.string().optional()
});

export const sourceSchema = z.object({
  id: z.string(),
  title: z.string(),
  publisher: z.string(),
  url: z.string().url(),
  type: z.enum(SOURCE_TYPES),
  trustScore: z.number().min(0).max(100),
  relevanceScore: z.number().min(0).max(100),
  freshnessScore: z.number().min(0).max(100),
  citationPriceUsd: z.number().min(0),
  walletAddress: z.string(),
  excerpt: z.string(),
  license: z.string()
});

export const paymentStatusSchema = z.enum(PAYMENT_STATUSES);
