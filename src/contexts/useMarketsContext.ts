import { createContext, useContext } from "react";
import { BollingerBandsOutput } from "technicalindicators/declarations/volatility/BollingerBands";

export type MarketData = {
  asset: string;
  currency: string;
  ohlc: OHLCData[];
  bollingerBands: BollingerBandsOutput[];
};

export type MarketsContextData = {
  asset: string;
  markets: MarketData[];
};

export const MarketsContext = createContext<MarketsContextData[]>([]);

export function useMarketsContext() {
  return useContext(MarketsContext);
}

export function useMarkets(asset: string) {
  const Markets = useMarketsContext();
  return Markets.find((data) => data.asset === asset)?.markets;
}
