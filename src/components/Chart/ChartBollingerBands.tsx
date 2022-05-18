import _ from "lodash";
import React, { useMemo } from "react";
import { Line, XAxis, YAxis } from "recharts";
import { CategoricalChartProps } from "recharts/types/chart/generateCategoricalChart";
import { BollingerBandsOutput } from "technicalindicators/declarations/volatility/BollingerBands";
import { CandlesticksChart } from "../../common/CandlesticksChart";
import { OHLCData } from "../../lib/ohlc";

export function ChartBollingerBands({
  bollingerBands,
  ohlc,
  sma,
  ...props
}: CategoricalChartProps & {
  bollingerBands: BollingerBandsOutput[];
  ohlc: OHLCData[];
  sma: number[];
}) {
  const yDomain = useMemo<[number, number]>(() => {
    const extremes = ohlc.reduce<number[]>((values, data) => {
      if (data) {
        return [...values, data.high, data.low];
      }
      return values;
    }, []);
    return [
      Math.min(
        ...extremes,
        bollingerBands[bollingerBands.length - 1].lower,
        sma[sma.length - 1]
      ),
      Math.max(
        ...extremes,
        bollingerBands[bollingerBands.length - 1].upper,
        sma[sma.length - 1]
      ),
    ];
  }, [bollingerBands, ohlc, sma]);
  const ticks = useMemo(() => {
    const min = _.round(
      Math.min(
        ohlc[ohlc.length - 1]?.close || Infinity,
        bollingerBands[bollingerBands.length - 1].lower,
        sma[sma.length - 1]
      ),
      6
    );
    const max = _.round(
      Math.max(
        ohlc[ohlc.length - 1]?.close || 0,
        bollingerBands[bollingerBands.length - 1].upper,
        sma[sma.length - 1]
      ),
      6
    );
    return [Number(min), Number(max)];
  }, [bollingerBands, ohlc, sma]);
  const mergedData = useMemo(
    () =>
      ohlc
        .map(
          (ohlc, index) =>
            ohlc && {
              ...ohlc,
              ...bollingerBands[index],
              sma: sma[index],
            }
        )
        .filter(Boolean),
    [bollingerBands, ohlc, sma]
  );
  return (
    <CandlesticksChart {...props} data={mergedData}>
      <XAxis dataKey="time" tick={false} height={0} />
      <YAxis
        axisLine={false}
        domain={yDomain}
        ticks={ticks}
        mirror={true}
        orientation="right"
        tickLine={false}
      />
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
      <Line
        dataKey="sma"
        dot={false}
        isAnimationActive={false}
        stroke="blueviolet"
        strokeOpacity={0.5}
      />
    </CandlesticksChart>
  );
}
