import React, { ReactNode, useMemo } from "react";
import { MarketData, MarketsContext } from "./useMarketsContext";
import { KlinesData, useKlinesContext } from "./useKlinesContext";
import { toOhlcData } from "../lib/ohlc";
import { BollingerBands, MACD, RSI } from "technicalindicators";

export const MARKETS_LIMIT = 30;

export const BOLLINGER_BANDS_PERIOD = 21;
export const BOLLINGER_BANDS_STANDARD_DEVIATION = 2;

export const MACD_FAST_PERIOD = 12;
export const MACD_SLOW_PERIOD = 26;
export const MACD_SIGNAL_PERIOD = 9;

export const RSI_PERIOD = 6;

export const SCORE_PERIOD = 1;

function toMarketData(
  asset: string,
  currency: string,
  klines: KlinesData[]
): MarketData | null {
  const marketAsset = klines.find((data) => data.asset === asset)?.klines;
  const marketCurrency = klines.find((data) => data.asset === currency)?.klines;
  const ohlc =
    marketAsset &&
    marketCurrency &&
    marketAsset.map(toOhlcData(marketCurrency));
  if (!ohlc) {
    return null;
  }
  const values = ohlc.map((data) => data.close);
  const bollingerBands = BollingerBands.calculate({
    period: BOLLINGER_BANDS_PERIOD,
    stdDev: BOLLINGER_BANDS_STANDARD_DEVIATION,
    values,
  });
  const macd = MACD.calculate({
    values,
    fastPeriod: MACD_FAST_PERIOD,
    slowPeriod: MACD_SLOW_PERIOD,
    signalPeriod: MACD_SIGNAL_PERIOD,
    SimpleMAOscillator: false,
    SimpleMASignal: false,
  });
  const rsi = RSI.calculate({
    values,
    period: RSI_PERIOD,
  });
  return {
    asset,
    currency,
    ohlc: ohlc.slice(-MARKETS_LIMIT),
    bollingerBands: [
      ...Array(ohlc.length - bollingerBands.length).fill(undefined),
      ...bollingerBands,
    ].slice(-MARKETS_LIMIT),
    macd: [...Array(ohlc.length - macd.length).fill(undefined), ...macd].slice(
      -MARKETS_LIMIT
    ),
    rsi: [...Array(ohlc.length - rsi.length).fill(undefined), ...rsi].slice(
      -MARKETS_LIMIT
    ),
    score:
      ((values[values.length - 1] - values[values.length - SCORE_PERIOD - 1]) /
        values[values.length - SCORE_PERIOD - 1]) *
      100,
  };
}

function byScore(a: MarketData, b: MarketData) {
  const rsiScore = a.rsi[b.rsi.length - 1] - b.rsi[a.rsi.length - 1];
  const score = a.score - b.score;
  return rsiScore + score;
}

export function MarketsProvider(props: {
  assets: string[];
  children: ReactNode;
}) {
  const klines = useKlinesContext();

  const markets = useMemo<MarketData[]>(() => {
    return props.assets
      .map(
        (asset) =>
          props.assets
            .filter((currency) => currency !== asset)
            .map((currency) => toMarketData(asset, currency, klines))
            .filter(Boolean) as MarketData[]
      )
      .flat()
      .sort(byScore);
  }, [klines, props.assets]);

  return (
    <MarketsContext.Provider value={markets}>
      {props.children}
    </MarketsContext.Provider>
  );
}
