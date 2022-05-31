import React from "react";
import { PortfolioLocalProvider } from "./contexts/Portfolio/PortfolioLocalProvider";
import { AssetsProvider } from "./contexts/Assets/AssetsProvider";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { StrategyProvider } from "./contexts/Strategy/StrategyProvider";

function App() {
  return (
    <div className="App p-4">
      <PortfolioLocalProvider>
        <AssetsProvider>
          <StrategyProvider>
            <Dashboard />
          </StrategyProvider>
        </AssetsProvider>
      </PortfolioLocalProvider>
    </div>
  );
}

export default App;
