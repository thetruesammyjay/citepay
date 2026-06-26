"use client";

import { motion } from "framer-motion";
import { ArrowRight, BadgeDollarSign, Blocks, CircleDollarSign, ShieldCheck, Sparkles, WalletCards } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6 }
};

const flow = ["User Query", "Source Discovery", "Trust Scoring", "Payment Detection", "USDC Execution", "Final Answer"];

const features = [
  {
    icon: ShieldCheck,
    title: "Trust-ranked citations",
    body: "Every candidate source is scored by authority, relevance, freshness, licensing terms, and price."
  },
  {
    icon: CircleDollarSign,
    title: "USDC micropayments",
    body: "Agents settle per-citation payments through Circle Wallets and Arc-ready transaction adapters."
  },
  {
    icon: Blocks,
    title: "x402 source unlocks",
    body: "Protected content can expose machine-payable access without forcing users through manual checkout."
  }
];

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      <section className="relative mx-auto grid min-h-[calc(100vh-6rem)] w-[min(1180px,calc(100%-2rem))] items-center gap-12 py-16 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="absolute inset-x-8 top-16 -z-10 h-80 rounded-[999px] bg-gradient-to-r from-sky-200 via-cyan-100 to-blue-100 blur-3xl" />
        <motion.div {...fadeUp}>
          <Badge className="mb-6">
            <span className="size-2 rounded-full bg-sky-500 shadow-[0_0_20px_rgba(24,168,255,0.4)]" />
            Verified source payments for the Lepton Hackathon
          </Badge>
          <h1 className="font-heading text-6xl font-black leading-[0.92] tracking-normal text-slate-950 md:text-8xl">
            AI Answers That <span className="gradient-text">Pay Their Sources</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            CitePay turns AI research into a fair citation economy. Agents discover trusted sources, unlock premium content with USDC, and attach verifiable payment receipts to every answer.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/query">
              <Button>
                Try the agent
                <ArrowRight className="size-4" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="secondary">
                View dashboard
                <WalletCards className="size-4" />
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
          <Card className="relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400 to-transparent" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Agent budget</p>
                <p className="font-heading text-4xl font-black text-slate-950">$0.018 USDC</p>
              </div>
              <BadgeDollarSign className="size-10 text-sky-500" />
            </div>
            <div className="mt-8 space-y-3">
              {flow.map((item, index) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <span className="grid size-8 place-items-center rounded-full bg-sky-100 text-sm font-bold text-sky-700">{index + 1}</span>
                  <span className="font-semibold text-slate-900">{item}</span>
                  <span className="ml-auto text-xs text-slate-500">complete</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </section>

      <section className="border-y border-slate-200 bg-white py-16">
        <div className="mx-auto w-[min(1180px,calc(100%-2rem))]">
        <motion.div {...fadeUp} className="mb-8 flex items-end justify-between gap-6">
          <div>
            <Badge>Interactive protocol demo</Badge>
            <h2 className="mt-4 font-heading text-4xl font-black text-slate-950 md:text-6xl">Research query to paid answer</h2>
          </div>
          <Link href="/query" className="hidden text-sm font-bold text-sky-700 md:block">
            Open full query console
          </Link>
        </motion.div>
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <Card>
            <p className="text-sm font-semibold text-slate-500">Prompt</p>
            <div className="mt-3 rounded-3xl border border-slate-200 bg-slate-50 p-5 text-lg font-semibold text-slate-900">
              Best stablecoin payment rails for African creators
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {["USDC payouts", "Arc settlement", "x402 unlock", "Creator earnings"].map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
          </Card>
          <Card>
            <div className="space-y-3">
              {["Discovered 5 sources", "Ranked 4 sources above trust threshold", "Paid 3 publishers in USDC", "Generated answer with transaction receipts"].map((item, index) => (
                <motion.div
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.12 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3">
                    <Sparkles className="size-4 text-sky-600" />
                    <span className="font-semibold text-slate-900">{item}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
        </div>
      </section>

      <section className="mx-auto w-[min(1180px,calc(100%-2rem))] py-16">
        <motion.div {...fadeUp}>
          <Badge>Core features</Badge>
          <h2 className="mt-4 font-heading text-4xl font-black text-slate-950 md:text-6xl">Built like a funded research product</h2>
        </motion.div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title}>
              <feature.icon className="size-9 text-sky-600" />
              <h3 className="mt-6 font-heading text-2xl font-bold text-slate-950">{feature.title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{feature.body}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto w-[min(1180px,calc(100%-2rem))] py-16">
        <Card className="grid gap-8 md:grid-cols-3">
          {[
            ["$0.0103", "spent on premium citations"],
            ["4", "sources unlocked"],
            ["100%", "answers with payment receipts"]
          ].map(([value, label]) => (
            <div key={label}>
              <p className="font-heading text-5xl font-black gradient-text">{value}</p>
              <p className="mt-2 text-slate-600">{label}</p>
            </div>
          ))}
        </Card>
      </section>

    </main>
  );
}
