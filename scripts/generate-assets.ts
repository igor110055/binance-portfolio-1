import fs from "fs";
import { resolve } from "path";
import { loadBinancePrices } from "../src/lib/binance/prices";
import { listFilesSync } from "./functions/listFilesSync";
import { IconAsset, loadIconAsset } from "./functions/loadIconAsset";
import { toAssetIds } from "./functions/toAssetIds";

const directoryPath = resolve(".icons");

const pngIcons = listFilesSync(directoryPath);
console.log(`${pngIcons.length} icons`);

const outFile = `src/assets/assets.json`;

loadBinancePrices()
  .then(toAssetIds)
  .then((assetIds) => {
    const loadIconAssets = pngIcons.map(loadIconAsset);
    return Promise.all(loadIconAssets).then((iconAssets) => {
      return assetIds.reduce<{
        [assetId: string]: IconAsset;
      }>((assets, assetId) => {
        const iconAsset = iconAssets.find(
          (color) => color?.assetId === assetId
        );
        if (iconAsset) {
          assets[assetId as string] = iconAsset;
        } else {
          console.log(`No icon for ${assetId}.`);
          assets[assetId as string] = { assetId, color: null, icon: null };
        }
        return assets;
      }, {});
    });
  })
  .then((assets) => {
    console.log(`Done. ${outFile}`);
    const outputString = JSON.stringify(assets, null, 2);
    fs.writeFileSync(outFile, outputString);
  });
