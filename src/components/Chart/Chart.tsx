import React, { useMemo } from "react";
import { ResponsiveContainer, XAxis, YAxis } from "recharts";
import { ChartCandlesticks } from "./ChartCandlesticks";

export function Chart(props: {
  klines: Kline[];
  tickFormatter?: (value: any, index: number) => string;
}) {
  const data = props.klines.map(([_, open, high, low, close]) => ({
    open: Number(open),
    high: Number(high),
    low: Number(low),
    close: Number(close),
  }));

  const yDomain = useMemo<[number, number]>(() => {
    const extremes = data.reduce<number[]>(
      (values, { high, low }) => [...values, high, low],
      []
    );
    return [Math.min(...extremes), Math.max(...extremes)];
  }, [data]);
  const ticks = useMemo(
    () => [yDomain[0], data[data.length - 1]?.close, yDomain[1]],
    [data, yDomain]
  );

  return (
    <ResponsiveContainer className="AnalysisBollinger" height={320}>
      <ChartCandlesticks {...props} data={data}>
        <XAxis dataKey="time" tickFormatter={props.tickFormatter} />
        <YAxis
          domain={yDomain}
          orientation="right"
          ticks={ticks}
          type="number"
        />
      </ChartCandlesticks>
    </ResponsiveContainer>
  );
}
