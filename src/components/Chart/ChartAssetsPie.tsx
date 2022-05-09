import { useMemo } from "react";
import { Cell, Pie, PieChart, PieLabelRenderProps } from "recharts";
import { AssetData } from "../../lib/assets";

const ASSET_ICON_SIZE = 24;

type ChartAssetsPieData = {
  asset: string;
  value: number;
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

function ChartAssetsPieCell(entry: ChartAssetsPieData, index: number) {
  return (
    <Cell
      key={entry.asset + index}
      fill={entry.color || "grey"}
      opacity={entry.opacity}
    />
  );
}

export function ChartAssetsPie({ assets, ...props }: { assets: AssetData[] }) {
  const [dataTotals, dataDetails] = useMemo(() => {
    return assets.reduce<[ChartAssetsPieData[], ChartAssetsPieData[]]>(
      (
        [totals, details],
        { asset, available, unavailable, icon, color, lastPrice }: AssetData
      ) => {
        totals.push({
          asset,
          value: (available + unavailable) * lastPrice,
          icon,
          color,
          opacity: 1,
        });
        if (available > 0) {
          details.push({
            asset,
            value: available * lastPrice,
            icon,
            color,
            opacity: 0.5,
          });
        }
        if (unavailable > 0) {
          details.push({
            asset,
            value: unavailable * lastPrice,
            icon,
            color,
            opacity: 1,
          });
        }
        return [totals, details];
      },
      [[], []]
    );
  }, [assets]);

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
        {dataDetails.map(ChartAssetsPieCell)}
      </Pie>
      <Pie
        data={dataTotals}
        dataKey="value"
        isAnimationActive={false}
        label={ChartAssetsPieLabel}
        labelLine={false}
        innerRadius="38.2%"
        outerRadius="61.8%"
      >
        {dataTotals.map(ChartAssetsPieCell)}
      </Pie>
    </PieChart>
  );
}
