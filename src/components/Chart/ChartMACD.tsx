import React, { useMemo } from "react";
import { Bar, ComposedChart, Line, Rectangle, YAxis } from "recharts";
import { CategoricalChartProps } from "recharts/types/chart/generateCategoricalChart";
import { MACDOutput } from "technicalindicators/declarations/moving_averages/MACD";

function ChartMACDHistogramShape({
  histogram,
  ...props
}: {
  histogram?: number;
}) {
  if (histogram === undefined) {
    return null;
  }
  if (histogram < 0) {
    return <Rectangle fill="red" fillOpacity={0.5} {...props} />;
  }
  return <Rectangle fill="green" fillOpacity={0.5} {...props} />;
}

export function ChartMACD({
  data,
  ...props
}: CategoricalChartProps & {
  data: (MACDOutput | undefined)[];
}) {
  const yDomain = useMemo<[number, number]>(() => {
    const extreme = data.reduce<number>((max, output) => {
      if (
        output === undefined ||
        output.signal === undefined ||
        output.MACD === undefined
      ) {
        return max;
      }
      return Math.max(max, Math.abs(output.signal), Math.abs(output.MACD));
    }, 0);
    return [-extreme, extreme];
  }, [data]);
  return (
    <ComposedChart {...props} data={data}>
      <YAxis domain={yDomain} tick={false} width={0} />
      <Bar
        dataKey="histogram"
        isAnimationActive={false}
        shape={<ChartMACDHistogramShape />}
      />
      <Line
        dataKey="MACD"
        dot={false}
        isAnimationActive={false}
        stroke="black"
        strokeOpacity={0.5}
      />
      <Line
        dataKey="signal"
        dot={false}
        isAnimationActive={false}
        stroke="grey"
        strokeOpacity={0.5}
      />
    </ComposedChart>
  );
}
