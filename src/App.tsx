import React from "react";
import { BinanceAccount } from "./components/Binance/BinanceAccount";
import { useRequest } from "./hooks/useRequest";
import { getAccount } from "./lib/binance/account";

function App() {
  const getAccountRequest = useRequest(getAccount);

  if (getAccountRequest.loading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="App">
      <BinanceAccount width={480} height={480} />
    </div>
  );
}

export default App;
