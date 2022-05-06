import { createContext, useContext } from "react";

export type Ticker24hrData = {
  asset: string;
  ticker24hr: Ticker24hr;
};

export const Ticker24hrContext = createContext<Ticker24hrData[]>([]);

export function useTicker24hrContext() {
  return useContext(Ticker24hrContext);
}
