import { useMemo } from "react";
import { useQueries } from "react-query";
import { AssetData, AssetId, loadAsset } from "../lib/assets";
import { usePortfolio } from "../contexts/Portfolio/usePortfolio";

export function useAssetQueries() {
  const [portfolio] = usePortfolio();
  const assetIds = useMemo(
    () => [
      process.env.REACT_APP_CURRENCY as AssetId,
      ...portfolio.map((balance) => balance.assetId),
    ],
    [portfolio]
  );
  return useQueries(
    assetIds.map((assetId) => {
      return {
        queryKey: ["asset", assetId],
        queryFn: () => loadAsset(assetId),
      };
    })
  );
}

export function useAssets() {
  const assetQueries = useAssetQueries();
  return useMemo(
    () =>
      assetQueries.reduce<{ data: AssetData[]; isLoading: boolean }>(
        ({ data, isLoading }, assetQuery) => {
          if (assetQuery.data) {
            data.push(assetQuery.data);
          }
          return { data, isLoading: isLoading || assetQuery.isLoading };
        },
        { data: [], isLoading: false }
      ),
    [assetQueries]
  );
}

export function useAsset(assetId?: AssetId) {
  const { data, isLoading } = useAssets();
  return useMemo(
    () => ({
      data: data.find((asset) => asset.assetId === assetId),
      isLoading,
    }),
    [assetId, data, isLoading]
  );
}
