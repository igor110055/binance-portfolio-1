import React, { ReactNode, useEffect, useState } from "react";
import { AssetsContext } from "./useAssets";
import { AssetData, loadAsset } from "../lib/assets";
import { usePortfolio } from "./Portfolio/usePortfolio";

let isFetching = false;

export function AssetsProvider({ children }: { children: ReactNode }) {
  const [portfolio] = usePortfolio();

  const [data, setData] = useState<AssetData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!isFetching && data.length === 0) {
      isFetching = true;
      Promise.all(
        portfolio.map((balance) => {
          return loadAsset(balance.assetId).then((asset) => {
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
    <AssetsContext.Provider value={[data, loading]}>
      {children}
    </AssetsContext.Provider>
  );
}
