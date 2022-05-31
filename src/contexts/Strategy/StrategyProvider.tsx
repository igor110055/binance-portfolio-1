import React, { ReactNode, useMemo } from "react";
import { AssetId } from "../../lib/assets";
import { useAssets } from "../Assets/useAssets";
import { usePortfolio } from "../Portfolio/usePortfolio";
import {
  StrategyContext,
  StrategyData,
  StrategyWeight,
  STRATEGY_MINIMUM_TRADE,
} from "./useStrategy";

export function StrategyProvider({ children }: { children: ReactNode }) {
  const [assets] = useAssets();
  const [portfolio] = usePortfolio();

  const totalAmount = useMemo(() => {
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
      }, 0) / totalAmount,
    [assets, portfolio, totalAmount]
  );

  const weights = useMemo<StrategyWeight[]>(() => {
    const userTargetRemainder = (100 - userTargetTotal) / 100;

    const remainderRatio =
      userTargetRemainder !== 0 ? currentRemainder / userTargetRemainder : 0;

    return portfolio.map((balance) => {
      const asset = assets.find((a) => a.assetId === balance.assetId);
      if (asset) {
        const currentValue = balance.available * asset.lastPrice;
        const current = currentValue / totalAmount;

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

        const target = getActualTarget();

        const targetValue = target * totalAmount;
        const targetAmount = targetValue / asset.lastPrice;

        const tradeValue = targetValue - currentValue;
        const tradeAmount = tradeValue / asset.lastPrice;

        return {
          assetId: balance.assetId,
          current,
          currentValue,
          target,
          targetAmount,
          targetValue,
          tradeAmount,
          tradeValue,
        };
      }
      return {
        assetId: balance.assetId,
        current: 0,
        currentValue: 0,
        target: 0,
        targetAmount: 0,
        targetValue: 0,
        tradeAmount: 0,
        tradeValue: 0,
      };
    });
  }, [assets, currentRemainder, portfolio, userTargetTotal, totalAmount]);

  const totalTarget = useMemo(() => {
    if (userTargetTotal > 100 || currentRemainder === 0) {
      return userTargetTotal;
    }
    return 100;
  }, [currentRemainder, userTargetTotal]);

  const [baseAssetIds, quoteAssetIds] = useMemo(
    () =>
      weights.reduce<[AssetId[], AssetId[]]>(
        ([bases, quotes], weight) => {
          if (weight.target - weight.current >= STRATEGY_MINIMUM_TRADE) {
            bases.push(weight.assetId);
          }
          if (weight.current - weight.target >= STRATEGY_MINIMUM_TRADE) {
            quotes.push(weight.assetId);
          }
          return [bases, quotes];
        },
        [[], []]
      ),
    [weights]
  );

  const strategy = useMemo<StrategyData>(
    () => ({
      totalAmount,
      totalTarget,
      weights,
      baseAssetIds,
      quoteAssetIds,
    }),
    [totalAmount, totalTarget, weights, baseAssetIds, quoteAssetIds]
  );

  return (
    <StrategyContext.Provider value={strategy}>
      {children}
    </StrategyContext.Provider>
  );
}
