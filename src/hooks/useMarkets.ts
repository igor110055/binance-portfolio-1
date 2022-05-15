import { useMemo } from "react";
import { MarketData, toMarketData } from "../lib/markets";
import { useAssets } from "../contexts/Assets/useAssets";
import { useStrategy } from "./useStrategy";

const MINIMUM_TRADE = 0;

function byRsi(a: MarketData, b: MarketData) {
  return a.rsi[b.rsi.length - 1] - b.rsi[b.rsi.length - 1];
}

export function useMarkets() {
  const [assets] = useAssets();
  const strategy = useStrategy();
  return useMemo<MarketData[]>(() => {
    const baseAssets = assets.filter((asset) => {
      const baseStrategy = strategy.weights.find(
        (weight) => weight.assetId === asset.assetId
      );
      return (
        baseStrategy &&
        baseStrategy.target - baseStrategy.current >= MINIMUM_TRADE
      );
    });
    const quoteAssets = assets.filter((asset) => {
      const quoteStrategy = strategy.weights.find(
        (weight) => weight.assetId === asset.assetId
      );
      return (
        quoteStrategy &&
        quoteStrategy.current - quoteStrategy.target >= MINIMUM_TRADE
      );
    });
    return baseAssets
      .map((baseAsset) => {
        return quoteAssets.map((quoteAsset) => {
          return toMarketData(baseAsset, quoteAsset);
        });
      })
      .flat()
      .sort(byRsi);
  }, [assets, strategy.weights]);
}
