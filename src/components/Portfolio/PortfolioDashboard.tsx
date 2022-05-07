import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { MarketGrid } from "../Market/MarketGrid";
import { MarketsProvider } from "../../contexts/MarketsProvider";
import { ChartAssetsPie } from "../Chart/ChartAssetsPie";
import { useAssets } from "../../contexts/useAssets";

export function PortfolioDashboard() {
  const assets = useAssets();
  return (
    <>
      <ChartAssetsPie assets={assets} />
      <MarketsProvider>
        <MarketGrid />
      </MarketsProvider>
    </>
  );
}
