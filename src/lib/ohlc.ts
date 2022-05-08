import { BinanceKline } from "./binance/klines";

export type OHLCData =
  | {
      time: Date;
      open: number;
      high: number;
      low: number;
      close: number;
      volume: number;
    }
  | undefined;

export function toOhlc([
  time,
  open,
  high,
  low,
  close,
  volume,
]: BinanceKline): OHLCData {
  return {
    time: new Date(time),
    open: Number(open),
    high: Number(high),
    low: Number(low),
    close: Number(close),
    volume: Number(volume),
  };
}

export function crossOhlc(base: OHLCData[], quote: OHLCData[]) {
  return base
    .map((baseOhlc, index) => {
      const quoteOhlc = quote[index];
      if (baseOhlc === undefined || quoteOhlc === undefined) {
        return undefined;
      }
      const open = baseOhlc.open / quoteOhlc.open;
      const high = baseOhlc.high / quoteOhlc.high;
      const low = baseOhlc.low / quoteOhlc.low;
      const close = baseOhlc.close / quoteOhlc.close;
      const volume = (baseOhlc.volume + quoteOhlc.volume) / 2;
      return {
        time: new Date(baseOhlc.time),
        open,
        high: Math.max(open, close, high),
        low: Math.min(open, close, low),
        close,
        volume,
      };
    })
    .filter(Boolean) as OHLCData[];
}

export function toValues(ohlc: OHLCData[]) {
  return ohlc.map((data, index) => {
    if (data) {
      return data.close;
    }
    const next = ohlc[index + 1];
    if (next === undefined) {
      return 0;
    }
    const prev = ohlc[index - 1];
    if (prev === undefined) {
      return next.close;
    }
    return (prev.close + next.close) / 2;
  });
}
