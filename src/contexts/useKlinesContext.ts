import { createContext, useContext } from "react";

export type KlinesData = {
  asset: string;
  klines: Kline[];
};

export const KlinesContext = createContext<KlinesData[]>([]);

export function useKlinesContext() {
  return useContext(KlinesContext);
}
