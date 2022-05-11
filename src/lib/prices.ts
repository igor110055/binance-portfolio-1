import { getAssetColor } from "./assets";
import { BinancePrice } from "./binance/prices";

export type PriceData = {
  [assetId: string]: number;
};

export function toPrices(tickerPrices: BinancePrice[]): PriceData {
  if (process.env.REACT_APP_CURRENCY) {
    return tickerPrices.reduce(
      (p, { symbol, price }) => {
        if (
          process.env.REACT_APP_CURRENCY &&
          symbol.endsWith(process.env.REACT_APP_CURRENCY)
        ) {
          const assetId = symbol.replace(process.env.REACT_APP_CURRENCY, "");
          const hasColor = getAssetColor(assetId);
          if (hasColor) {
            p[assetId] = Number(price);
          }
        }
        return p;
      },
      { [process.env.REACT_APP_CURRENCY]: 1 }
    );
  }
  return {};
}
