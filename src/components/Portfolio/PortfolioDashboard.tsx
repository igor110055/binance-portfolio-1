import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { MarketGrid } from "../Market/MarketGrid";
import { MarketsProvider } from "../../contexts/MarketsProvider";
import { ChartAssetsPie } from "../Chart/ChartAssetsPie";
import { useAssets } from "../../contexts/useAssets";
import { ResponsiveContainer } from "recharts";

export function PortfolioDashboard() {
  const assets = useAssets();
  return (
    <>
      <ResponsiveContainer height={320}>
        <ChartAssetsPie assets={assets} />
      </ResponsiveContainer>
      <MarketsProvider>
        <MarketGrid />
      </MarketsProvider>
    </>
  );
}
