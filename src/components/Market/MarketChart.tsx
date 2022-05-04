import React, { useMemo } from "react";
import { ResponsiveContainer, XAxis, YAxis } from "recharts";
import { MarketData } from "../../contexts/useMarketsContext";
import { ChartBollingerBands } from "../Chart/ChartBollingerBands";

export function MarketChart(props: { data: MarketData }) {
  const yDomain = useMemo<[number, number]>(() => {
    const extremes = props.data.ohlc.reduce<number[]>(
      (values, { high, low }) => [...values, high, low],
      []
    );
    return [Math.min(...extremes), Math.max(...extremes)];
  }, [props.data]);

  return (
    <ResponsiveContainer className="MarketChart" height={160}>
      <ChartBollingerBands data={props.data}>
        <XAxis dataKey="time" tick={false} height={0} />
        <YAxis domain={yDomain} tick={false} width={0} />
      </ChartBollingerBands>
    </ResponsiveContainer>
  );
}
