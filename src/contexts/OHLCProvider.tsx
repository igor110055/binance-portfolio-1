import React, { ReactNode, useMemo } from "react";
import { Spinner } from "react-bootstrap";
import { useBinanceKlines } from "../hooks/useBinance";
import { OHLCContext, OHLC_INTERVAL, OHLC_LIMIT } from "./useOHLCContext";

export function OHLCProvider(props: { children: ReactNode; asset: string }) {
  const symbol = props.asset + process.env.REACT_APP_CURRENCY;
  const klines = useBinanceKlines(symbol, OHLC_INTERVAL, OHLC_LIMIT);

  const ohlcData = useMemo(
    () =>
      klines.data?.map(
        ([
          openTime,
          open,
          high,
          low,
          close,
          volume,
          closeTime,
          quoteAssetVolume,
          numberOfTrades,
          takerBuyBaseAssetVolume,
          takerBuyQuoteAssetVolume,
          ignore,
        ]) => ({
          openTime: Number(openTime),
          open: Number(open),
          high: Number(high),
          low: Number(low),
          close: Number(close),
          volume: Number(volume),
          closeTime: Number(closeTime),
          quoteAssetVolume: Number(quoteAssetVolume),
          numberOfTrades: Number(numberOfTrades),
          takerBuyBaseAssetVolume: Number(takerBuyBaseAssetVolume),
          takerBuyQuoteAssetVolume: Number(takerBuyQuoteAssetVolume),
          ignore: Number(ignore),
        })
      ),
    [klines.data]
  );

  if (klines.loading) {
    return <Spinner animation="grow" />;
  }

  if (!klines.data || !ohlcData) {
    throw new Error(`OHLC data not available for symbol "${symbol}".`);
  }

  return (
    <OHLCContext.Provider value={ohlcData}>
      {props.children}
    </OHLCContext.Provider>
  );
}
