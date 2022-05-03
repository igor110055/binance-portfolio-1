import { createContext, useContext } from "react";

export type MarketsData = {
  currency: string;
  ohlc: OHLCData[];
};

export type MarketsContextData = {
  asset: string;
  markets: MarketsData[];
};

export const MarketsContext = createContext<MarketsContextData[]>([]);

export function useMarketsContext() {
  return useContext(MarketsContext);
}

export function useMarkets(asset: string) {
  const Markets = useMarketsContext();
  return Markets.find((data) => data.asset === asset)?.markets;
}
