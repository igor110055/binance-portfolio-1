import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { PortfolioData } from "../../lib/portfolio";

export const PortfolioContext = createContext<
  [data: PortfolioData[], setData: Dispatch<SetStateAction<PortfolioData[]>>]
>([[], console.warn]);

export function usePortfolio() {
  return useContext(PortfolioContext);
}
