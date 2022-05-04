import React, { ReactNode, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { API, CACHE_MAX_AGE } from "../hooks/useRequest";
import { applyBinanceRequestConfig } from "../lib/binance";
import { KlinesContext, KlinesData } from "./useKlinesContext";

const KLINES_INTERVAL = "1d";
const KLINES_LIMIT = 90;

let fetchedAt = 0;

export function KlinesProvider(props: {
  assets: string[];
  children: ReactNode;
}) {
  const [data, setData] = useState<KlinesData[]>();
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
            "/v3/klines",
            {
              method: "get",
              params: {
                symbol,
                interval: KLINES_INTERVAL,
                limit: KLINES_LIMIT,
              },
            },
            false
          );
          return API.request<Kline[]>(config).then((response) => {
            if (response.request.fromCache !== true) {
              console.warn(response);
            } else {
              console.log(response);
            }
            return {
              asset,
              klines: response.data,
            };
          });
        })
      )
        .then((klines) => setData(klines))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [props.assets]);

  if (loading) {
    return <Spinner animation="grow" />;
  }

  if (!data) {
    throw new Error(`Klines data not available.`);
  }

  return (
    <KlinesContext.Provider value={data}>
      {props.children}
    </KlinesContext.Provider>
  );
}
