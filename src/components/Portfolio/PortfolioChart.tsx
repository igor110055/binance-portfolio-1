import { useMemo } from "react";
import { Cell, Pie, PieChart, PieLabelRenderProps } from "recharts";
import { CategoricalChartProps } from "recharts/types/chart/generateCategoricalChart";
import { useStrategy } from "../../hooks/useStrategy";
import { AssetId, getAssetColor, getAssetIcon } from "../../lib/assets";

const ASSET_ICON_SIZE = 24;

type PortfolioChartData = {
  assetId: AssetId;
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
  const color = getAssetColor(entry.assetId) || "grey";
  return (
    <Cell key={entry.assetId + index} fill={color} opacity={entry.opacity} />
  );
}

export function PortfolioChart(props: CategoricalChartProps) {
  const strategy = useStrategy();

  const [currentData, targetData] = useMemo(() => {
    return strategy.weights.reduce<
      [PortfolioChartData[], PortfolioChartData[]]
    >(
      ([current, target], weight) => {
        current.push({
          assetId: weight.assetId,
          value: weight.current,
          opacity: 1,
        });
        target.push({
          assetId: weight.assetId,
          value: weight.actualTarget || 0,
          opacity: 1,
        });
        return [current, target];
      },
      [[], []]
    );
  }, [strategy.weights]);

  return (
    <PieChart {...props}>
      <Pie
        data={currentData}
        dataKey="value"
        isAnimationActive={false}
        label={false}
        innerRadius="25%"
        outerRadius="38.2%"
      >
        {currentData.map(PortfolioChartCell)}
      </Pie>
      <Pie
        data={targetData}
        dataKey="value"
        isAnimationActive={false}
        label={PortfolioChartLabel}
        labelLine={false}
        innerRadius="50%"
        outerRadius="61.8%"
      >
        {targetData.map(PortfolioChartCell)}
      </Pie>
    </PieChart>
  );
}
