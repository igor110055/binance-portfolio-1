import { loadRequest } from "../request";
import { applyBinanceRequestConfig } from "./binance";

export type BinanceTicker = {
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

export type BinanceTickerParams = { symbol: string };

export function loadBinanceTicker(params: BinanceTickerParams) {
  const config = applyBinanceRequestConfig(
    "/api/v3/ticker/24hr",
    {
      method: "get",
      params,
    },
    false
  );
  return loadRequest<BinanceTicker>(config);
}
