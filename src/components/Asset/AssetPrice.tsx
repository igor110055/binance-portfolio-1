import classNames from "classnames";
import _ from "lodash";
import { AssetId } from "../../lib/assets";
import { AssetIcon } from "./AssetIcon";

export function AssetPrice({
  price,
  assetId = process.env.REACT_APP_CURRENCY as AssetId,
  className,
  decimals = 6,
  logo = false,
}: {
  price: number;
  assetId?: AssetId;
  className?: string;
  decimals?: number;
  logo?: boolean;
}) {
  const rounded = _.round(price, decimals);
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
