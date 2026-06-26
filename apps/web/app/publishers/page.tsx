"use client";

import { useQuery } from "@tanstack/react-query";
import { getSources } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function PublishersPage() {
  const sources = useQuery({ queryKey: ["sources"], queryFn: getSources });

  return (
    <main className="mx-auto w-[min(1180px,calc(100%-2rem))] py-12">
      <Badge>Publisher monetization</Badge>
      <h1 className="mt-4 font-heading text-5xl font-black md:text-7xl">Creator earnings from AI citations</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {(sources.data ?? []).map((source) => (
          <Card key={source.id}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-heading text-2xl font-bold">{source.publisher}</h2>
                <p className="mt-2 text-sm leading-6 text-white/55">{source.title}</p>
              </div>
              <Badge>{source.type}</Badge>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/[0.06] p-4">
                <p className="text-xs text-white/45">Citation price</p>
                <p className="mt-1 font-heading text-2xl font-black">${source.citationPriceUsd.toFixed(4)}</p>
              </div>
              <div className="rounded-2xl bg-white/[0.06] p-4">
                <p className="text-xs text-white/45">Trust score</p>
                <p className="mt-1 font-heading text-2xl font-black">{source.trustScore}</p>
              </div>
            </div>
            <p className="mt-5 font-mono text-xs text-white/45">{source.walletAddress}</p>
          </Card>
        ))}
      </div>
    </main>
  );
}
