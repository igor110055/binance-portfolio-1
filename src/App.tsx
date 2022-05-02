import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BinanceProvider } from "./contexts/BinanceProvider";
import { BalanceGrid } from "./components/Balance/BalanceGrid";

function App() {
  return (
    <div className="App p-4">
      <BinanceProvider>
        <BalanceGrid />
      </BinanceProvider>
    </div>
  );
}

export default App;
