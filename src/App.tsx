import React from "react";
import { PortfolioLocalProvider } from "./contexts/Portfolio/PortfolioLocalProvider";
import { AssetsProvider } from "./contexts/Assets/AssetsProvider";
import { PortfolioDashboard } from "./components/Portfolio/PortfolioDashboard";
import { PricesProvider } from "./contexts/Prices/PricesProvider";

function App() {
  return (
    <div className="App p-4">
      <PortfolioLocalProvider>
        <PricesProvider>
          <AssetsProvider>
            <PortfolioDashboard />
          </AssetsProvider>
        </PricesProvider>
      </PortfolioLocalProvider>
    </div>
  );
}

export default App;
