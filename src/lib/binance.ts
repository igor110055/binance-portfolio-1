import _ from "lodash";
import { AxiosRequestConfig } from "axios";
import { HmacSHA256 } from "crypto-js";

const API_URL = "https://api.binance.com/api";

function applyHeaders(
  headers: AxiosRequestConfig["headers"]
): AxiosRequestConfig["headers"] {
  if (process.env.REACT_APP_API_KEY === undefined) {
    throw new Error("REACT_APP_API_KEY is undefined.");
  }
  return {
    ...headers,
    "X-MBX-APIKEY": process.env.REACT_APP_API_KEY,
  };
}

function appendParams(
  params: AxiosRequestConfig["params"]
): AxiosRequestConfig["params"] {
  const date = new Date();
  const timestamp = date.getTime().toString();
  return {
    ..._.omitBy(params, _.isNil),
    timestamp,
  };
}

function encodeSignature(params: AxiosRequestConfig["params"]): string {
  if (process.env.REACT_APP_API_SECRET === undefined) {
    throw new Error("REACT_APP_API_SECRET is undefined.");
  }
  const searchParams = new URLSearchParams(params);
  return HmacSHA256(
    searchParams.toString(),
    process.env.REACT_APP_API_SECRET
  ).toString();
}

export function applyBinanceRequestConfig(
  path: string,
  config: AxiosRequestConfig = {},
  signed: boolean
): AxiosRequestConfig {
  const url = API_URL + path;
  if (signed) {
    const headers = applyHeaders(config.headers);
    const params = appendParams(config.params);
    const signature = encodeSignature(params);
    return {
      ...config,
      url,
      headers,
      params: { ...params, signature },
    };
  }
  return { ...config, url };
}
