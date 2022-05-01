import React, { useMemo } from "react";
import { Spinner } from "react-bootstrap";
import { useBinanceAccount } from "../../hooks/useBinance";
import { BalanceGrid } from "../Balance/BalanceGrid";

export function Account() {
  const account = useBinanceAccount();

  const balances = useMemo(
    () =>
      account.data?.balances.filter(
        (balance) =>
          (Number(balance.free) > 0 || Number(balance.locked) > 0) &&
          !balance.asset.startsWith("LD") &&
          balance.asset !== process.env.REACT_APP_CURRENCY
      ),
    [account.data]
  );

  if (account.loading) {
    return <Spinner animation="grow" />;
  }

  if (!balances) {
    return null;
  }

  console.log(balances);

  return (
    <div className="p-4">
      <BalanceGrid balances={balances} />
    </div>
  );
}
