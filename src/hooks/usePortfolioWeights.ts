import { useMemo } from "react";
import { usePortfolio } from "../contexts/Portfolio/usePortfolio";
import { useAssets } from "../contexts/useAssets";

export function usePortfolioWeights() {
  const [portfolio] = usePortfolio();
  const [assets] = useAssets();
  return useMemo(() => {
    const [amounts, total] = portfolio.reduce<
      [[assetId: string, amount: number | undefined][], number]
    >(
      ([a, t], balance) => {
        const asset = assets.find((a) => a.assetId === balance.assetId);
        if (asset) {
          const amount =
            (balance.available + balance.unavailable) * asset.lastPrice;
          t += amount;
          a.push([balance.assetId, amount]);
        } else {
          a.push([balance.assetId, undefined]);
        }
        return [a, t];
      },
      [[], 0]
    );
    return amounts.reduce<{ [assetId: string]: number | undefined }>(
      (weights, [assetId, amount]) => {
        if (amount) {
          weights[assetId] = (amount / total) * 100;
        }
        return weights;
      },
      {}
    );
  }, [assets, portfolio]);
}
