import { createContext, useContext } from "react";
import { AssetData, AssetId } from "../../lib/assets";

export const AssetsContext = createContext<
  [data: AssetData[], loading: boolean]
>([[], true]);

export function useAssets() {
  return useContext(AssetsContext);
}

export function useAsset(
  assetId?: AssetId
): [data: AssetData | undefined, loading: boolean] {
  const [data, loading] = useContext(AssetsContext);
  return [data.find((asset) => asset.assetId === assetId), loading];
}
