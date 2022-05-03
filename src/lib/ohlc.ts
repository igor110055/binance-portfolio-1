export const toOhlcData =
  (currencyKlines: Kline[]) =>
  (
    [time, assetOpen, assetHigh, assetLow, assetClose]: Kline,
    index: number
  ): OHLCData => {
    const [, currencyOpen, currencyHigh, currencyLow, currencyClose] =
      currencyKlines[index];
    const open = Number(assetOpen) / Number(currencyOpen);
    const high = Number(assetHigh) / Number(currencyHigh);
    const low = Number(assetLow) / Number(currencyLow);
    const close = Number(assetClose) / Number(currencyClose);
    return {
      time: new Date(time),
      open,
      high: Math.max(open, close, high),
      low: Math.min(open, close, low),
      close,
    };
  };
