import { useMemo } from "react";
import { useAssets } from "../contexts/Assets/useAssets";
import { usePortfolio } from "../contexts/Portfolio/usePortfolio";
import { AssetId } from "../lib/assets";

export type StrategyWeight = {
  assetId: AssetId;
  current: number;
  userTarget: number | undefined;
  actualTarget: number;
};
export type StrategyData = {
  totalValue: number;
  userTargetTotal: number;
  weights: StrategyWeight[];
};

export function useStrategy() {
  const [assets] = useAssets();
  const [portfolio] = usePortfolio();

  return useMemo<StrategyData>(() => {
    const totalValue = assets.reduce((total, asset) => {
      const balance = portfolio.find((b) => b.assetId === asset.assetId);
      if (balance) {
        return total + balance.available * asset.lastPrice;
      }
      return total;
    }, 0);

    const userTargetTotal = portfolio.reduce((total, balance) => {
      if (balance.target === undefined) {
        return total;
      }
      return total + balance.target;
    }, 0);

    const currentRemainder =
      assets.reduce((total, asset) => {
        const balance = portfolio.find((b) => b.assetId === asset.assetId);
        if (balance && balance.target === undefined) {
          return total + balance.available * asset.lastPrice;
        }
        return total;
      }, 0) / totalValue;

    const userTargetRemainder = (100 - userTargetTotal) / 100;

    const remainderRatio =
      userTargetRemainder !== 0 ? currentRemainder / userTargetRemainder : 0;

    console.log({
      totalValue,
      userTargetTotal,
      currentRemainder,
      userTargetRemainder,
      remainderRatio,
    });

    return {
      totalValue,
      userTargetTotal,
      weights: portfolio.map((balance) => {
        const asset = assets.find((a) => a.assetId === balance.assetId);
        if (asset) {
          const current = (balance.available * asset.lastPrice) / totalValue;
          const getActualTarget = () => {
            if (balance.target === undefined) {
              if (remainderRatio > 0) {
                return current / remainderRatio;
              }
              return 0;
            }
            if (
              currentRemainder === 0 &&
              userTargetRemainder > 0 &&
              userTargetTotal > 0
            ) {
              return balance.target / userTargetTotal;
            }
            return balance.target / Math.max(100, userTargetTotal);
          };
          return {
            assetId: asset.assetId,
            current,
            userTarget: balance.target,
            actualTarget: getActualTarget(),
          };
        }
        return {
          assetId: balance.assetId,
          current: 0,
          userTarget: balance.target,
          actualTarget: 0,
        };
      }),
    };
  }, [assets, portfolio]);
}
