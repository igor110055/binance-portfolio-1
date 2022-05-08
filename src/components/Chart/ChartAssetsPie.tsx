import { useMemo } from "react";
import { Cell, Pie, PieChart, PieLabelRenderProps } from "recharts";
import { AssetData } from "../../lib/assets";

const ASSET_ICON_SIZE = 24;

type ChartAssetsPieData = {
  asset: string;
  amount: number;
  icon: string;
  color: string | undefined;
  opacity: number;
};

function ChartAssetsPieLabel({
  icon,
  opacity,
  x,
  y,
}: ChartAssetsPieData & PieLabelRenderProps) {
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

export function ChartAssetsPie({ assets, ...props }: { assets: AssetData[] }) {
  const data = useMemo<ChartAssetsPieData[]>(() => {
    return assets.reduce(
      (
        entries: ChartAssetsPieData[],
        { asset, available, unavailable, icon, color, lastPrice }: AssetData
      ) => {
        if (available > 0) {
          entries.push({
            asset,
            amount: available * lastPrice,
            icon,
            color,
            opacity: 1,
          });
        }
        if (unavailable > 0) {
          entries.push({
            asset,
            amount: unavailable * lastPrice,
            icon,
            color,
            opacity: 0.5,
          });
        }
        return entries;
      },
      []
    );
  }, [assets]);

  return (
    <PieChart {...props}>
      <Pie
        data={data}
        dataKey="amount"
        isAnimationActive={false}
        label={ChartAssetsPieLabel}
        labelLine={false}
        innerRadius={61.8}
      >
        {data.map((entry, index) => {
          return (
            <Cell
              key={index}
              fill={entry.color || "grey"}
              opacity={entry.opacity}
            />
          );
        })}
      </Pie>
    </PieChart>
  );
}
