import classNames from "classnames";
import { AssetId } from "../../lib/assets";
import { roundLength } from "../../lib/round";
import { AssetIcon } from "./AssetIcon";

export function AssetPrice({
  price,
  assetId = process.env.REACT_APP_CURRENCY as AssetId,
  className,
  maxDigits,
  logo = false,
}: {
  price: number;
  assetId?: AssetId;
  className?: string;
  maxDigits: number;
  logo?: boolean;
}) {
  const rounded = roundLength(price, maxDigits);
  return (
    <span className={classNames("AssetPrice", className)}>
      <small className="me-1">
        {logo ? <AssetIcon className="me-1" assetId={assetId} /> : null}
        {assetId}
      </small>
      <strong>{rounded}</strong>
    </span>
  );
}
