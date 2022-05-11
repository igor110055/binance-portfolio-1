import { loadRequest } from "../request";
import { applyBinanceRequestConfig } from "./binance";

export type BinanceAccount = {
  makerCommission: number;
  takerCommission: number;
  buyerCommission: number;
  sellerCommission: number;
  canTrade: boolean;
  canWithdraw: boolean;
  canDeposit: boolean;
  updateTime: number;
  accountType: string;
  balances: BinanceAccountBalance[];
  permissions: string[];
};

export type BinanceAccountBalance = {
  asset: string;
  free: string;
  locked: string;
};

export type BinanceAccountParams = { recvWindow?: number };

export function loadBinanceAccount(params?: BinanceAccountParams) {
  const config = applyBinanceRequestConfig(
    "/api/v3/account",
    { method: "get", params },
    true
  );
  return loadRequest<BinanceAccount>(config);
}
