import { createContext, useContext } from "react";
import { MACDOutput } from "technicalindicators/declarations/moving_averages/MACD";
import { BollingerBandsOutput } from "technicalindicators/declarations/volatility/BollingerBands";

export type MarketData = {
  asset: string;
  currency: string;
  ohlc: OHLCData[];
  bollingerBands: BollingerBandsOutput[];
  macd: MACDOutput[];
  rsi: number[];
};

export const MarketsContext = createContext<MarketData[]>([]);

export function useMarketsContext() {
  return useContext(MarketsContext);
}

export function useMarkets(asset: string) {
  const Markets = useMarketsContext();
  return Markets.filter((data) => data.asset === asset);
}
