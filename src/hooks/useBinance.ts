import { useMemo } from "react";
import { applyBinanceRequestConfig } from "../lib/binance";
import { useRequest } from "./useRequest";

export function useBinanceAccount(params?: { recvWindow?: number }) {
  const config = useMemo(() => {
    return applyBinanceRequestConfig(
      "/v3/account",
      { method: "get", params },
      true
    );
  }, [params]);
  return useRequest<Account>(config);
}

export function useBinanceTickerPrice(params: { symbol: string }) {
  const config = useMemo(() => {
    return applyBinanceRequestConfig(
      "/v3/ticker/price",
      { method: "get", params },
      false
    );
  }, [params]);
  return useRequest<TickerPrice>(config);
}
