import React, { ReactNode, useMemo } from "react";
import { Line } from "recharts";
import { CategoricalChartProps } from "recharts/types/chart/generateCategoricalChart";
import { BollingerBands } from "technicalindicators";
import { CandlestickData, ChartCandlesticks } from "./ChartCandlesticks";

const BOLLINGER_BANDS_PERIOD = 14;
const BOLLINGER_BANDS_STANDARD_DEVIATION = 2;

export type BollingerBandsData = CandlestickData & {
  upper: number;
  middle: number;
  lower: number;
};

export function ChartBollingerBands({
  children,
  data,
  ...props
}: CategoricalChartProps & {
  children?: ReactNode;
  data: CandlestickData[];
}) {
  const bollingerBands = useMemo(
    () => [
      ...BollingerBands.calculate({
        period: BOLLINGER_BANDS_PERIOD,
        stdDev: BOLLINGER_BANDS_STANDARD_DEVIATION,
        values: data.map((d) => d.close),
      }),
    ],
    [data]
  );
  const bollingerBandsData = useMemo(() => {
    const offset = data.length - bollingerBands.length;
    return data.map((d, index) => {
      const bollingerBandsIndex = index - offset;
      if (bollingerBandsIndex >= 0) {
        return { ...d, ...bollingerBands[bollingerBandsIndex] };
      }
      return d;
    });
  }, [bollingerBands, data]);
  return (
    <ChartCandlesticks data={bollingerBandsData} {...props}>
      {children}
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
    </ChartCandlesticks>
  );
}
