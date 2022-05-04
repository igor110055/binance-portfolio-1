import React, { ReactNode } from "react";
import { Line, LineChart, YAxis } from "recharts";
import { BollingerBandsOutput } from "technicalindicators/declarations/volatility/BollingerBands";

export function ChartBollingerPercentB({
  children,
  data,
  ...props
}: {
  children?: ReactNode;
  data: BollingerBandsOutput[];
}) {
  return (
    <LineChart data={data} {...props}>
      {children}
      <YAxis domain={[0, 1]} tick={false} width={0} />
      <Line dataKey="pb" dot={false} isAnimationActive={false} stroke="grey" />
    </LineChart>
  );
}
