import { ChangeEvent, useCallback } from "react";
import { Form, Spinner } from "react-bootstrap";
import { AssetIcon } from "../Asset/AssetIcon";
import { PortfolioData } from "../../lib/portfolio";

export function PortfolioTableRow({
  balance,
  weight,
  onChange,
}: {
  balance: PortfolioData;
  weight?: number;
  onChange: (balance: PortfolioData) => void;
}) {
  const handleChangeNumber = useCallback(
    (prop: "available" | "unavailable" | "target") => {
      return (event: ChangeEvent<HTMLInputElement>) => {
        onChange({
          ...balance,
          [prop]: Number(event.target.value),
        });
      };
    },
    [balance, onChange]
  );

  return (
    <tr>
      <th>
        <AssetIcon assetId={balance.assetId} className="me-1" />
        {balance.assetId}
      </th>
      <td>
        {weight === undefined ? (
          <Spinner animation="grow" size="sm" />
        ) : (
          weight.toFixed(2) + "%"
        )}
      </td>
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
        {weight === undefined ? null : (
          <Form.Control
            className="form-percentage"
            defaultValue={balance.target}
            type="number"
            placeholder={weight.toFixed(2) + "%"}
            size="sm"
            onChange={handleChangeNumber("target")}
          />
        )}
      </td>
    </tr>
  );
}
