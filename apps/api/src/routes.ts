import { runCitePayAgent } from "@citepay/ai";
import { discoverSources } from "@citepay/ai/source-discovery";
import { executeMicropayments, getArcNetworkStatus } from "@citepay/payments";
import { paymentRequestSchema, queryRequestSchema } from "@citepay/shared";
import type { FastifyInstance } from "fastify";
import { paymentHistory, queryHistory } from "./store";

export async function registerRoutes(app: FastifyInstance) {
  app.get("/health", async () => ({ ok: true, service: "citepay-api" }));

  app.post("/api/query", async (request, reply) => {
    const parsed = queryRequestSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({ error: "Invalid query payload", issues: parsed.error.flatten() });
    }

    const result = await runCitePayAgent(parsed.data);
    queryHistory.unshift(result);
    paymentHistory.unshift(...result.payments);
    return result;
  });

  app.post("/api/pay", async (request, reply) => {
    const parsed = paymentRequestSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({ error: "Invalid payment payload", issues: parsed.error.flatten() });
    }

    const source = {
      id: parsed.data.sourceId,
      title: "Manual premium source unlock",
      publisher: "Manual Settlement",
      url: "https://example.com/manual-source",
      type: "premium" as const,
      trustScore: 88,
      relevanceScore: 88,
      freshnessScore: 80,
      citationPriceUsd: parsed.data.amountUsd,
      walletAddress: parsed.data.destinationWallet,
      excerpt: "Manual payment execution path.",
      license: "pay-per-access",
      rankScore: 88,
      shouldCite: true,
      paymentRequired: true,
      paymentReason: "Manual unlock requested."
    };

    const [payment] = await executeMicropayments([source], parsed.data.queryId ?? "manual");
    paymentHistory.unshift(payment);
    return payment;
  });

  app.get("/api/sources", async () => discoverSources("Best stablecoin payment rails for African creators"));

  app.get("/api/arc/status", async () => getArcNetworkStatus());

  app.get("/api/payments", async () => paymentHistory);

  app.get("/api/history", async () => queryHistory);
}
