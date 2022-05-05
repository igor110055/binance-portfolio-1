import { HeikinAshi } from "technicalindicators";
import { OHLCData } from "./ohlc";

export function toHeikinAshi(ohlc: OHLCData[]): OHLCData[] {
  const heikinAshi = HeikinAshi.calculate({
    timestamp: ohlc.map((d) => d.time.valueOf()),
    open: ohlc.map((d) => d.open),
    high: ohlc.map((d) => d.high),
    low: ohlc.map((d) => d.low),
    close: ohlc.map((d) => d.close),
    volume: ohlc.map((d) => d.volume),
  });
  return Array.from({ length: ohlc.length }, (_, index) => {
    if (
      heikinAshi.timestamp &&
      heikinAshi.open &&
      heikinAshi.high &&
      heikinAshi.low &&
      heikinAshi.close &&
      heikinAshi.volume
    ) {
      return {
        time: new Date(heikinAshi.timestamp[index]),
        open: heikinAshi.open[index],
        high: heikinAshi.high[index],
        low: heikinAshi.low[index],
        close: heikinAshi.close[index],
        volume: heikinAshi.volume[index],
      };
    }
    return ohlc[index];
  });
}
