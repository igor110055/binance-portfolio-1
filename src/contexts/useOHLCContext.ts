import { createContext, useContext } from "react";

export const OHLC_INTERVAL = "1d";
export const OHLC_LIMIT = 90;

export type OHLCData = {
  openTime: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  closeTime: number;
  quoteAssetVolume: number;
  numberOfTrades: number;
  takerBuyBaseAssetVolume: number;
  takerBuyQuoteAssetVolume: number;
  ignore: number;
};

export type OHLCContextData = {
  asset: string;
  ohlc: OHLCData[];
}[];

export const OHLCContext = createContext([] as OHLCContextData);

export function useOHLCContext() {
  return useContext(OHLCContext);
}

export function useOHLC(asset: string) {
  return useOHLCContext().find((ohlc) => ohlc.asset === asset)
    ?.ohlc as OHLCData[];
}
