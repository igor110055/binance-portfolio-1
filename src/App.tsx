import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { AccountProvider } from "./contexts/AccountProvider";
import Account from "./components/Account/Account";

function App() {
  return (
    <div className="App p-4">
      <AccountProvider>
        <Account />
      </AccountProvider>
    </div>
  );
}

export default App;
