import React, { useMemo } from "react";
import { ResponsiveContainer, XAxis, YAxis } from "recharts";
import { useOHLCContext } from "../../contexts/useOHLCContext";
import { ChartBollingerBands } from "../Chart/ChartBollingerBands";

export function BalanceChart() {
  const ohlc = useOHLCContext();
  const yDomain = useMemo<[number, number]>(() => {
    const extremes = ohlc.reduce<number[]>(
      (values, { high, low }) => [...values, high, low],
      []
    );
    return [Math.min(...extremes), Math.max(...extremes)];
  }, [ohlc]);
  const ticks = useMemo(
    () => [yDomain[0], ohlc[ohlc.length - 1]?.close, yDomain[1]],
    [ohlc, yDomain]
  );

  return (
    <ResponsiveContainer className="AnalysisBollinger" height={320}>
      <ChartBollingerBands data={ohlc}>
        <XAxis
          dataKey="closeTime"
          tickFormatter={(closeTime) => {
            const date = new Date(closeTime);
            return date.toLocaleDateString();
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
