import { useMemo } from "react";
import { MarketData, toMarketData } from "../lib/markets";
import { useAssets } from "../contexts/useAssets";

function byRsi(a: MarketData, b: MarketData) {
  return a.rsi[b.rsi.length - 1] - b.rsi[b.rsi.length - 1];
}

export function useMarkets() {
  const [assets] = useAssets();
  return useMemo<MarketData[]>(() => {
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
}
