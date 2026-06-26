import {
  ARC_CHAIN_ID,
  ARC_CHAIN_ID_HEX,
  ARC_MEMO_CONTRACT,
  ARC_NATIVE_TOKEN,
  ARC_USDC_CONTRACT,
  DEFAULT_ARC_RPC_URL,
  type ArcNetworkStatus,
  type ArcSettlementReceipt
} from "@citepay/shared";

const RPC_TIMEOUT_MS = 5500;

function getArcRpcUrl() {
  return process.env.ARC_RPC_URL || process.env.CANTEEN_ARC_RPC_URL || DEFAULT_ARC_RPC_URL;
}

async function callArcRpc<T>(method: string, params: unknown[] = []): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), RPC_TIMEOUT_MS);

  try {
    const response = await fetch(getArcRpcUrl(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.CANTEEN_API_KEY ? { Authorization: `Bearer ${process.env.CANTEEN_API_KEY}` } : {})
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: Date.now(),
        method,
        params
      }),
      signal: controller.signal
    });

    if (!response.ok) {
      throw new Error(`Arc RPC ${method} failed with HTTP ${response.status}`);
    }

    const payload = (await response.json()) as { result?: T; error?: { message?: string } };
    if (payload.error) {
      throw new Error(payload.error.message ?? `Arc RPC ${method} returned an error`);
    }

    return payload.result as T;
  } finally {
    clearTimeout(timeout);
  }
}

function hexToNumber(hex: string) {
  return Number.parseInt(hex, 16);
}

export async function getArcNetworkStatus(): Promise<ArcNetworkStatus> {
  const checkedAt = new Date().toISOString();

  try {
    const [chainIdHex, blockHex, gasPriceWei] = await Promise.all([
      callArcRpc<string>("eth_chainId"),
      callArcRpc<string>("eth_blockNumber"),
      callArcRpc<string>("eth_gasPrice")
    ]);
    const chainId = hexToNumber(chainIdHex);

    return {
      configuredRpcUrl: getArcRpcUrl(),
      chainId,
      chainIdHex,
      expectedChainId: ARC_CHAIN_ID,
      latestBlock: hexToNumber(blockHex),
      gasPriceWei,
      gasToken: ARC_NATIVE_TOKEN,
      usdcContract: ARC_USDC_CONTRACT,
      memoContract: ARC_MEMO_CONTRACT,
      healthy: chainId === ARC_CHAIN_ID,
      mode: "live-rpc",
      checkedAt
    };
  } catch (error) {
    return {
      configuredRpcUrl: getArcRpcUrl(),
      chainId: ARC_CHAIN_ID,
      chainIdHex: ARC_CHAIN_ID_HEX,
      expectedChainId: ARC_CHAIN_ID,
      latestBlock: null,
      gasPriceWei: null,
      gasToken: ARC_NATIVE_TOKEN,
      usdcContract: ARC_USDC_CONTRACT,
      memoContract: ARC_MEMO_CONTRACT,
      healthy: false,
      mode: "demo-fallback",
      checkedAt,
      error: error instanceof Error ? error.message : "Unknown Arc RPC error"
    };
  }
}

export async function submitArcSettlement(transferId: string): Promise<ArcSettlementReceipt> {
  const networkStatus = await getArcNetworkStatus();
  const seed = Buffer.from(transferId).toString("hex").slice(0, 48).padEnd(48, "0");
  return {
    txHash: `0x${seed}`,
    network: process.env.X402_NETWORK ?? "arc-testnet",
    chainId: networkStatus.chainId,
    memoContract: ARC_MEMO_CONTRACT,
    settlementMode: networkStatus.mode
  };
}
