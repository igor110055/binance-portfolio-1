import { readdirSync, lstatSync, PathLike } from "fs";
import { join } from "path";

// return an ordered list of files in the input dir, with full paths
export function listFilesSync(dir: PathLike) {
  let fileList: string[] = [];
  readdirSync(dir).forEach((file) => {
    const dirString = dir.toString();
    const fullPath = join(dirString, file);
    if (lstatSync(fullPath).isDirectory()) {
      fileList = fileList.concat(listFilesSync(fullPath));
    } else {
      fileList.push(fullPath);
    }
  });
  return fileList;
}
