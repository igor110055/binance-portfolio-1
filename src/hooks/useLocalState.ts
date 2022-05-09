import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";

export function useLocalState<T>(name: string, initialState?: T) {
  const [data, setData] = useState<T>(() => {
    if (localStorage[name]) {
      return JSON.parse(localStorage[name]);
    }
    return initialState;
  });
  useEffect(() => {
    localStorage[name] = JSON.stringify(data);
  }, [data, name]);
  return useMemo<[T, Dispatch<SetStateAction<T>>]>(
    () => [data, setData],
    [data, setData]
  );
}
