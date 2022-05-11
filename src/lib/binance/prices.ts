import { loadRequest } from "../request";
import { applyBinanceRequestConfig } from "./binance";

export type BinancePrice = {
  symbol: string;
  price: string;
};

export type BinancePricesParams = {};

export function loadBinancePrices(params: BinancePricesParams) {
  const config = applyBinanceRequestConfig(
    "/api/v3/ticker/price",
    {
      method: "get",
      params,
    },
    false
  );
  return loadRequest<BinancePrice[]>(config);
}
