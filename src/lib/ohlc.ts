export type OHLCData = {
  time: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

export const toOhlcData =
  (quoteKlines: Kline[]) =>
  (
    [time, baseOpen, baseHigh, baseLow, baseClose, baseVolume]: Kline,
    index: number
  ): OHLCData => {
    const [, quoteOpen, quoteHigh, quoteLow, quoteClose, quoteVolume] =
      quoteKlines[index];
    const open = Number(baseOpen) / Number(quoteOpen);
    const high = Number(baseHigh) / Number(quoteHigh);
    const low = Number(baseLow) / Number(quoteLow);
    const close = Number(baseClose) / Number(quoteClose);
    return {
      time: new Date(time),
      open,
      high: Math.max(open, close, high),
      low: Math.min(open, close, low),
      close,
      volume: (Number(baseVolume) + Number(quoteVolume)) / 2,
    };
  };
