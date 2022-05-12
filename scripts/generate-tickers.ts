import fs from "fs";
import { AssetId, getAssetColor } from "../src/lib/assets";
import { loadBinancePrices } from "../src/lib/binance/prices";

loadBinancePrices()
  .then((tickerPrices) => {
    if (process.env.REACT_APP_CURRENCY) {
      return tickerPrices.reduce(
        (p, { symbol }) => {
          if (
            process.env.REACT_APP_CURRENCY &&
            symbol.endsWith(process.env.REACT_APP_CURRENCY)
          ) {
            const assetId = symbol.replace(
              process.env.REACT_APP_CURRENCY,
              ""
            ) as AssetId;
            const color = getAssetColor(assetId);
            if (color) {
              p.push(assetId);
            }
          }
          return p;
        },
        [process.env.REACT_APP_CURRENCY]
      );
    }
    return [];
  })
  .then((tickers) => {
    const outFile = `src/assets/tickers.json`;
    console.log(`Done. ${outFile}`);
    const outputString = JSON.stringify(tickers, null, 2);
    fs.writeFileSync(outFile, outputString);
  });
