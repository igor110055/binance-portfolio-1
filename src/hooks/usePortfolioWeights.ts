import { useMemo } from "react";
import { usePortfolio } from "../contexts/Portfolio/usePortfolio";
import { usePrices } from "../contexts/Prices/usePrices";

export function usePortfolioWeights() {
  const [portfolio] = usePortfolio();
  const [prices] = usePrices();
  return useMemo(() => {
    const [amounts, total] = portfolio.reduce<
      [[assetId: string, amount: number | undefined][], number]
    >(
      ([a, t], balance) => {
        if (prices[balance.assetId]) {
          const amount =
            (balance.available + balance.unavailable) * prices[balance.assetId];
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
        if (amount !== undefined) {
          weights[assetId] = (amount / total) * 100;
        }
        return weights;
      },
      {}
    );
  }, [prices, portfolio]);
}
