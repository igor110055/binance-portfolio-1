import { useMemo } from "react";
import { useAssets } from "../contexts/Assets/useAssets";
import { usePortfolio } from "../contexts/Portfolio/usePortfolio";

export function usePortfolioWeights() {
  const [assets] = useAssets();
  const [portfolio] = usePortfolio();
  const [sums, total] = useMemo(
    () =>
      portfolio.reduce<[[assetId: string, sum: number | undefined][], number]>(
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
    return sums.reduce<{ [assetId: string]: number | undefined }>(
      (weights, [assetId, sum]) => {
        if (sum !== undefined) {
          weights[assetId] = (sum / total) * 100;
        }
        return weights;
      },
      {}
    );
  }, [sums, total]);
}
