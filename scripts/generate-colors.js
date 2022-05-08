const fs = require("fs");
const path = require("path");

const ColorThief = require("colorthief");

// return an ordered list of files in the input dir, with full paths
function listFilesSync(dir) {
  let fileList = [];
  fs.readdirSync(dir).forEach((file) => {
    const dirString = dir.toString();
    const fullPath = path.join(dirString, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      fileList = fileList.concat(listFilesSync(fullPath));
    } else {
      fileList.push(fullPath);
    }
  });
  return fileList;
}

const directoryPath = path.resolve(".icons");

function loadIconColor(pngFile) {
  return ColorThief.getColor(pngFile, 1).then((color) => {
    console.log(pngFile, color);
    return {
      asset: pngFile.replace(directoryPath + "/", "").replace(".png", ""),
      color,
    };
  }, console.warn);
}

const pngIcons = listFilesSync(directoryPath);
console.log(`${pngIcons.length} icons`);

const iconColors = pngIcons.map(loadIconColor);
Promise.all(iconColors).then((colors) => {
  const outFile = `src/assets/colors.json`;
  const output = colors.reduce((results, r) => {
    if (r) {
      const key = r.asset.toUpperCase();
      results[key] = `rgb(${r.color[0]},${r.color[1]},${r.color[2]})`;
    }
    return results;
  }, {});
  const outputString = JSON.stringify(output, null, 2);
  fs.writeFileSync(outFile, outputString);
  console.log(output);
}, console.error);
