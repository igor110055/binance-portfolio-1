import React, { ReactNode, useMemo } from "react";
import { MarketData, MarketsContext } from "./useMarketsContext";
import { KlinesData, useKlinesContext } from "./useKlinesContext";
import { toOhlcData } from "../lib/ohlc";
import { BollingerBands } from "technicalindicators";

export const MARKETS_LIMIT = 30;

export const BOLLINGER_BANDS_PERIOD = 21;
export const BOLLINGER_BANDS_STANDARD_DEVIATION = 2;

const toMarketData = (
  asset: string,
  currency: string,
  klines: KlinesData[]
): MarketData | null => {
  const marketAsset = klines.find((data) => data.asset === asset)?.klines;
  const marketCurrency = klines.find((data) => data.asset === currency)?.klines;
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
    ohlc: ohlc.slice(-MARKETS_LIMIT),
    bollingerBands: [
      ...Array(ohlc.length - bollingerBands.length).fill(undefined),
      ...bollingerBands,
    ].slice(-MARKETS_LIMIT),
  };
};

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
      .flat();
  }, [klines, props.assets]);

  return (
    <MarketsContext.Provider value={markets}>
      {props.children}
    </MarketsContext.Provider>
  );
}
