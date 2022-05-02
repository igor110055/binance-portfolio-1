import React, { ReactNode } from "react";
import { Line } from "recharts";
import { CategoricalChartProps } from "recharts/types/chart/generateCategoricalChart";
import { OHLCData } from "../../contexts/useOHLCContext";
import { useBollingerBands } from "../../hooks/useBollingerBands";
import { ChartCandlesticks } from "./ChartCandlesticks";

export function ChartBollingerBands({
  children,
  data,
  ...props
}: CategoricalChartProps & {
  children?: ReactNode;
  data: OHLCData[];
}) {
  const bollingerBandsData = useBollingerBands(data);
  return (
    <ChartCandlesticks data={bollingerBandsData} {...props}>
      {children}
      <Line
        dataKey="upper"
        dot={false}
        isAnimationActive={false}
        stroke="grey"
        strokeOpacity={0.5}
      />
      <Line
        dataKey="lower"
        dot={false}
        isAnimationActive={false}
        stroke="grey"
        strokeOpacity={0.5}
      />
      <Line
        dataKey="middle"
        dot={false}
        isAnimationActive={false}
        stroke="grey"
        strokeDasharray="4 2"
        strokeOpacity={0.5}
      />
    </ChartCandlesticks>
  );
}
