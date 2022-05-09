import React, { ReactNode } from "react";
import { PortfolioData } from "../../lib/portfolio";
import { PortfolioContext } from "../usePortfolio";

const DEFAULT_PORTFOLIO: PortfolioData[] = [
  { asset: "BTC", available: 0.01, unavailable: 0.02 },
  { asset: "ETH", available: 0.1, unavailable: 0.2 },
  { asset: "XMR", available: 1, unavailable: 0.5 },
  { asset: "LUNA", available: 10, unavailable: 0 },
  { asset: "BUSD", available: 1000, unavailable: 0 },
];

export function PortfolioDefaultProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <PortfolioContext.Provider value={DEFAULT_PORTFOLIO}>
      {children}
    </PortfolioContext.Provider>
  );
}
