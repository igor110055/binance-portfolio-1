import { AnalysisData, getAnalysis } from "./analysis";
import { AssetData } from "./assets";
import { crossOhlc, OHLCData } from "./ohlc";

export type MarketData = {
  baseAsset: AssetData;
  quoteAsset: AssetData;
  symbol: string;
  ohlc: OHLCData[];
  lastPrice: number;
  priceChangePercent: number;
} & AnalysisData;

export const MARKET_PERIOD = 30;

export function toMarketData(
  baseAsset: AssetData,
  quoteAsset: AssetData
): MarketData {
  const ohlc = crossOhlc(baseAsset.ohlc, quoteAsset.ohlc);
  return {
    baseAsset,
    quoteAsset,
    symbol: baseAsset.assetId + quoteAsset.assetId,
    ohlc: ohlc.slice(-MARKET_PERIOD),
    priceChangePercent:
      baseAsset.priceChangePercent - quoteAsset.priceChangePercent,
    lastPrice: baseAsset.lastPrice / quoteAsset.lastPrice,
    ...getAnalysis(ohlc, MARKET_PERIOD),
  };
}
