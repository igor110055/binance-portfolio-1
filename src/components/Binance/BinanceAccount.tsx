import React, { useMemo } from "react";
import { Pie, PieChart } from "recharts";
import { CategoricalChartProps } from "recharts/types/chart/generateCategoricalChart";
import { useRequest } from "../../hooks/useRequest";
import { getAccount } from "../../lib/binance/account";

export function BinanceAccount(props: CategoricalChartProps) {
  const getAccountRequest = useRequest(getAccount);

  const balances = useMemo(
    () =>
      getAccountRequest.data?.balances
        .map((balance) => ({
          asset: balance.asset,
          free: Number(balance.free),
          locked: Number(balance.locked),
        }))
        .filter((balance) => balance.free > 0 || balance.locked > 0),
    [getAccountRequest.data]
  );

  if (getAccountRequest.loading) {
    return <div>Loading ...</div>;
  }

  console.log(balances);

  return (
    <PieChart className="BinanceAccount" {...props}>
      <Pie data={balances} dataKey="free" nameKey="asset" label={true} />
    </PieChart>
  );
}
