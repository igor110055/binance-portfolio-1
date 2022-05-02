import { useMemo } from "react";
import { applyBinanceRequestConfig } from "../lib/binance";
import { useRequest } from "./useRequest";

export function useBinanceAccount(recvWindow?: number) {
  const config = useMemo(() => {
    return applyBinanceRequestConfig(
      "/v3/account",
      { method: "get", params: { recvWindow } },
      true
    );
  }, [recvWindow]);
  return useRequest<Account>(config);
}

export function useBinanceKlines(
  symbol: string,
  interval: string,
  limit: number
) {
  const config = useMemo(
    () =>
      applyBinanceRequestConfig(
        "/v3/klines",
        { method: "get", params: { symbol, interval, limit } },
        false
      ),
    [symbol, interval, limit]
  );
  return useRequest<Kline[]>(config);
}

export function useBinanceTickerPrices() {
  const config = useMemo(() => {
    return applyBinanceRequestConfig(
      "/v3/ticker/price",
      { method: "get" },
      false
    );
  }, []);
  return useRequest<TickerPrice[]>(config);
}
