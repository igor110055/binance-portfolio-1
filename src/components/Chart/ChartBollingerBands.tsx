import React, { ReactNode } from "react";
import { Line } from "recharts";
import { MarketData } from "../../contexts/useMarketsContext";
import { ChartCandlesticks } from "./ChartCandlesticks";

export function ChartBollingerBands({
  children,
  data,
  ...props
}: {
  children?: ReactNode;
  data: MarketData;
}) {
  const mergedData = data.ohlc.map((ohlc, index) => ({
    ...ohlc,
    ...data.bollingerBands[index],
  }));
  return (
    <ChartCandlesticks data={mergedData} {...props}>
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
