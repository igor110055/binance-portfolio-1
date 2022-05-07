import React, { useMemo } from "react";
import { Line, LineChart, ReferenceLine, YAxis } from "recharts";

export function ChartRSI({ data, ...props }: { data: number[] }) {
  const color = useMemo(() => {
    if (data[data.length - 1] > 70) return "green";
    if (data[data.length - 1] < 30) return "red";
    return "black";
  }, [data]);
  return (
    <LineChart data={data} {...props}>
      <YAxis domain={[0, 100]} tick={false} width={0} />
      <ReferenceLine stroke="grey" strokeOpacity={0.5} y={70} />
      <ReferenceLine stroke="grey" strokeOpacity={0.5} y={30} />
      <Line
        dataKey={(rsi) => rsi}
        dot={false}
        isAnimationActive={false}
        stroke={color}
        strokeOpacity={0.5}
      />
    </LineChart>
  );
}
