import { BinanceAccount } from "./binance/account";

export type PortfolioData = {
  asset: string;
  available: number;
  unavailable: number;
};

export function toPortfolio(account: BinanceAccount): PortfolioData[] {
  return account.balances.reduce<PortfolioData[]>(
    (reducedBalances, balance) => {
      if (Number(balance.free) > 0 || Number(balance.locked) > 0) {
        const asset = balance.asset.replace(/^LD/i, "");
        const prevBalanceIndex = reducedBalances.findIndex(
          (b) => b.asset === asset
        );
        if (prevBalanceIndex < 0) {
          reducedBalances.push({
            asset,
            available: Number(balance.free),
            unavailable: Number(balance.locked),
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
