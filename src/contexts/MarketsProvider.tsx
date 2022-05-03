import React, { ReactNode, useMemo } from "react";
import {
  MarketData,
  MarketsContext,
  MarketsContextData,
} from "./useMarketsContext";
import { KlinesContextData, useKlinesContext } from "./useKlinesContext";
import { toOhlcData } from "../lib/ohlc";
import { BollingerBands } from "technicalindicators";

export const BOLLINGER_BANDS_PERIOD = 21;
export const BOLLINGER_BANDS_STANDARD_DEVIATION = 2;

const toMarketData =
  (asset: string, klines: KlinesContextData[]) =>
  (currency: string): MarketData | null => {
    const marketAsset = klines.find((data) => data.asset === asset)?.klines;
    const marketCurrency = klines.find(
      (data) => data.asset === currency
    )?.klines;
    const ohlc =
      marketAsset &&
      marketCurrency &&
      marketAsset.map(toOhlcData(marketCurrency));
    if (!ohlc) {
      return null;
    }
    const bollingerBands = BollingerBands.calculate({
      period: BOLLINGER_BANDS_PERIOD,
      stdDev: BOLLINGER_BANDS_STANDARD_DEVIATION,
      values: ohlc.map((data) => data.close),
    });
    return {
      asset,
      currency,
      ohlc,
      bollingerBands: [
        ...Array(ohlc.length - bollingerBands.length).fill(undefined),
        ...bollingerBands,
      ],
    };
  };

const toMarketsContextData =
  (klines: KlinesContextData[]) =>
  (asset: string): MarketsContextData => {
    return {
      asset,
      markets: klines
        .map((balance) => balance.asset)
        .filter((currency) => currency !== asset)
        .map(toMarketData(asset, klines))
        .filter(Boolean) as MarketData[],
    };
  };

export function MarketsProvider(props: { children: ReactNode }) {
  const klines = useKlinesContext();

  const markets = useMemo<MarketsContextData[]>(() => {
    return klines
      .map((balance) => balance.asset)
      .map(toMarketsContextData(klines));
  }, [klines]);

  return (
    <MarketsContext.Provider value={markets}>
      {props.children}
    </MarketsContext.Provider>
  );
}
