import React, { ReactNode, useMemo } from "react";
import { MarketsContext } from "./useMarkets";
import { MarketData, toMarketData } from "../lib/markets";
import { useAssets } from "./useAssets";

function byRsi(a: MarketData, b: MarketData) {
  return a.rsi[b.rsi.length - 1] - b.rsi[b.rsi.length - 1];
}

export function MarketsProvider({ children }: { children: ReactNode }) {
  const assets = useAssets();
  const markets = useMemo<MarketData[]>(() => {
    return assets
      .map((baseAsset) => {
        return assets
          .filter((quoteAsset) => quoteAsset !== baseAsset)
          .map((quoteAsset) => {
            return toMarketData(baseAsset, quoteAsset);
          });
      })
      .flat()
      .sort(byRsi);
  }, [assets]);

  return (
    <MarketsContext.Provider value={markets}>
      {children}
    </MarketsContext.Provider>
  );
}
