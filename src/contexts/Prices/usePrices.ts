import { createContext, useContext } from "react";
import { PriceData } from "../../lib/prices";

export const PricesContext = createContext<[data: PriceData, loading: boolean]>(
  [{}, true]
);

export function usePrices() {
  return useContext(PricesContext);
}
