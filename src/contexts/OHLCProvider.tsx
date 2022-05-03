import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useBalances } from "../hooks/useBalances";
import { API, CACHE_MAX_AGE } from "../hooks/useRequest";
import { applyBinanceRequestConfig } from "../lib/binance";
import {
  OHLCContext,
  OHLCContextData,
  OHLC_INTERVAL,
  OHLC_LIMIT,
} from "./useOHLCContext";

let fetchedAt = 0;

export function OHLCProvider(props: { children: ReactNode }) {
  const balances = useBalances();
  const assets = useMemo(
    () => balances.map((balance) => balance.asset),
    [balances]
  );

  const [data, setData] = useState<OHLCContextData>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const date = new Date();
    const timestamp = date.valueOf();
    if (timestamp - fetchedAt > CACHE_MAX_AGE) {
      fetchedAt = timestamp;
      Promise.all(
        assets.map((asset) => {
          const symbol = asset + process.env.REACT_APP_CURRENCY;
          const config = applyBinanceRequestConfig(
            "/v3/klines",
            {
              method: "get",
              params: { symbol, interval: OHLC_INTERVAL, limit: OHLC_LIMIT },
            },
            false
          );
          return API.request<Kline[]>(config)
            .then((response) => {
              if (response.request.fromCache !== true) {
                console.warn(response);
              } else {
                console.log(response);
              }
              return {
                asset,
                ohlc: response.data.map(
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
              };
            })
            .catch(console.error);
        })
      )
        .then((ohlc) => setData(ohlc as OHLCContextData))
        .finally(() => setLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...assets]);

  if (loading) {
    return <Spinner animation="grow" />;
  }

  if (!data) {
    throw new Error(`OHLC data not available.`);
  }

  return (
    <OHLCContext.Provider value={data}>{props.children}</OHLCContext.Provider>
  );
}
