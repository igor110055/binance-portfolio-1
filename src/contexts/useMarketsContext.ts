import { createContext, useContext } from "react";
import { BollingerBandsOutput } from "technicalindicators/declarations/volatility/BollingerBands";

export type MarketData = {
  asset: string;
  currency: string;
  ohlc: OHLCData[];
  bollingerBands: BollingerBandsOutput[];
};

export const MarketsContext = createContext<MarketData[]>([]);

export function useMarketsContext() {
  return useContext(MarketsContext);
}

export function useMarkets(asset: string) {
  const Markets = useMarketsContext();
  return Markets.filter((data) => data.asset === asset);
}
