import { StrategyData } from "../contexts/Strategy/useStrategy";
import { AnalysisData, getAnalysis } from "./analysis";
import { AssetData } from "./assets";
import { crossOhlc, OHLCData } from "./ohlc";

type MarketLimit = { ratio: number; basePrice: number; quotePrice: number };

export type MarketData = {
  baseAsset: AssetData;
  quoteAsset: AssetData;
  symbol: string;
  ohlc: OHLCData[];
  lastPrice: number;
  priceChangePercent: number;
  buy: MarketLimit;
  sell: MarketLimit;
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
    buy: {
      ratio: lastPrice / analysis.limitBuy,
      basePrice:
        baseAsset.lastPrice / Math.max(1, lastPrice / analysis.limitBuy),
      quotePrice:
        quoteAsset.lastPrice * Math.max(1, lastPrice / analysis.limitBuy),
    },
    sell: {
      ratio: analysis.limitSell / lastPrice,
      basePrice:
        baseAsset.lastPrice * Math.max(1, analysis.limitSell / lastPrice),
      quotePrice:
        quoteAsset.lastPrice / Math.max(1, analysis.limitSell / lastPrice),
    },
  };
}

export function getMarketTrade(market: MarketData, strategy: StrategyData) {
  const baseWeight = strategy.weights.find(
    (weight) => weight.assetId === market.baseAsset.assetId
  );
  const quoteWeight = strategy.weights.find(
    (weight) => weight.assetId === market.quoteAsset.assetId
  );
  const tradeValue = Math.min(
    Math.abs(baseWeight?.tradeValue || 0),
    Math.abs(quoteWeight?.tradeValue || 0)
  );
  return {
    tradeValue,
    buy: {
      ...market.buy,
      baseAmount: tradeValue / market.buy.basePrice,
      quoteAmount: tradeValue / market.buy.quotePrice,
    },
    sell: {
      ...market.sell,
      baseAmount: tradeValue / market.sell.basePrice,
      quoteAmount: tradeValue / market.sell.quotePrice,
    },
  };
}
