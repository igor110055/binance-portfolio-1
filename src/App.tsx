import React from "react";
import { PortfolioBinanceProvider } from "./contexts/Portfolio/PortfolioBinanceProvider";
import { AssetsProvider } from "./contexts/AssetsProvider";
import { PortfolioDashboard } from "./components/Portfolio/PortfolioDashboard";

function App() {
  return (
    <div className="App p-4">
      <PortfolioBinanceProvider>
        <AssetsProvider>
          <PortfolioDashboard />
        </AssetsProvider>
      </PortfolioBinanceProvider>
    </div>
  );
}

export default App;
