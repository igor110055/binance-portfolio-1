import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { AssetsContext } from "./useAssets";
import { AssetData, loadAsset } from "../../lib/assets";
import { usePortfolio } from "../Portfolio/usePortfolio";

let fetchQueue: string[] = [];

export function AssetsProvider({ children }: { children: ReactNode }) {
  const [portfolio] = usePortfolio();

  const [data, setData] = useState<AssetData[]>([]);

  const loading = useMemo(
    () => portfolio.length > data.length,
    [data.length, portfolio.length]
  );

  useEffect(() => {
    for (const balance of portfolio) {
      if (
        fetchQueue.includes(balance.assetId) ||
        data.find((asset) => asset.assetId === balance.assetId)
      ) {
        continue;
      }
      fetchQueue.push(balance.assetId);
      loadAsset(balance.assetId).then((asset: AssetData) => {
        setData((prevData) => [...prevData, asset]);
        // fetchQueue = fetchQueue.filter((assetId) => assetId !== asset.assetId);
      }, console.error);
    }
  }, [data, portfolio]);

  return (
    <AssetsContext.Provider value={[data, loading]}>
      {children}
    </AssetsContext.Provider>
  );
}
