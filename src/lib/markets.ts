import { StrategyData, StrategyWeight } from "../contexts/Strategy/useStrategy";
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
      ratio: analysis.limitBuy / lastPrice,
      basePrice:
        baseAsset.lastPrice / Math.max(1, lastPrice / analysis.limitBuy),
      quotePrice:
        quoteAsset.lastPrice * Math.max(1, lastPrice / analysis.limitBuy),
    },
    sell: {
      ratio: lastPrice / analysis.limitSell,
      basePrice:
        baseAsset.lastPrice * Math.max(1, analysis.limitSell / lastPrice),
      quotePrice:
        quoteAsset.lastPrice / Math.max(1, analysis.limitSell / lastPrice),
    },
  };
}

export function getTradeValue(market: MarketData, strategy: StrategyData) {
  const baseWeight = strategy.weights.find(
    (weight) => weight.assetId === market.baseAsset.assetId
  );
  const quoteWeight = strategy.weights.find(
    (weight) => weight.assetId === market.quoteAsset.assetId
  );
  return Math.min(
    Math.abs(baseWeight?.tradeValue || 0),
    Math.abs(quoteWeight?.tradeValue || 0)
  );
}

export function getTradeAmounts(market: MarketData, strategy: StrategyData) {
  const tradeValue = getTradeValue(market, strategy);
  return {
    tradeValue,
    baseAmount: tradeValue / market.buy.basePrice,
    quoteAmount: tradeValue / market.buy.quotePrice,
  };
}

export function getTradeLimit(market: MarketData, weight: StrategyWeight) {
  const amount = Math.abs(weight.tradeAmount);
  const price =
    weight.tradeValue > 0 ? market.buy.basePrice : market.sell.basePrice;
  const ratio = weight.tradeValue > 0 ? market.buy.ratio : market.sell.ratio;
  return {
    amount,
    price,
    ratio,
  };
}
