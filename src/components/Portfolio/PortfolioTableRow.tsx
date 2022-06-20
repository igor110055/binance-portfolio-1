import { ChangeEvent, useCallback, useMemo } from "react";
import { Form } from "react-bootstrap";
import { AssetIcon } from "../Asset/AssetIcon";
import { PortfolioData } from "../../lib/portfolio";
import { AssetAmount } from "../Asset/AssetAmount";
import _ from "lodash";
import { useAsset } from "../../contexts/Assets/useAssets";
import { AssetId } from "../../lib/assets";
import { StrategyWeight } from "../../contexts/Strategy/useStrategy";

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

  const tradeValueColor = useMemo(() => {
    if (weight) {
      if (weight.tradeValue > 0) return "table-success";
      if (weight.tradeValue < 0) return "table-danger";
    }
    return undefined;
  }, [weight]);

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
      <td>
        <AssetAmount
          amount={asset.lastPrice}
          assetId={process.env.REACT_APP_CURRENCY as AssetId}
          maxDigits={4}
        />
      </td>
      <td className="table-warning">
        <Form.Control
          defaultValue={balance.target}
          type="number"
          placeholder={percentageTarget}
          size="sm"
          onChange={handleChangeTarget}
        />
      </td>
      <td>
        <Form.Control
          defaultValue={balance.available}
          type="number"
          placeholder="0"
          size="sm"
          onChange={handleChangeAvailable}
        />
      </td>
      <td>{_.round(weight.current * 100, 2) + "%"}</td>
      <td>
        <AssetAmount
          amount={balance.available * asset.lastPrice}
          assetId={process.env.REACT_APP_CURRENCY as AssetId}
          maxDigits={4}
        />
      </td>
      <td className="table-secondary">
        <AssetAmount
          amount={weight.targetAmount}
          assetId={balance.assetId}
          maxDigits={4}
        />
      </td>
      <td className="table-secondary">{percentageTarget + "%"}</td>
      <td className="table-secondary">
        <AssetAmount
          amount={weight.targetAmount * asset.lastPrice}
          assetId={process.env.REACT_APP_CURRENCY as AssetId}
          maxDigits={4}
        />
      </td>
      <td className={tradeValueColor}>
        <AssetAmount
          amount={Math.abs(weight.tradeAmount)}
          assetId={balance.assetId}
          maxDigits={4}
        />
      </td>
      <td className={tradeValueColor}>
        <AssetAmount
          amount={Math.abs(weight.tradeValue)}
          assetId={process.env.REACT_APP_CURRENCY as AssetId}
          maxDigits={4}
        />
      </td>
    </tr>
  );
}
