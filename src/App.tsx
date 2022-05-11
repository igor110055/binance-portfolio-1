import React from "react";
import { PortfolioLocalProvider } from "./contexts/Portfolio/PortfolioLocalProvider";
import { AssetsProvider } from "./contexts/Assets/AssetsProvider";
import { PortfolioDashboard } from "./components/Portfolio/PortfolioDashboard";

function App() {
  return (
    <div className="App p-4">
      <PortfolioLocalProvider>
        <AssetsProvider>
          <PortfolioDashboard />
        </AssetsProvider>
      </PortfolioLocalProvider>
    </div>
  );
}

export default App;
