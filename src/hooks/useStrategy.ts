import { useMemo } from "react";
import { useAssets } from "../contexts/Assets/useAssets";
import { usePortfolio } from "../contexts/Portfolio/usePortfolio";
import { AssetId } from "../lib/assets";

export type StrategyData = {
  weights: { [assetId in AssetId]: number };
  total: number;
};

export function useStrategy() {
  const [assets] = useAssets();
  const [portfolio] = usePortfolio();
  const [sums, total] = useMemo(
    () =>
      portfolio.reduce<[[assetId: AssetId, sum: number | undefined][], number]>(
        ([s, t], balance) => {
          const asset = assets.find((a) => a.assetId === balance.assetId);
          if (asset) {
            const sum =
              (balance.available + balance.unavailable) * asset.lastPrice;
            t += sum;
            s.push([balance.assetId, sum]);
          } else {
            s.push([balance.assetId, undefined]);
          }
          return [s, t];
        },
        [[], 0]
      ),
    [assets, portfolio]
  );
  return useMemo(() => {
    return sums.reduce(
      (strategy, [assetId, sum]) => {
        if (sum !== undefined) {
          strategy.weights[assetId] = (sum / total) * 100;
        }
        return strategy;
      },
      { weights: {}, total } as StrategyData
    );
  }, [sums, total]);
}
