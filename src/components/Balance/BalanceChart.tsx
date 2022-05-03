import React, { useMemo } from "react";
import { ResponsiveContainer, XAxis, YAxis } from "recharts";
import { ChartBollingerBands } from "../Chart/ChartBollingerBands";

export function BalanceChart(props: { ohlc: OHLCData[] }) {
  const yDomain = useMemo<[number, number]>(() => {
    const extremes = props.ohlc.reduce<number[]>(
      (values, { high, low }) => [...values, high, low],
      []
    );
    return [Math.min(...extremes), Math.max(...extremes)];
  }, [props.ohlc]);
  const ticks = useMemo(
    () => [yDomain[0], props.ohlc[props.ohlc.length - 1]?.close, yDomain[1]],
    [props.ohlc, yDomain]
  );

  return (
    <ResponsiveContainer className="AnalysisBollinger" height={240}>
      <ChartBollingerBands data={props.ohlc}>
        <XAxis
          dataKey="time"
          tickFormatter={(time) => {
            return time.toLocaleDateString();
          }}
        />
        <YAxis
          domain={yDomain}
          orientation="right"
          ticks={ticks}
          type="number"
        />
      </ChartBollingerBands>
    </ResponsiveContainer>
  );
}
