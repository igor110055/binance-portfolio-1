import React, { useMemo } from "react";
import { Line, XAxis, YAxis } from "recharts";
import { MarketData } from "../../contexts/useMarketsContext";
import { CandlesticksChart } from "../../common/CandlesticksChart";

export function ChartBollingerBands({ data, ...props }: { data: MarketData }) {
  const yDomain = useMemo<[number, number]>(() => {
    const extremes = data.ohlc.reduce<number[]>(
      (values, { high, low }) => [...values, high, low],
      []
    );
    return [Math.min(...extremes), Math.max(...extremes)];
  }, [data]);
  const mergedData = useMemo(
    () =>
      data.ohlc.map((ohlc, index) => ({
        ...ohlc,
        ...data.bollingerBands[index],
      })),
    [data.bollingerBands, data.ohlc]
  );
  return (
    <CandlesticksChart data={mergedData} {...props}>
      <XAxis dataKey="time" tick={false} height={0} />
      <YAxis domain={yDomain} tick={false} width={0} />
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
    </CandlesticksChart>
  );
}
