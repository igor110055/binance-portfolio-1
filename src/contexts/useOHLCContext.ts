import { createContext, useContext } from "react";
import { BOLLINGER_BANDS_PERIOD } from "../hooks/useBollingerBands";

export const OHLC_INTERVAL = "1d";
export const OHLC_LIMIT = 30 + BOLLINGER_BANDS_PERIOD;

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
  const OHLC = useOHLCContext();
  return OHLC.find((data) => data.asset === asset)?.ohlc as OHLCData[];
}

export function useCrossOHLC(asset: string, currency: string) {
  const OHLC = useOHLCContext();
  const dataBuy = OHLC.find((data) => data.asset === asset)?.ohlc as OHLCData[];
  const dataSell = OHLC.find((data) => data.asset === currency)
    ?.ohlc as OHLCData[];
  return dataBuy.map((data, index) => {
    const open = data.open / dataSell[index].open;
    const high = data.high / dataSell[index].high;
    const low = data.low / dataSell[index].low;
    const close = data.close / dataSell[index].close;
    return {
      ...data,
      open,
      high: Math.max(open, close, high),
      low: Math.min(open, close, low),
      close: data.close / dataSell[index].close,
    };
  });
}
