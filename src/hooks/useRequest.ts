import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useMemo, useState } from "react";
import { setupCache } from "axios-cache-adapter";

const cache = setupCache({
  maxAge: 15 * 60 * 1000,
});

const api = axios.create({
  adapter: cache.adapter,
});

export function useRequest<T>(config: AxiosRequestConfig) {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    api
      .request<T>(config)
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch(console.warn)
      .finally(() => setLoading(false));
  }, [config]);

  return useMemo(() => ({ data, loading }), [data, loading]);
}
