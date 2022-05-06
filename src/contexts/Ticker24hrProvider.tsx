import React, { ReactNode, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { API, CACHE_MAX_AGE } from "../hooks/useRequest";
import { applyBinanceRequestConfig } from "../lib/binance";
import { Ticker24hrContext, Ticker24hrData } from "./useTicker24hrContext";

let fetchedAt = 0;

export function Ticker24hrProvider(props: {
  assets: string[];
  children: ReactNode;
}) {
  const [data, setData] = useState<Ticker24hrData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const date = new Date();
    const timestamp = date.valueOf();
    if (timestamp - fetchedAt > CACHE_MAX_AGE) {
      fetchedAt = timestamp;
      Promise.all(
        props.assets.map((asset) => {
          const symbol = asset + process.env.REACT_APP_CURRENCY;
          const config = applyBinanceRequestConfig(
            "/v3/ticker/24hr",
            {
              method: "get",
              params: {
                symbol,
              },
            },
            false
          );
          return API.request<Ticker24hr>(config).then((response) => {
            if (response.request.fromCache !== true) {
              console.warn(response);
            } else {
              console.log(response);
            }
            return {
              asset,
              ticker24hr: response.data,
            };
          });
        })
      )
        .then((ticker24hr) => setData(ticker24hr))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [props.assets]);

  if (loading) {
    return <Spinner animation="grow" />;
  }

  if (!data) {
    throw new Error(`Ticker24hr data not available.`);
  }

  return (
    <Ticker24hrContext.Provider value={data}>
      {props.children}
    </Ticker24hrContext.Provider>
  );
}
