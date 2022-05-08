import React, { ReactNode, useEffect, useState } from "react";
import { AssetsContext } from "./useAssets";
import { AssetData, loadAsset } from "../lib/assets";
import { Spinner } from "react-bootstrap";
import { usePortfolio } from "./usePortfolio";

let isFetching = false;

export function AssetsProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AssetData[]>();
  const [loading, setLoading] = useState<boolean>(true);

  const portfolio = usePortfolio();

  useEffect(() => {
    if (!isFetching && !data) {
      isFetching = true;
      Promise.all(portfolio.map(loadAsset))
        .then(setData)
        .catch(console.error)
        .finally(() => {
          isFetching = false;
          setLoading(false);
        });
    }
  }, [data, portfolio]);

  if (loading) {
    return <Spinner animation="grow" />;
  }

  if (!data) {
    console.error("Assets data not available.");
    return null;
  }

  return (
    <AssetsContext.Provider value={data}>{children}</AssetsContext.Provider>
  );
}
