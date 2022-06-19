import classNames from "classnames";
import { AssetId } from "../../lib/assets";
import { roundLength } from "../../lib/round";
import { AssetIcon } from "./AssetIcon";

export function AssetAmount({
  amount,
  assetId = process.env.REACT_APP_CURRENCY as AssetId,
  className,
  maxDigits,
  logo = false,
}: {
  amount: number;
  assetId?: AssetId;
  className?: string;
  maxDigits: number;
  logo?: boolean;
}) {
  const rounded = roundLength(amount, maxDigits);
  return (
    <span className={classNames("AssetAmount", className)}>
      <span className="AssetAmount-content">
        <small>
          {logo ? <AssetIcon className="me-1" assetId={assetId} /> : null}
          {assetId}
        </small>
        {rounded}
      </span>
    </span>
  );
}
