import { createContext, useContext } from "react";
import { AssetData } from "../lib/assets";

export const AssetsContext = createContext<AssetData[]>([]);

export function useAssets() {
  return useContext(AssetsContext);
}
