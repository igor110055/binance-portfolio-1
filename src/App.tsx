import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { AccountProvider } from "./contexts/AccountProvider";
import { BalanceGrid } from "./components/Balance/BalanceGrid";

function App() {
  return (
    <div className="App p-4">
      <AccountProvider>
        <BalanceGrid />
      </AccountProvider>
    </div>
  );
}

export default App;
