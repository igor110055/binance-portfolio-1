import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BinanceAccountPortfolioProvider } from "./contexts/PortfolioProvider";
import { AssetsProvider } from "./contexts/AssetsProvider";
import { PortfolioDashboard } from "./components/Portfolio/PortfolioDashboard";

function App() {
  return (
    <div className="App p-4">
      <BinanceAccountPortfolioProvider>
        <AssetsProvider>
          <PortfolioDashboard />
        </AssetsProvider>
      </BinanceAccountPortfolioProvider>
    </div>
  );
}

export default App;
