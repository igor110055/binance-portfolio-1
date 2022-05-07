import { useMemo } from "react";
import { Cell, Pie, PieChart, PieLabelRenderProps } from "recharts";
import { AssetData, ASSET_ICON_SIZE } from "../../lib/assets";

type ChartAssetsPieData = {
  asset: string;
  amount: number;
  icon: string;
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

export function ChartAssetsPie({ assets }: { assets: AssetData[] }) {
  const data = useMemo(() => {
    return assets.reduce<ChartAssetsPieData[]>(
      (entries, { asset, available, unavailable, icon, lastPrice }) => {
        if (available > 0) {
          entries.push({
            asset,
            amount: available * lastPrice,
            icon,
            opacity: 1,
          });
        }
        if (unavailable > 0) {
          entries.push({
            asset,
            amount: unavailable * lastPrice,
            icon,
            opacity: 0.5,
          });
        }
        return entries;
      },
      []
    );
  }, [assets]);

  return (
    <PieChart width={400} height={240}>
      <Pie
        data={data}
        dataKey="amount"
        isAnimationActive={false}
        label={ChartAssetsPieLabel}
        outerRadius={80}
      >
        {data.map((entry, index) => {
          return <Cell key={index} fill="grey" opacity={entry.opacity} />;
        })}
      </Pie>
    </PieChart>
  );
}
