import { KlinesData } from "../contexts/useKlinesContext";
import { AnalysisData, getAnalysisData } from "./analysis";
import { toOhlcData } from "./ohlc";

export type MarketData = {
  baseAsset: string;
  quoteAsset: string;
  ohlc: OHLCData[];
} & AnalysisData;

export const MARKET_PERIOD = 30;

export function toMarketData(
  baseAsset: string,
  quoteAsset: string,
  klines: KlinesData[]
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
      ...getAnalysisData(ohlc, MARKET_PERIOD),
    };
  }
  return null;
}
