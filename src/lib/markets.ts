import { KlinesData } from "../contexts/useKlinesContext";
import { AnalysisData, getAnalysisData } from "./analysis";
import { OHLCData, toOhlcData } from "./ohlc";

export type MarketData = {
  baseAsset: string;
  quoteAsset: string;
  ohlc: OHLCData[];
  priceChangePercent: number;
  lastPrice: number;
  // heikinAshi: OHLCData[];
} & AnalysisData;

export const MARKET_PERIOD = 30;

export function toMarketData(
  baseAsset: string,
  quoteAsset: string,
  klines: KlinesData[],
  ticker24hr: Ticker24hr | undefined
): MarketData | null {
  const klinesBaseAsset = klines.find(
    (data) => data.asset === baseAsset
  )?.klines;
  const klinesQuoteAsset = klines.find(
    (data) => data.asset === quoteAsset
  )?.klines;
  const ohlc =
    klinesBaseAsset &&
    klinesQuoteAsset &&
    klinesBaseAsset.map(toOhlcData(klinesQuoteAsset));
  if (ohlc) {
    return {
      baseAsset,
      quoteAsset,
      ohlc: ohlc.slice(-MARKET_PERIOD),
      priceChangePercent: Number(ticker24hr?.priceChangePercent),
      lastPrice: Number(ticker24hr?.lastPrice),
      ...getAnalysisData(ohlc, MARKET_PERIOD),
    };
  }
  return null;
}
