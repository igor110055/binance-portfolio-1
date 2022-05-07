import { createContext, useContext } from "react";
import { PortfolioData } from "../lib/portfolio";

export const PortfolioContext = createContext<PortfolioData[]>([]);

export function usePortfolio() {
  return useContext(PortfolioContext);
}
