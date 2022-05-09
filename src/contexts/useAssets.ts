import { createContext, useContext } from "react";
import { AssetData } from "../lib/assets";

export const AssetsContext = createContext<{
  data: AssetData[];
  loading: boolean;
}>({ data: [], loading: true });

export function useAssets() {
  return useContext(AssetsContext);
}
