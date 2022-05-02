import { createContext } from "react";

export interface BinanceContextData {
  account: Account;
  tickerPrices: TickerPrice[];
}

export const BinanceContext = createContext({} as BinanceContextData);
