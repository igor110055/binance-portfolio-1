export const toOhlcData =
  (quoteAssetKlines: Kline[]) =>
  (
    [time, baseAssetOpen, baseAssetHigh, baseAssetLow, baseAssetClose]: Kline,
    index: number
  ): OHLCData => {
    const [, quoteAssetOpen, quoteAssetHigh, quoteAssetLow, quoteAssetClose] =
      quoteAssetKlines[index];
    const open = Number(baseAssetOpen) / Number(quoteAssetOpen);
    const high = Number(baseAssetHigh) / Number(quoteAssetHigh);
    const low = Number(baseAssetLow) / Number(quoteAssetLow);
    const close = Number(baseAssetClose) / Number(quoteAssetClose);
    return {
      time: new Date(time),
      open,
      high: Math.max(open, close, high),
      low: Math.min(open, close, low),
      close,
    };
  };
