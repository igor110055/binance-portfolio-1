import { createContext, useContext } from "react";
import { AssetId } from "../../lib/assets";

export const STRATEGY_MINIMUM_TRADE = 0;

export type StrategyWeight = {
  assetId: AssetId;
  current: number;
  currentValue: number;
  target: number;
  targetAmount: number;
  targetValue: number;
  tradeAmount: number;
  tradeValue: number;
};
export type StrategyData = {
  totalAmount: number;
  totalTarget: number;
  weights: StrategyWeight[];
  baseAssetIds: AssetId[];
  quoteAssetIds: AssetId[];
};

export const StrategyContext = createContext<StrategyData>({
  totalAmount: 0,
  totalTarget: 0,
  weights: [],
  baseAssetIds: [],
  quoteAssetIds: [],
});

export function useStrategy() {
  return useContext(StrategyContext);
}

export function useStrategyWeight(assetId: AssetId) {
  const strategy = useStrategy();
  return strategy.weights.find((weight) => weight.assetId === assetId);
}
