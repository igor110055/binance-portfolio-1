import { useMemo } from "react";
import { useAccountContext } from "../contexts/useAccountContext";

export function useBalances() {
  const account = useAccountContext();

  return useMemo(
    () =>
      account.balances.filter(
        (balance) =>
          (Number(balance.free) > 0 || Number(balance.locked) > 0) &&
          !balance.asset.startsWith("LD") &&
          balance.asset !== process.env.REACT_APP_CURRENCY
      ),
    [account.balances]
  );
}
