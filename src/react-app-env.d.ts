/// <reference types="react-scripts" />

type OHLCData = {
  time: Date;
  open: number;
  high: number;
  low: number;
  close: number;
};

// Binance

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
  balances: AccountBalance[];
  permissions: string[];
}
interface AccountBalance {
  asset: string;
  free: string;
  locked: string;
}

type Kline = [
  openTime: number,
  open: string,
  high: string,
  low: string,
  close: string,
  volume: string,
  closeTime: number,
  quoteAssetVolume: string,
  numberOfTrades: number,
  takerBuyBaseAssetVolume: string,
  takerBuyQuoteAssetVolume: string,
  ignore: string
];

interface TickerPrice {
  price: string;
  symbol: string;
}
