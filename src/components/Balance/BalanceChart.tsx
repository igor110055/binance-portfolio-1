import React, { useMemo } from "react";
import { ResponsiveContainer, XAxis, YAxis } from "recharts";
import { MarketData } from "../../contexts/useMarketsContext";
import { ChartBollingerBands } from "../Chart/ChartBollingerBands";

export function BalanceChart(props: { data: MarketData }) {
  const yDomain = useMemo<[number, number]>(() => {
    const extremes = props.data.ohlc.reduce<number[]>(
      (values, { high, low }) => [...values, high, low],
      []
    );
    return [Math.min(...extremes), Math.max(...extremes)];
  }, [props.data]);
  const ticks = useMemo(
    () => [
      yDomain[0],
      props.data.ohlc[props.data.ohlc.length - 1]?.close,
      yDomain[1],
    ],
    [props.data, yDomain]
  );

  return (
    <ResponsiveContainer className="AnalysisBollinger" height={240}>
      <ChartBollingerBands data={props.data}>
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
