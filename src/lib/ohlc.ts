import { BinanceKline } from "./binance/klines";

export type OHLCData = {
  time: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

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
  return base.map((ohlc, index) => {
    const open = ohlc.open / quote[index].open;
    const high = ohlc.high / quote[index].high;
    const low = ohlc.low / quote[index].low;
    const close = ohlc.close / quote[index].close;
    const volume = (ohlc.volume + quote[index].volume) / 2;
    return {
      time: new Date(ohlc.time),
      open,
      high: Math.max(open, close, high),
      low: Math.min(open, close, low),
      close,
      volume,
    };
  });
}
