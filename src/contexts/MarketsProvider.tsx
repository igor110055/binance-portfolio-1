import React, { ReactNode, useMemo } from "react";
import { MarketsContext } from "./useMarketsContext";
import { useKlinesContext } from "./useKlinesContext";
import { MarketData, toMarketData } from "../lib/markets";

function byScore(a: MarketData, b: MarketData) {
  const rsiScore = a.rsi[b.rsi.length - 1] - b.rsi[b.rsi.length - 1];
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
        (baseAsset) =>
          props.assets
            .filter((quoteAsset) => quoteAsset !== baseAsset)
            .map((quoteAsset) => toMarketData(baseAsset, quoteAsset, klines))
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
