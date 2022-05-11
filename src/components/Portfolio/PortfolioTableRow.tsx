import { ChangeEvent, useCallback } from "react";
import { Form } from "react-bootstrap";
import { AssetIcon } from "../Asset/AssetIcon";
import { PortfolioData } from "../../lib/portfolio";

export function PortfolioTableRow({
  balance,
  weight,
  onDelete,
  onUpdate,
}: {
  balance: PortfolioData;
  weight?: number;
  onUpdate: (balance: PortfolioData) => void;
  onDelete: () => void;
}) {
  const handleChangeNumber = useCallback(
    (prop: "available" | "unavailable" | "target") => {
      return (event: ChangeEvent<HTMLInputElement>) => {
        onUpdate({
          ...balance,
          [prop]: Number(event.target.value),
        });
      };
    },
    [balance, onUpdate]
  );

  return (
    <tr className="PortfolioTableRow">
      <th>
        <div className="d-flex">
          <AssetIcon assetId={balance.assetId} className="me-1" />
          {balance.assetId}
          <span className="PortfolioTableRow-close ms-auto" onClick={onDelete}>
            ✕
          </span>
        </div>
      </th>
      <td>{weight === undefined ? null : weight.toFixed(2) + "%"}</td>
      <td>
        <Form.Control
          defaultValue={balance.available}
          type="number"
          placeholder="0"
          size="sm"
          onChange={handleChangeNumber("available")}
        />
      </td>
      <td>
        <Form.Control
          defaultValue={balance.target}
          type="number"
          placeholder={
            weight === undefined ? undefined : weight.toFixed(2) + "%"
          }
          size="sm"
          onChange={handleChangeNumber("target")}
        />
      </td>
    </tr>
  );
}
