import { loadRequest } from "../request";
import { applyBinanceRequestConfig } from "./binance";

export const KLINES_INTERVAL = "1d";
export const KLINES_LIMIT = 90;

export type BinanceKline = [
  openTime: number,
  open: string,
  high: string,
  low: string,
  close: string,
  volume: string,
  closeTime: number,
  quoteAssetVolume: string,
  numberOfTrades: number,
  takerBuyBaseAssetVolume: string,
  takerBuyQuoteAssetVolume: string,
  ignore: string
];

export type BinanceKlinesParams = { symbol: string };

export function loadBinanceKlines(params: BinanceKlinesParams) {
  const config = applyBinanceRequestConfig(
    "/api/v3/klines",
    {
      method: "get",
      params: {
        ...params,
        interval: KLINES_INTERVAL,
        limit: KLINES_LIMIT,
      },
    },
    false
  );
  return loadRequest<BinanceKline[]>(config);
}
