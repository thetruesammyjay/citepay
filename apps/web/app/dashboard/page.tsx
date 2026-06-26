"use client";

import { useQuery } from "@tanstack/react-query";
import { Activity, BadgeDollarSign, DatabaseZap, RadioTower, Unlock } from "lucide-react";
import { getArcStatus, getHistory, getPayments } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const payments = useQuery({ queryKey: ["payments"], queryFn: getPayments });
  const history = useQuery({ queryKey: ["history"], queryFn: getHistory });
  const arcStatus = useQuery({ queryKey: ["arc-status"], queryFn: getArcStatus, refetchInterval: 30000 });
  const latest = history.data?.[0];
  const totalSpent = payments.data?.reduce((sum, payment) => sum + payment.amountUsd, 0) ?? latest?.totalSpentUsd ?? 0;

  return (
    <main className="mx-auto w-[min(1180px,calc(100%-2rem))] py-12">
      <Badge>
        <RadioTower className="size-3" />
        Arc payment telemetry
      </Badge>
      <h1 className="mt-4 font-heading text-5xl font-black text-slate-950 md:text-7xl">Payment intelligence dashboard</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {[
          [BadgeDollarSign, `$${totalSpent.toFixed(4)}`, "total spent"],
          [Unlock, `${latest?.unlockedContentCount ?? 4}`, "unlocked content"],
          [DatabaseZap, `${latest?.sources.filter((source) => source.shouldCite).length ?? 4}`, "sources used"],
          [Activity, `$${totalSpent.toFixed(4)}`, "creator earnings"]
        ].map(([Icon, value, label]) => (
          <Card key={String(label)}>
            <Icon className="size-7 text-sky-600" />
            <p className="mt-5 font-heading text-4xl font-black text-slate-950">{String(value)}</p>
            <p className="text-sm text-slate-500">{String(label)}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="font-heading text-2xl font-bold text-slate-950">Arc network readiness</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              CitePay checks the configured Arc RPC before labeling payments as Arc-ready. Live RPC mode confirms the chain ID and block height; demo mode keeps the hackathon flow available when credentials are not configured.
            </p>
          </div>
          <Badge className={arcStatus.data?.healthy ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-amber-200 bg-amber-50 text-amber-700"}>
            {arcStatus.isLoading ? "Checking" : arcStatus.data?.healthy ? "Live RPC" : "Demo fallback"}
          </Badge>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-4">
          {[
            ["Chain ID", arcStatus.data ? `${arcStatus.data.chainId}` : "5042002"],
            ["Latest block", arcStatus.data?.latestBlock ? `${arcStatus.data.latestBlock}` : "Pending"],
            ["Gas token", arcStatus.data?.gasToken ?? "USDC"],
            ["USDC contract", arcStatus.data?.usdcContract ? `${arcStatus.data.usdcContract.slice(0, 10)}...${arcStatus.data.usdcContract.slice(-6)}` : "0x3600...0000"],
            ["Memo contract", arcStatus.data?.memoContract ? `${arcStatus.data.memoContract.slice(0, 10)}...${arcStatus.data.memoContract.slice(-6)}` : "0x5294...e505"]
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase text-slate-500">{label}</p>
              <p className="mt-2 font-mono text-sm font-semibold text-slate-900">{value}</p>
            </div>
          ))}
        </div>
        {arcStatus.data?.error ? <p className="mt-4 text-sm text-amber-700">{arcStatus.data.error}</p> : null}
      </Card>

      <Card className="mt-6 overflow-hidden">
        <h2 className="font-heading text-2xl font-bold text-slate-950">Citation payment log</h2>
        <div className="mt-5 overflow-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="text-slate-500">
              <tr>
                <th className="py-3">Source</th>
                <th>Publisher</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Tx hash</th>
              </tr>
            </thead>
            <tbody>
              {(payments.data ?? latest?.payments ?? []).map((payment) => (
                <tr key={payment.id} className="border-t border-slate-200">
                  <td className="py-4 pr-4 font-semibold">{payment.sourceTitle}</td>
                  <td className="pr-4 text-slate-600">{payment.publisher}</td>
                  <td className="pr-4">${payment.amountUsd.toFixed(4)} USDC</td>
                  <td className="pr-4 text-sky-700">{payment.status}</td>
                  <td className="font-mono text-xs text-slate-500">{payment.txHash.slice(0, 18)}...</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </main>
  );
}
