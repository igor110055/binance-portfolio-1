import { loadBinanceTicker24hr } from "./binance/ticker24hr";
import { toOhlc, OHLCData } from "./ohlc";
import { KLINES_LIMIT, loadBinanceKlines } from "./binance/klines";
import { PortfolioData } from "./portfolio";

import COLORS from "../assets/colors.json";
const colors = COLORS as any;

export const ASSET_ICON_SIZE = 32;

export type AssetData = {
  asset: string;
  lastPrice: number;
  priceChangePercent: number;
  available: number;
  unavailable: number;
  ohlc: OHLCData[];
  icon: string;
  color: string | undefined;
};

function getAssetIconPath(asset: string) {
  const iconName = asset.toLowerCase();
  return `${window.location.origin}/icons/${iconName}.svg`;
}

function loadAssetReference({
  asset,
  available,
  unavailable,
}: PortfolioData): Promise<AssetData> {
  const icon = getAssetIconPath(asset);
  const now = new Date();
  const time = now.getTime();
  const date = now.getDate();
  return Promise.resolve({
    asset,
    lastPrice: 1,
    priceChangePercent: 0,
    available,
    unavailable,
    ohlc: Array.from({ length: KLINES_LIMIT }, (_, index) => {
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
    }),
    icon,
    color: colors[asset],
  });
}

export function loadAsset({
  asset,
  available,
  unavailable,
}: PortfolioData): Promise<AssetData> {
  if (asset === process.env.REACT_APP_CURRENCY) {
    return loadAssetReference({ asset, available, unavailable });
  }
  const symbol = asset + process.env.REACT_APP_CURRENCY;
  const icon = getAssetIconPath(asset);
  return Promise.all([
    loadBinanceTicker24hr({ symbol }),
    loadBinanceKlines({ symbol }),
  ]).then(([ticker24hr, klines]) => {
    return {
      asset,
      lastPrice: Number(ticker24hr.lastPrice),
      priceChangePercent: Number(ticker24hr.priceChangePercent),
      available,
      unavailable,
      ohlc: klines.map(toOhlc),
      icon,
      color: colors[asset],
    };
  });
}
