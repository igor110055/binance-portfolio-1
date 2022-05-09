import { createContext, useContext } from "react";
import { PortfolioData } from "../../lib/portfolio";

export const PortfolioContext = createContext<
  [data: PortfolioData[], setData: (portfolio: PortfolioData[]) => void]
>([[], console.warn]);

export function usePortfolio() {
  return useContext(PortfolioContext);
}
