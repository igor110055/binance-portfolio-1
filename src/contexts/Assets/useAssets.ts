import { createContext, useContext } from "react";
import { AssetData } from "../../lib/assets";

export const AssetsContext = createContext<
  [data: AssetData[], loading: boolean]
>([[], true]);

export function useAssets() {
  return useContext(AssetsContext);
}
