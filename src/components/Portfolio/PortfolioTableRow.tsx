import { ChangeEvent, useCallback, useMemo } from "react";
import { Form } from "react-bootstrap";
import { AssetIcon } from "../Asset/AssetIcon";
import { PortfolioData } from "../../lib/portfolio";
import { StrategyWeight } from "../../hooks/useStrategy";

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

  const targetPlaceholder = useMemo(() => {
    if (weight === undefined) {
      return undefined;
    }
    const rounded = (weight.actualTarget * 100).toFixed(2);
    const roundedNumber = Number(rounded);
    return String(roundedNumber);
  }, [weight]);

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
        {weight === undefined ? null : (weight.current * 100).toFixed(2)}%
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
      <td>
        <Form.Control
          defaultValue={balance.target}
          type="number"
          placeholder={targetPlaceholder}
          size="sm"
          onChange={handleChangeTarget}
        />
      </td>
      <td>{targetPlaceholder ? targetPlaceholder + "%" : null}</td>
    </tr>
  );
}
