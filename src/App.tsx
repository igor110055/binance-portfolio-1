import React from "react";
import { PortfolioLocalProvider } from "./contexts/Portfolio/PortfolioLocalProvider";
import { AssetsProvider } from "./contexts/Assets/AssetsProvider";
import { Dashboard } from "./components/Dashboard/Dashboard";

function App() {
  return (
    <div className="App p-4">
      <PortfolioLocalProvider>
        <AssetsProvider>
          <Dashboard />
        </AssetsProvider>
      </PortfolioLocalProvider>
    </div>
  );
}

export default App;
