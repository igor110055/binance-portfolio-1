import { useMemo } from "react";
import { useAssets } from "../contexts/Assets/useAssets";
import { usePortfolio } from "../contexts/Portfolio/usePortfolio";
import { AssetId } from "../lib/assets";

export type StrategyWeight = {
  assetId: AssetId;
  current: number;
  userTarget: number | undefined;
  actualTarget: number;
  amountTarget: number;
};
export type StrategyData = {
  valueTotal: number;
  actualTargetTotal: number;
  userTargetTotal: number;
  weights: StrategyWeight[];
};

export function useStrategy() {
  const [assets] = useAssets();
  const [portfolio] = usePortfolio();

  const valueTotal = useMemo(() => {
    return assets.reduce((total, asset) => {
      const balance = portfolio.find((b) => b.assetId === asset.assetId);
      if (balance) {
        return total + balance.available * asset.lastPrice;
      }
      return total;
    }, 0);
  }, [assets, portfolio]);

  const userTargetTotal = useMemo(() => {
    return portfolio.reduce((total, balance) => {
      if (balance.target === undefined) {
        return total;
      }
      return total + balance.target;
    }, 0);
  }, [portfolio]);

  const currentRemainder = useMemo(
    () =>
      assets.reduce((total, asset) => {
        const balance = portfolio.find((b) => b.assetId === asset.assetId);
        if (balance && balance.target === undefined) {
          return total + balance.available * asset.lastPrice;
        }
        return total;
      }, 0) / valueTotal,
    [assets, portfolio, valueTotal]
  );

  const weights = useMemo<StrategyWeight[]>(() => {
    const userTargetRemainder = (100 - userTargetTotal) / 100;

    const remainderRatio =
      userTargetRemainder !== 0 ? currentRemainder / userTargetRemainder : 0;

    return portfolio.map((balance) => {
      const asset = assets.find((a) => a.assetId === balance.assetId);
      if (asset) {
        const current = (balance.available * asset.lastPrice) / valueTotal;

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

        const actualTarget = getActualTarget();

        const amountTarget = (actualTarget * valueTotal) / asset.lastPrice;

        return {
          assetId: asset.assetId,
          current,
          userTarget: balance.target,
          actualTarget,
          amountTarget,
        };
      }
      return {
        assetId: balance.assetId,
        current: 0,
        userTarget: balance.target,
        actualTarget: 0,
        amountTarget: 0,
      };
    });
  }, [assets, currentRemainder, portfolio, userTargetTotal, valueTotal]);

  const actualTargetTotal = useMemo(() => {
    if (userTargetTotal > 100 || currentRemainder === 0) {
      return userTargetTotal;
    }
    return 100;
  }, [currentRemainder, userTargetTotal]);

  return useMemo(
    () => ({
      valueTotal,
      userTargetTotal,
      actualTargetTotal,
      weights,
    }),
    [actualTargetTotal, userTargetTotal, valueTotal, weights]
  );
}
