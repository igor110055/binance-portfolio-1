import React, { ReactNode } from "react";
import { Spinner } from "react-bootstrap";
import { useBinanceAccount } from "../hooks/useBinance";
import { AccountContext } from "./useAccountContext";

export function AccountProvider(props: { children: ReactNode }) {
  const account = useBinanceAccount();

  if (account.loading) {
    return <Spinner animation="grow" />;
  }

  if (!account.data) {
    throw new Error("Account data not available.");
  }

  return (
    <AccountContext.Provider value={account.data}>
      {props.children}
    </AccountContext.Provider>
  );
}
