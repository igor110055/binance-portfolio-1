import React, { ReactNode } from "react";
import { Spinner } from "react-bootstrap";
import { useBinanceAccount, useBinanceTickerPrices } from "../hooks/useBinance";
import { BinanceContext } from "./BinanceContext";

export function BinanceProvider(props: { children: ReactNode }) {
  const account = useBinanceAccount();
  const tickerPrices = useBinanceTickerPrices();

  if (account.loading || tickerPrices.loading) {
    return <Spinner animation="grow" />;
  }

  if (!account.data) {
    throw new Error("Account Data not available.");
  }

  if (!tickerPrices.data) {
    throw new Error("Ticker Prices Data not available.");
  }

  return (
    <BinanceContext.Provider
      value={{ account: account.data, tickerPrices: tickerPrices.data }}
    >
      {props.children}
    </BinanceContext.Provider>
  );
}
