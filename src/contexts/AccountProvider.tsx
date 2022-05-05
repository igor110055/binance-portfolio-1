import React, { ReactNode, useMemo } from "react";
import { Spinner } from "react-bootstrap";
import { useRequest } from "../hooks/useRequest";
import { applyBinanceRequestConfig } from "../lib/binance";
import { AccountContext } from "./useAccountContext";

export function AccountProvider(props: {
  children: ReactNode;
  recvWindow?: number;
}) {
  const config = useMemo(() => {
    return applyBinanceRequestConfig(
      "/v3/account",
      { method: "get", params: { recvWindow: props.recvWindow } },
      true
    );
  }, [props.recvWindow]);
  const account = useRequest<Account>(config);

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
