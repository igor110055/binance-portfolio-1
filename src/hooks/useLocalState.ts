import { useCallback, useMemo, useState } from "react";

export function useLocalState<T>(name: string, initialState?: T) {
  const [localData, setLocalData] = useState<T>(() => {
    if (localStorage[name]) {
      return JSON.parse(localStorage[name]);
    }
    return initialState;
  });
  const setData = useCallback(
    (data: T) => {
      setLocalData(data);
      localStorage[name] = JSON.stringify(data);
    },
    [name]
  );
  return useMemo<[T, (data: T) => void]>(
    () => [localData, setData],
    [localData, setData]
  );
}
