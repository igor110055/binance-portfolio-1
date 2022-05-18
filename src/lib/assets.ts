import { loadBinanceTicker } from "./binance/ticker";
import { toOhlc, OHLCData } from "./ohlc";
import { KLINES_LIMIT, loadBinanceKlines } from "./binance/klines";
import COLORS from "../assets/colors.json";
import { AnalysisData, getAnalysis } from "./analysis";
// import TICKERS from "../assets/tickers.json";

// const tickers = TICKERS as const;
// export type AssetId = typeof TICKERS[number];

export type AssetId = keyof typeof COLORS;

export type AssetData = {
  assetId: AssetId;
  lastPrice: number;
  priceChangePercent: number;
  ohlc: OHLCData[];
} & AnalysisData;

export function getAssetIcon(assetId: AssetId) {
  const iconName = assetId.toLowerCase();
  return `/icons/${iconName}.svg`;
}

export function getAssetColor(assetId: AssetId): string | undefined {
  return COLORS[assetId as keyof typeof COLORS];
}

function loadAssetReference(assetId: AssetId): Promise<AssetData> {
  const now = new Date();
  const time = now.getTime();
  const date = now.getDate();
  const ohlc = Array.from({ length: KLINES_LIMIT }, (_, index) => {
    const ohlcTime = new Date(time);
    ohlcTime.setDate(date - (KLINES_LIMIT - index + 1));
    return {
      time: ohlcTime,
      open: 1,
      high: 1,
      low: 1,
      close: 1,
      volume: 0,
    };
  });
  const analysis = getAnalysis(ohlc);
  return Promise.resolve({
    assetId,
    lastPrice: 1,
    priceChangePercent: 0,
    ohlc,
    ...analysis,
  });
}

export function loadAsset(assetId: AssetId): Promise<AssetData> {
  if (assetId === process.env.REACT_APP_CURRENCY) {
    return loadAssetReference(assetId);
  }
  const symbol = assetId + process.env.REACT_APP_CURRENCY;
  return Promise.all([
    loadBinanceTicker({ symbol }),
    loadBinanceKlines({ symbol }),
  ]).then(([ticker, klines]) => {
    const ohlc = klines.map(toOhlc);
    const analysis = getAnalysis(ohlc);
    return {
      assetId,
      lastPrice: Number(ticker.lastPrice),
      priceChangePercent: Number(ticker.priceChangePercent),
      ohlc,
      ...analysis,
    };
  });
}
