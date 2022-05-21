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
  distanceBuy: number;
  distanceSell: number;
} & AnalysisData;

export const MARKET_PERIOD = 30;

export function toMarketData(
  baseAsset: AssetData,
  quoteAsset: AssetData
): MarketData {
  const ohlc = crossOhlc(baseAsset.ohlc, quoteAsset.ohlc);
  const analysis = getAnalysis(ohlc, MARKET_PERIOD);
  const lastPrice = baseAsset.lastPrice / quoteAsset.lastPrice;
  return {
    baseAsset,
    quoteAsset,
    symbol: baseAsset.assetId + quoteAsset.assetId,
    ohlc: ohlc.slice(-MARKET_PERIOD),
    lastPrice,
    priceChangePercent:
      baseAsset.priceChangePercent - quoteAsset.priceChangePercent,
    ...analysis,
    distanceBuy: 1 - analysis.limitBuy / lastPrice,
    distanceSell: 1 - lastPrice / analysis.limitSell,
  };
}
