import classNames from "classnames";
import React, { ImgHTMLAttributes } from "react";
import { getAssetIcon } from "../../lib/assets";

export function AssetIcon({
  assetId,
  className,
  ...props
}: ImgHTMLAttributes<HTMLImageElement> & { assetId: string }) {
  const icon = getAssetIcon(assetId);
  return (
    <img
      {...props}
      className={classNames("icon", className)}
      alt={assetId}
      src={icon}
    />
  );
}
