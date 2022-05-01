import axios, { AxiosRequestConfig } from "axios";
import { HmacSHA256 } from "crypto-js";

const API_URL = "https://api.binance.com/api/v3";

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

function appendHeaders(
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
    ...params,
    timestamp,
  };
}

export function makeRequest<T>(path: string, config: AxiosRequestConfig = {}) {
  const url = API_URL + path;
  const headers = appendHeaders(config.headers);
  const params = appendParams(config.params);
  const signature = encodeSignature(params);
  return axios.request<T>({
    ...config,
    url,
    headers,
    params: { ...params, signature },
  });
}
