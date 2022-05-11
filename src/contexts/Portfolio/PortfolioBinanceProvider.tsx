import React, { ReactNode, useEffect, useState } from "react";
import { Loader } from "../../common/Loader";
import { useLocalState } from "../../hooks/useLocalState";
import {
  BinanceAccountParams,
  loadBinanceAccount,
} from "../../lib/binance/account";
import { PortfolioData, toPortfolio } from "../../lib/portfolio";
import { PortfolioContext } from "./usePortfolio";

let isFetching = false;

export function PortfolioBinanceProvider({
  children,
  ...params
}: BinanceAccountParams & {
  children: ReactNode;
}) {
  const [data, setData] = useLocalState<PortfolioData[]>("portfolio");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log(data);
    if (!isFetching && !data) {
      setLoading(true);
      isFetching = true;
      loadBinanceAccount(params)
        .then(toPortfolio)
        .then(setData)
        .catch(console.error)
        .finally(() => {
          isFetching = false;
          setLoading(false);
        });
    }
  }, [data, params, setData]);

  if (loading) {
    return <Loader />;
  }

  if (!data) {
    console.error("Portfolio data not available.");
    return null;
  }

  return (
    <PortfolioContext.Provider value={[data, setData]}>
      {children}
    </PortfolioContext.Provider>
  );
}
