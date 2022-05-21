import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { AssetsContext } from "./useAssets";
import { AssetData, AssetId, loadAsset } from "../../lib/assets";
import { usePortfolio } from "../Portfolio/usePortfolio";

const fetchQueue: string[] = [];

export function AssetsProvider({ children }: { children: ReactNode }) {
  const [portfolio] = usePortfolio();

  const [data, setData] = useState<AssetData[]>([]);

  const loading = useMemo(
    () => portfolio.length > data.length,
    [data.length, portfolio.length]
  );

  const assetIds = useMemo(
    () => [
      process.env.REACT_APP_CURRENCY as AssetId,
      ...portfolio.map((balance) => balance.assetId),
    ],
    [portfolio]
  );

  useEffect(() => {
    for (const assetId of assetIds) {
      if (
        fetchQueue.includes(assetId) ||
        data.find((asset) => asset.assetId === assetId)
      ) {
        continue;
      }
      fetchQueue.push(assetId);
      loadAsset(assetId).then((asset: AssetData) => {
        setData((prevData) => [...prevData, asset]);
      }, console.error);
    }
  }, [assetIds, data]);

  return (
    <AssetsContext.Provider value={[data, loading]}>
      {children}
    </AssetsContext.Provider>
  );
}
