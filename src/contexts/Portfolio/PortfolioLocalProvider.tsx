import React, { ReactNode } from "react";
import { useLocalState } from "../../hooks/useLocalState";
import { PortfolioData } from "../../lib/portfolio";
import { PortfolioContext } from "./usePortfolio";

export const DEFAULT_PORTFOLIO: PortfolioData[] = [
  { assetId: "BTC", available: 0.01, unavailable: 0.02 },
  { assetId: "ETH", available: 0.1, unavailable: 0.2 },
  { assetId: "XMR", available: 1, unavailable: 0.5 },
  { assetId: "LUNA", available: 10, unavailable: 0 },
  { assetId: "BUSD", available: 1000, unavailable: 0 },
];

export function PortfolioLocalProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useLocalState<PortfolioData[]>(
    "portfolio",
    DEFAULT_PORTFOLIO
  );
  console.log("PortfolioLocal", data);
  return (
    <PortfolioContext.Provider value={[data, setData]}>
      {children}
    </PortfolioContext.Provider>
  );
}
