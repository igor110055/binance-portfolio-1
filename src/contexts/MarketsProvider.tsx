import React, { ReactNode, useMemo } from "react";
import { MarketsContext } from "./useMarketsContext";
import { useKlinesContext } from "./useKlinesContext";
import { MarketData, toMarketData } from "../lib/markets";
import { useTicker24hrContext } from "./useTicker24hrContext";

function byRsi(a: MarketData, b: MarketData) {
  return a.rsi[b.rsi.length - 1] - b.rsi[b.rsi.length - 1];
}

export function MarketsProvider(props: {
  assets: string[];
  children: ReactNode;
}) {
  const klines = useKlinesContext();
  const ticker24hr = useTicker24hrContext();

  const markets = useMemo<MarketData[]>(() => {
    return props.assets
      .map((baseAsset) => {
        const assetTicker24hr = ticker24hr.find(
          (data) => data.asset === baseAsset
        );
        return props.assets
          .filter((quoteAsset) => quoteAsset !== baseAsset)
          .map((quoteAsset) => {
            return toMarketData(
              baseAsset,
              quoteAsset,
              klines,
              assetTicker24hr?.ticker24hr
            );
          })
          .filter(Boolean) as MarketData[];
      })
      .flat()
      .sort(byRsi);
  }, [klines, ticker24hr, props.assets]);

  return (
    <MarketsContext.Provider value={markets}>
      {props.children}
    </MarketsContext.Provider>
  );
}
