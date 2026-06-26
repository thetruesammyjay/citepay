import type { ArcNetworkStatus, ContentSource, PaymentRecord, QueryRequest, QueryResponse } from "@citepay/shared";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers
    },
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`CitePay API error: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function submitQuery(input: QueryRequest) {
  return request<QueryResponse>("/api/query", {
    method: "POST",
    body: JSON.stringify(input)
  });
}

export function getSources() {
  return request<ContentSource[]>("/api/sources");
}

export function getPayments() {
  return request<PaymentRecord[]>("/api/payments");
}

export function getHistory() {
  return request<QueryResponse[]>("/api/history");
}

export function getArcStatus() {
  return request<ArcNetworkStatus>("/api/arc/status");
}
