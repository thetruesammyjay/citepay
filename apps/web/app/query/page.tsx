"use client";

import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2, RadioTower } from "lucide-react";
import { submitQuery } from "@/lib/api";
import { useCitePayStore } from "@/stores/citepay-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function QueryPage() {
  const { query, setQuery, setResult, result } = useCitePayStore();
  const mutation = useMutation({
    mutationFn: submitQuery,
    onSuccess: setResult
  });

  return (
    <main className="mx-auto w-[min(1180px,calc(100%-2rem))] py-12">
      <div className="mb-8">
        <Badge>
          <RadioTower className="size-3" />
          Agent console
        </Badge>
        <h1 className="mt-4 font-heading text-5xl font-black md:text-7xl">Autonomous paid research</h1>
      </div>

      <Card>
        <form
          className="grid gap-4 lg:grid-cols-[1fr_auto]"
          onSubmit={(event) => {
            event.preventDefault();
            mutation.mutate({ query, budgetUsd: 0.018 });
          }}
        >
          <input
            className="min-h-14 rounded-full border border-white/10 bg-dark-900/70 px-6 text-lg text-white outline-none ring-secondary/40 transition placeholder:text-white/30 focus:ring-4"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Ask CitePay anything..."
          />
          <Button disabled={mutation.isPending} type="submit">
            {mutation.isPending ? <Loader2 className="size-4 animate-spin" /> : <ArrowRight className="size-4" />}
            Run agent
          </Button>
        </form>
      </Card>

      <div className="mt-6 grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
        <Card>
          <h2 className="font-heading text-2xl font-bold">Agent flow</h2>
          <div className="mt-5 space-y-3">
            {(result?.stages ?? ["Query Intake", "Discovery", "Trust Scoring", "Payment Decision", "Payment Execution", "Response Generation"].map((name) => ({ name, detail: "Waiting for run", status: "queued" as const }))).map((stage, index) => (
              <motion.div
                key={stage.name}
                className="rounded-2xl border border-white/10 bg-white/[0.06] p-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className={stage.status === "complete" ? "size-5 text-secondary" : "size-5 text-white/25"} />
                  <div>
                    <p className="font-bold">{stage.name}</p>
                    <p className="text-sm text-white/55">{stage.detail}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="font-heading text-2xl font-bold">AI answer stream</h2>
          <div className="mt-5 min-h-72 whitespace-pre-line rounded-3xl border border-white/10 bg-dark-900/70 p-6 leading-8 text-white/75">
            {mutation.isPending ? <div className="h-40 rounded-3xl shimmer" /> : result?.answer ?? "Run the agent to generate an answer with paid citations and settlement receipts."}
          </div>
        </Card>
      </div>
    </main>
  );
}
