import { AxiosPromise, AxiosRequestConfig } from "axios";
import { useEffect, useMemo, useState } from "react";

export function useRequest<T>(
  f: (params: AxiosRequestConfig["params"]) => AxiosPromise<T>,
  params?: AxiosRequestConfig["params"]
) {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    f(params)
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch(console.warn)
      .finally(() => setLoading(false));
  }, [f, params]);

  return useMemo(() => ({ data, loading }), [data, loading]);
}
