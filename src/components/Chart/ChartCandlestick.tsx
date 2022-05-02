import React, { ReactNode, useMemo } from "react";
import { Bar, RectangleProps, ComposedChart } from "recharts";

export interface CandlestickData {
  open?: number;
  high?: number;
  low?: number;
  close?: number;
}

export function CandlestickShape({
  x,
  y,
  width,
  height,
  open,
  high,
  low,
  close,
}: RectangleProps & CandlestickData) {
  if (
    x === undefined ||
    y === undefined ||
    width === undefined ||
    height === undefined ||
    open === undefined ||
    high === undefined ||
    low === undefined ||
    close === undefined ||
    high <= low
  ) {
    return null;
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

export function CandlestickChart({
  children,
  data,
  ...props
}: {
  children: ReactNode;
  data: CandlestickData[];
}) {
  const rangedData = useMemo(
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
    <ComposedChart {...props} data={rangedData}>
      <Bar
        dataKey="range"
        isAnimationActive={false}
        shape={<CandlestickShape />}
      />
      {children}
    </ComposedChart>
  );
}
