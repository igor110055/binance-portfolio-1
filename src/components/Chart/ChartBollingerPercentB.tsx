import React from "react";
import { Line, LineChart, ReferenceLine, YAxis } from "recharts";
import { BollingerBandsOutput } from "technicalindicators/declarations/volatility/BollingerBands";

export function ChartBollingerPercentB(props: {
  data: BollingerBandsOutput[];
}) {
  return (
    <LineChart {...props}>
      <YAxis domain={[-0.75, 1 + 0.75]} tick={false} width={0} />
      <ReferenceLine stroke="grey" strokeOpacity={0.5} y={0} />
      <ReferenceLine stroke="grey" strokeOpacity={0.5} y={1} />
      <Line dataKey="pb" dot={false} isAnimationActive={false} stroke="grey" />
    </LineChart>
  );
}
