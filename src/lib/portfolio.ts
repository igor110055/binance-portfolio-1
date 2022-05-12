import { AssetId } from "./assets";
import { BinanceAccount } from "./binance/account";

export type PortfolioData = {
  assetId: AssetId;
  available: number;
  unavailable: number;
  target: number | undefined;
};

export function toPortfolio(account: BinanceAccount): PortfolioData[] {
  return account.balances.reduce<PortfolioData[]>(
    (reducedBalances, balance) => {
      if (Number(balance.free) > 0 || Number(balance.locked) > 0) {
        const assetId = balance.asset.replace(/^LD/i, "").toUpperCase();
        const prevBalanceIndex = reducedBalances.findIndex(
          (b) => b.assetId === assetId
        );
        if (prevBalanceIndex < 0) {
          reducedBalances.push({
            assetId: assetId as AssetId,
            available: Number(balance.free),
            unavailable: Number(balance.locked),
            target: undefined,
          });
        } else {
          reducedBalances[prevBalanceIndex].available += Number(balance.free);
          reducedBalances[prevBalanceIndex].unavailable += Number(
            balance.locked
          );
        }
      }
      return reducedBalances;
    },
    []
  );
}
