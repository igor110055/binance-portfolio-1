import { useMemo } from "react";
import { Cell, Pie, PieChart, PieLabelRenderProps } from "recharts";
import { CategoricalChartProps } from "recharts/types/chart/generateCategoricalChart";
import { useAssets } from "../../contexts/useAssets";
import { usePortfolio } from "../../contexts/Portfolio/usePortfolio";
import { getAssetColor, getAssetIcon } from "../../lib/assets";

const ASSET_ICON_SIZE = 24;

type PortfolioChartData = {
  assetId: string;
  value: number;
  opacity: number;
};

function PortfolioChartLabel({
  assetId,
  opacity,
  x,
  y,
}: PortfolioChartData & PieLabelRenderProps) {
  const icon = getAssetIcon(assetId);
  return (
    <image
      href={icon}
      x={x - ASSET_ICON_SIZE / 2}
      y={y - ASSET_ICON_SIZE / 2}
      height={ASSET_ICON_SIZE}
      width={ASSET_ICON_SIZE}
      opacity={opacity}
    />
  );
}

function PortfolioChartCell(entry: PortfolioChartData, index: number) {
  const color = getAssetColor(entry.assetId);
  return (
    <Cell key={entry.assetId + index} fill={color} opacity={entry.opacity} />
  );
}

export function PortfolioChart(props: CategoricalChartProps) {
  const [assets] = useAssets();
  const [portfolio] = usePortfolio();

  const [dataTotals, dataDetails] = useMemo(() => {
    return portfolio.reduce<[PortfolioChartData[], PortfolioChartData[]]>(
      ([totals, details], { assetId, available, unavailable }) => {
        const asset = assets.find((a) => a.assetId === assetId);
        if (asset) {
          totals.push({
            assetId,
            value: (available + unavailable) * asset.lastPrice,
            opacity: 1,
          });
          if (available > 0) {
            details.push({
              assetId,
              value: available * asset.lastPrice,
              opacity: 0.5,
            });
          }
          if (unavailable > 0) {
            details.push({
              assetId,
              value: unavailable * asset.lastPrice,
              opacity: 1,
            });
          }
        }
        return [totals, details];
      },
      [[], []]
    );
  }, [assets, portfolio]);

  return (
    <PieChart {...props}>
      <Pie
        data={dataDetails}
        dataKey="value"
        isAnimationActive={false}
        label={false}
        innerRadius="25%"
        outerRadius="38.2%"
      >
        {dataDetails.map(PortfolioChartCell)}
      </Pie>
      <Pie
        data={dataTotals}
        dataKey="value"
        isAnimationActive={false}
        label={PortfolioChartLabel}
        labelLine={false}
        innerRadius="38.2%"
        outerRadius="61.8%"
      >
        {dataTotals.map(PortfolioChartCell)}
      </Pie>
    </PieChart>
  );
}
