/// <reference types="react-scripts" />

interface Account {
  makerCommission: number;
  takerCommission: number;
  buyerCommission: number;
  sellerCommission: number;
  canTrade: boolean;
  canWithdraw: boolean;
  canDeposit: boolean;
  updateTime: number;
  accountType: string;
  balances: Balance[];
  permissions: string[];
}
interface Balance {
  asset: string;
  free: string;
  locked: string;
}

interface TickerPrice {
  price: string;
  symbol: string;
}
