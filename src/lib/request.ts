import axios, { AxiosRequestConfig } from "axios";
import { setupCache } from "axios-cache-adapter";
import axiosThrottle from "axios-request-throttle";

export const CACHE_MAX_AGE = 15 * 60 * 1000;

const cache = setupCache({
  maxAge: CACHE_MAX_AGE,
});

export const API = axios.create({
  adapter: cache.adapter,
});

axiosThrottle.use(API, { requestsPerSecond: 1 });

export async function loadRequest<T>(config: AxiosRequestConfig) {
  const response = await API.request<T>(config);
  if (response.request.fromCache !== true) {
    console.warn(response);
  } else {
    console.log(response);
  }
  return response.data;
}
