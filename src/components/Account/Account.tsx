import React, { useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useBalances } from "../../hooks/useBalances";
import { BalanceGrid } from "../Balance/BalanceGrid";
import { MarketsProvider } from "../../contexts/MarketsProvider";
import { KlinesProvider } from "../../contexts/KlinesProvider";

function App() {
  const balances = useBalances();
  const assets = useMemo(
    () => balances.map((balance) => balance.asset),
    [balances]
  );

  return (
    <KlinesProvider assets={assets}>
      <MarketsProvider>
        <BalanceGrid />
      </MarketsProvider>
    </KlinesProvider>
  );
}

export default App;
