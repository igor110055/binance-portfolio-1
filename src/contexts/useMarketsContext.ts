import { createContext, useContext } from "react";
import { MarketData } from "../lib/markets";

export const MarketsContext = createContext<MarketData[]>([]);

export function useMarketsContext() {
  return useContext(MarketsContext);
}
