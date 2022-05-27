import { resolve } from "path";
import { getPalette } from "colorthief";

export type IconAsset = {
  assetId: string;
  color: string | null;
  icon: string | null;
};

const directoryPath = resolve(".icons");

export function loadIconAsset(icon: string): Promise<IconAsset> {
  return getPalette(icon, 5).then((palette: [number, number, number][]) => {
    const iconName = icon.replace(directoryPath + "/", "").replace(".png", "");
    const assetId = iconName.toUpperCase();
    if (palette && palette.length > 0) {
      const color =
        palette.find(
          (color: [number, number, number]) =>
            color[0] !== color[1] || color[0] !== color[2]
        ) || palette[0];
      return {
        assetId,
        color: `rgb(${color[0]},${color[1]},${color[2]})`,
        icon: `/icons/${iconName}.svg`,
      };
    }
    console.log(`No palette for ${assetId}.`);
    return {
      assetId,
      color: null,
      icon,
    };
  }, console.warn);
}
