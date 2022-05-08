import React, { useMemo } from "react";
import { Line, XAxis, YAxis } from "recharts";
import { CategoricalChartProps } from "recharts/types/chart/generateCategoricalChart";
import { BollingerBandsOutput } from "technicalindicators/declarations/volatility/BollingerBands";
import { CandlesticksChart } from "../../common/CandlesticksChart";
import { OHLCData } from "../../lib/ohlc";

export function ChartBollingerBands({
  bollingerBands,
  ohlc,
  ...props
}: CategoricalChartProps & {
  bollingerBands: BollingerBandsOutput[];
  ohlc: OHLCData[];
}) {
  const yDomain = useMemo<[number, number]>(() => {
    const extremes = ohlc.reduce<number[]>((values, data) => {
      if (data) {
        return [...values, data.high, data.low];
      }
      return values;
    }, []);
    return [Math.min(...extremes), Math.max(...extremes)];
  }, [ohlc]);
  const mergedData = useMemo(
    () =>
      ohlc
        .map(
          (ohlc, index) =>
            ohlc && {
              ...ohlc,
              ...bollingerBands[index],
            }
        )
        .filter(Boolean),
    [bollingerBands, ohlc]
  );
  return (
    <CandlesticksChart {...props} data={mergedData}>
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
