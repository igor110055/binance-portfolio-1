import React, { ReactNode, useMemo } from "react";
import {
  MarketsContext,
  MarketsContextData,
  MarketsData,
} from "./useMarketsContext";
import { KlinesContextData, useKlinesContext } from "./useKlinesContext";

const toOhlcData =
  (currencyKlines: Kline[]) =>
  (
    [time, assetOpen, assetHigh, assetLow, assetClose]: Kline,
    index: number
  ): OHLCData => {
    const [, currencyOpen, currencyHigh, currencyLow, currencyClose] =
      currencyKlines[index];
    const open = Number(assetOpen) / Number(currencyOpen);
    const high = Number(assetHigh) / Number(currencyHigh);
    const low = Number(assetLow) / Number(currencyLow);
    const close = Number(assetClose) / Number(currencyClose);
    return {
      time: new Date(time),
      open,
      high: Math.max(open, close, high),
      low: Math.min(open, close, low),
      close,
    };
  };

const toMarketsData =
  (asset: string, klines: KlinesContextData[]) =>
  (currency: string): MarketsData | undefined => {
    const marketAsset = klines.find((data) => data.asset === asset)?.klines;
    const marketCurrency = klines.find(
      (data) => data.asset === currency
    )?.klines;
    return (
      marketAsset &&
      marketCurrency && {
        currency,
        ohlc: marketAsset.map(toOhlcData(marketCurrency)),
      }
    );
  };

const toMarketsContextData =
  (klines: KlinesContextData[]) =>
  (asset: string): MarketsContextData => {
    return {
      asset,
      markets: klines
        .map((balance) => balance.asset)
        .filter((currency) => currency !== asset)
        .map(toMarketsData(asset, klines))
        .filter(Boolean) as MarketsData[],
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
