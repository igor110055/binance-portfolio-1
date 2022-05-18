import classNames from "classnames";
import _ from "lodash";
import { AssetId } from "../../lib/assets";
import { AssetIcon } from "./AssetIcon";

export function AssetAmount({
  amount,
  assetId,
  className,
  decimals,
  logo,
}: {
  amount: number;
  assetId: AssetId;
  className?: string;
  decimals: number;
  logo?: boolean;
}) {
  const rounded = _.round(amount, decimals);
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
