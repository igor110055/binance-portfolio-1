import { loadRequest } from "../request";
import { applyBinanceRequestConfig } from "./binance";

export type BinanceTicker24hr = {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  weightedAvgPrice: string;
  prevClosePrice: string;
  lastPrice: string;
  lastQty: string;
  bidPrice: string;
  bidQty: string;
  askPrice: string;
  askQty: string;
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  volume: string;
  quoteVolume: string;
  openTime: number;
  closeTime: number;
  firstId: number;
  lastId: number;
  count: number;
};

export type BinanceTicker24hrParams = { symbol: string };

export function loadBinanceTicker24hr(params: BinanceTicker24hrParams) {
  const config = applyBinanceRequestConfig(
    "/api/v3/ticker/24hr",
    {
      method: "get",
      params,
    },
    false
  );
  return loadRequest<BinanceTicker24hr>(config);
}
