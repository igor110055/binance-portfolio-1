import { useMemo } from "react";
import { MarketData, toMarketData } from "../lib/markets";
import { useAssets } from "../contexts/Assets/useAssets";
import { AssetId } from "../lib/assets";

export function useMarkets(
  baseAssetIds?: AssetId[],
  quoteAssetIds: AssetId[] = [process.env.REACT_APP_CURRENCY as AssetId]
) {
  const [assets] = useAssets();
  return useMemo<MarketData[]>(() => {
    const baseAssets = assets.filter(
      (asset) =>
        (baseAssetIds === undefined &&
          !quoteAssetIds.includes(asset.assetId)) ||
        baseAssetIds?.includes(asset.assetId)
    );
    const quoteAssets = assets.filter((asset) =>
      quoteAssetIds.includes(asset.assetId)
    );
    return baseAssets
      .map((baseAsset) => {
        return quoteAssets.map((quoteAsset) => {
          return toMarketData(baseAsset, quoteAsset);
        });
      })
      .flat();
  }, [assets, baseAssetIds, quoteAssetIds]);
}

export function useMarket(
  baseAssetId?: AssetId,
  quoteAssetId: AssetId = process.env.REACT_APP_CURRENCY as AssetId
) {
  const markets = useMarkets(baseAssetId ? [baseAssetId] : [], [quoteAssetId]);
  return markets[0] as MarketData | undefined;
}
