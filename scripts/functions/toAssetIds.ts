import { AssetId } from "../../src/lib/assets";
import { BinancePrice } from "../../src/lib/binance/prices";

export function toAssetIds(tickerPrices: BinancePrice[]) {
  if (process.env.REACT_APP_CURRENCY) {
    return tickerPrices.reduce(
      (p, { symbol }) => {
        if (
          process.env.REACT_APP_CURRENCY &&
          symbol.endsWith(process.env.REACT_APP_CURRENCY)
        ) {
          const assetId = symbol.replace(process.env.REACT_APP_CURRENCY, "");
          p.push(assetId as AssetId);
        }
        return p;
      },
      [process.env.REACT_APP_CURRENCY] as AssetId[]
    );
  }
  return [];
}
