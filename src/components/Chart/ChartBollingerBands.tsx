import React, { useMemo } from "react";
import { Line, XAxis, YAxis } from "recharts";
import { BollingerBandsOutput } from "technicalindicators/declarations/volatility/BollingerBands";
import { CandlesticksChart } from "../../common/CandlesticksChart";

export function ChartBollingerBands({
  bollingerBands,
  ohlc,
  ...props
}: {
  bollingerBands: BollingerBandsOutput[];
  ohlc: OHLCData[];
}) {
  const yDomain = useMemo<[number, number]>(() => {
    const extremes = ohlc.reduce<number[]>(
      (values, { high, low }) => [...values, high, low],
      []
    );
    return [Math.min(...extremes), Math.max(...extremes)];
  }, [ohlc]);
  const mergedData = useMemo(
    () =>
      ohlc.map((ohlc, index) => ({
        ...ohlc,
        ...bollingerBands[index],
      })),
    [bollingerBands, ohlc]
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
