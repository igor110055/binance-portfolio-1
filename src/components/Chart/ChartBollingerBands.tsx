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
  limitBuy,
  limitSell,
  ...props
}: CategoricalChartProps & {
  bollingerBands: BollingerBandsOutput[];
  ohlc: OHLCData[];
  sma: number[];
  limitBuy: number;
  limitSell: number;
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
    return [_.ceil(limitBuy, 6), _.floor(limitSell, 6)];
  }, [limitBuy, limitSell]);
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
        tickLine={true}
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
