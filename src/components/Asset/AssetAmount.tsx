import classNames from "classnames";
import { HTMLProps, ReactNode } from "react";
import { AssetId } from "../../lib/assets";
import { roundLength } from "../../lib/round";
import { AssetIcon } from "./AssetIcon";

export function AssetAmount({
  amount,
  assetId = process.env.REACT_APP_CURRENCY as AssetId,
  className,
  maxDigits,
  logo = false,
  children,
  ...props
}: {
  amount: number;
  assetId?: AssetId;
  className?: string;
  maxDigits: number;
  logo?: boolean;
  children?: ReactNode;
} & HTMLProps<HTMLSpanElement>) {
  const rounded = roundLength(amount, maxDigits);
  return (
    <span className={classNames("AssetAmount", className)} {...props}>
      <span className="AssetAmount-content">
        <small className="AssetAmount-assetId">
          {logo ? <AssetIcon className="me-1" assetId={assetId} /> : null}
          {assetId}
        </small>
        <span className="AssetAmount-amount">
          {rounded}
          {children ? (
            <small className="AssetAmount-children ms-1">{children}</small>
          ) : null}
        </span>
      </span>
    </span>
  );
}
