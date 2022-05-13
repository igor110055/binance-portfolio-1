import { AssetId } from "./assets";
import { BinanceAccount } from "./binance/account";

export type PortfolioData = {
  assetId: AssetId;
  available: number;
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
        const available = Number(balance.free) + Number(balance.locked);
        if (prevBalanceIndex < 0) {
          reducedBalances.push({
            assetId: assetId as AssetId,
            available,
            target: undefined,
          });
        } else {
          reducedBalances[prevBalanceIndex].available += available;
        }
      }
      return reducedBalances;
    },
    []
  );
}
