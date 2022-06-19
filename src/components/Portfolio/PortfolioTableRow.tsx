import { ChangeEvent, useCallback } from "react";
import { Form } from "react-bootstrap";
import { AssetIcon } from "../Asset/AssetIcon";
import { PortfolioData } from "../../lib/portfolio";
import { AssetAmount } from "../Asset/AssetAmount";
import _ from "lodash";
import { useAsset } from "../../contexts/Assets/useAssets";
import { AssetId } from "../../lib/assets";
import { StrategyWeight } from "../../contexts/Strategy/useStrategy";
import { roundLength } from "../../lib/round";

export function PortfolioTableRow({
  balance,
  weight,
  onDelete,
  onUpdate,
}: {
  balance: PortfolioData;
  weight?: StrategyWeight;
  onUpdate: (balance: PortfolioData) => void;
  onDelete: () => void;
}) {
  const [asset] = useAsset(weight?.assetId);
  const handleChangeAvailable = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onUpdate({
        ...balance,
        available: Number(event.target.value),
      });
    },
    [balance, onUpdate]
  );
  const handleChangeTarget = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onUpdate({
        ...balance,
        target:
          event.target.value === "" ? undefined : Number(event.target.value),
      });
    },
    [balance, onUpdate]
  );

  if (asset === undefined || weight === undefined) {
    return null;
  }

  const percentageTarget = String(_.round(weight.target * 100, 2));

  return (
    <tr className="PortfolioTableRow">
      <th>
        <div className="d-flex">
          <AssetIcon assetId={balance.assetId} className="me-2" />
          {balance.assetId}
          <span className="PortfolioTableRow-close ms-auto" onClick={onDelete}>
            ✕
          </span>
        </div>
      </th>
      <td>{_.round(weight.current * 100, 2) + "%"}</td>
      <td>
        <Form.Control
          defaultValue={balance.available}
          type="number"
          placeholder="0"
          size="sm"
          onChange={handleChangeAvailable}
        />
      </td>
      <td>
        <Form.Control
          defaultValue={balance.target}
          type="number"
          placeholder={percentageTarget}
          size="sm"
          onChange={handleChangeTarget}
        />
      </td>
      <td>{percentageTarget + "%"}</td>
      <td>
        <AssetAmount
          amount={weight.targetAmount}
          assetId={balance.assetId}
          maxDigits={4}
        />
      </td>
      <td className="table-warning">
        <AssetAmount
          amount={weight.tradeAmount}
          assetId={weight.assetId}
          maxDigits={4}
          logo={true}
        />
      </td>
      <td className="table-warning">
        {weight.tradeValue < 0 ? (
          <small className="text-danger">
            {roundLength(asset.limitSell, 5)}
          </small>
        ) : (
          <small className="text-success">
            {roundLength(asset.limitBuy, 5)}
          </small>
        )}
      </td>
      <td className="table-warning">
        <AssetAmount
          amount={
            (weight.tradeValue < 0
              ? weight.tradeAmount * asset.limitSell
              : weight.tradeAmount * asset.limitBuy) * -1
          }
          assetId={process.env.REACT_APP_CURRENCY as AssetId}
          maxDigits={0}
        />
      </td>
    </tr>
  );
}
