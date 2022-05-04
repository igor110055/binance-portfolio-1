import React, { useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useBalances } from "../../hooks/useBalances";
import { MarketGrid } from "../Market/MarketGrid";
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
      <MarketsProvider assets={assets}>
        <MarketGrid />
      </MarketsProvider>
    </KlinesProvider>
  );
}

export default App;
