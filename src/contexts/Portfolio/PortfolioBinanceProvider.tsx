import React, { ReactNode, useEffect, useState } from "react";
import { Loader } from "../../common/Loader";
import { loadBinanceAccount } from "../../lib/binance/account";
import { PortfolioData, toPortfolio } from "../../lib/portfolio";
import { PortfolioContext } from "../usePortfolio";

let isFetching = false;

export function PortfolioBinanceProvider({
  children,
  ...params
}: {
  children: ReactNode;
  recvWindow?: number;
}) {
  const [data, setData] = useState<PortfolioData[]>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!isFetching && !data) {
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
  }, [data, params]);

  if (loading) {
    return <Loader />;
  }

  if (!data) {
    console.error("Portfolio data not available.");
    return null;
  }

  return (
    <PortfolioContext.Provider value={data}>
      {children}
    </PortfolioContext.Provider>
  );
}
