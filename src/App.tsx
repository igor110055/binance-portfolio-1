import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { AccountProvider } from "./contexts/AccountProvider";
import { BalanceGrid } from "./components/Balance/BalanceGrid";
import { OHLCProvider } from "./contexts/OHLCProvider";

function App() {
  return (
    <div className="App p-4">
      <AccountProvider>
        <OHLCProvider>
          <BalanceGrid />
        </OHLCProvider>
      </AccountProvider>
    </div>
  );
}

export default App;
