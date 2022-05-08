import React, { ReactNode, useEffect, useState } from "react";
import { AssetsContext } from "./useAssets";
import { AssetData, loadAsset } from "../lib/assets";
import { Spinner } from "react-bootstrap";
import { usePortfolio } from "./usePortfolio";

let isFetching = false;

export function AssetsProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AssetData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const portfolio = usePortfolio();

  useEffect(() => {
    if (!isFetching && data.length === 0) {
      isFetching = true;
      Promise.all(
        portfolio.map((balance) => {
          return loadAsset(balance).then((asset) => {
            setData((prevData) => [...prevData, asset]);
          });
        })
      )
        .catch(console.error)
        .finally(() => {
          isFetching = false;
          setLoading(false);
        });
    }
  }, [data, portfolio]);

  return (
    <AssetsContext.Provider value={data}>
      {loading ? <Spinner animation="grow" /> : null}
      {children}
    </AssetsContext.Provider>
  );
}
