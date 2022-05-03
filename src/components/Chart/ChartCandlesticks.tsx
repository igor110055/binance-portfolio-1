import React, { ReactNode, useMemo } from "react";
import { Bar, RectangleProps, ComposedChart } from "recharts";
import { CategoricalChartProps } from "recharts/types/chart/generateCategoricalChart";

export function CandlestickShape({
  x,
  y,
  width,
  height,
  open,
  high,
  low,
  close,
}: RectangleProps & OHLCData) {
  if (
    x === undefined ||
    y === undefined ||
    width === undefined ||
    height === undefined
  ) {
    return <></>;
  }
  const bullish = open < close;
  const ratio = height / (high - low);
  const top = bullish ? high - close : high - open;
  const body = bullish ? close - open : open - close;
  const center = x + width / 2;
  return (
    <g
      fill={bullish ? "none" : "red"}
      fillOpacity={0.5}
      stroke={bullish ? "green" : "red"}
      strokeOpacity={0.67}
    >
      <rect x={x} y={y + top * ratio} height={body * ratio} width={width} />
      <line x1={center} y1={y} x2={center} y2={y + top * ratio} />
      <line
        x1={center}
        y1={y + (top + body) * ratio}
        x2={center}
        y2={y + height}
      />
    </g>
  );
}

export function ChartCandlesticks({
  children,
  data,
  ...props
}: CategoricalChartProps & {
  children?: ReactNode;
  data: OHLCData[];
}) {
  const rangeData = useMemo(
    () =>
      data.map(({ high, low, ...ohlc }) => ({
        high,
        low,
        ...ohlc,
        range: [low, high],
      })),
    [data]
  );
  return (
    <ComposedChart {...props} data={rangeData}>
      <Bar dataKey="range" isAnimationActive={false} shape={CandlestickShape} />
      {children}
    </ComposedChart>
  );
}
