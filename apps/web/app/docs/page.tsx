import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const docs = [
  ["Architecture", "apps/web handles product surfaces while apps/api orchestrates AI, payments, and persistence."],
  ["Agent Flow", "Query intake, discovery, trust scoring, payment decision, payment execution, and response generation."],
  ["Arc Integration", "Arc readiness checks confirm chain ID, latest block, USDC gas metadata, and Memo contract configuration."],
  ["Payments", "Circle Wallets create USDC transfer intents, Arc records settlement metadata, and x402 unlocks protected content."],
  ["Database", "Users, Sources, Queries, Payments, Citations, and Wallets are modeled in Prisma."]
];

export default function DocsPage() {
  return (
    <main className="mx-auto w-[min(1180px,calc(100%-2rem))] py-12">
      <Badge>Documentation</Badge>
      <h1 className="mt-4 font-heading text-5xl font-black text-slate-950 md:text-7xl">CitePay system docs</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {docs.map(([title, body]) => (
          <Card key={title}>
            <h2 className="font-heading text-2xl font-bold text-slate-950">{title}</h2>
            <p className="mt-3 leading-7 text-slate-600">{body}</p>
          </Card>
        ))}
      </div>
    </main>
  );
}
