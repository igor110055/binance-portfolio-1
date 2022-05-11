import React, { ReactNode, useEffect, useState } from "react";
import {
  BinancePricesParams,
  loadBinancePrices,
} from "../../lib/binance/prices";
import { PriceData, toPrices } from "../../lib/prices";
import { PricesContext } from "./usePrices";

let isFetching = false;

export function PricesProvider({
  children,
  ...params
}: BinancePricesParams & {
  children: ReactNode;
}) {
  const [data, setData] = useState<PriceData>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!isFetching && data === undefined) {
      setLoading(true);
      isFetching = true;
      loadBinancePrices(params)
        .then(toPrices)
        .then(setData)
        .catch(console.error)
        .finally(() => {
          isFetching = false;
          setLoading(false);
        });
    }
  }, [data, params, setData]);

  return (
    <PricesContext.Provider value={[data || {}, loading]}>
      {children}
    </PricesContext.Provider>
  );
}
