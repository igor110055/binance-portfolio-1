import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useMemo, useState } from "react";
import { setupCache } from "axios-cache-adapter";

export const CACHE_MAX_AGE = 15 * 60 * 1000;

const cache = setupCache({
  maxAge: CACHE_MAX_AGE,
});

export const API = axios.create({
  adapter: cache.adapter,
});

export function useRequest<T>(config: AxiosRequestConfig) {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    API.request<T>(config)
      .then((response) => {
        if (response.request.fromCache !== true) {
          console.warn(response);
        } else {
          console.log(response);
        }
        setData(response.data);
      })
      .catch(console.warn)
      .finally(() => setLoading(false));
  }, [config]);

  return useMemo(() => ({ data, loading }), [data, loading]);
}
