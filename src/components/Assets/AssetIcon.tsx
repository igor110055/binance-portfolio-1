import classNames from "classnames";
import React, { ImgHTMLAttributes } from "react";
import { AssetData } from "../../lib/assets";

export function AssetIcon({
  asset,
  className,
  ...props
}: ImgHTMLAttributes<HTMLImageElement> & { asset: AssetData }) {
  return (
    <img
      {...props}
      className={classNames("icon", className)}
      alt={asset.asset}
      src={asset.icon}
    />
  );
}
