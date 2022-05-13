import React, { ReactNode } from "react";
import { useLocalState } from "../../hooks/useLocalState";
import { PortfolioData } from "../../lib/portfolio";
import { PortfolioContext } from "./usePortfolio";

export const DEFAULT_PORTFOLIO: PortfolioData[] = [
  { assetId: "BTC", available: 0.01, target: 40 },
  { assetId: "ETH", available: 0.1, target: 30 },
  { assetId: "BUSD", available: 100, target: undefined },
  { assetId: "XMR", available: 0, target: 10 },
];

localStorage.clear();

export function PortfolioLocalProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useLocalState<PortfolioData[]>(
    "portfolio",
    DEFAULT_PORTFOLIO
  );
  return (
    <PortfolioContext.Provider value={[data, setData]}>
      {children}
    </PortfolioContext.Provider>
  );
}
