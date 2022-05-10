import { ChangeEvent, useCallback } from "react";
import { Form, Spinner } from "react-bootstrap";
import { AssetIcon } from "../Assets/AssetIcon";
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
          defaultValue={balance.unavailable}
          type="number"
          placeholder="0"
          size="sm"
          onChange={handleChangeNumber("unavailable")}
        />
      </td>
      <td>
        {weight ? (
          weight.toFixed(2) + "%"
        ) : (
          <Spinner animation="grow" size="sm" />
        )}
      </td>
      <td>
        {weight ? (
          <Form.Control
            className="form-percentage"
            defaultValue={balance.target}
            type="number"
            placeholder={weight.toFixed(2) + "%"}
            size="sm"
            onChange={handleChangeNumber("target")}
          />
        ) : (
          <Spinner animation="grow" size="sm" />
        )}
      </td>
    </tr>
  );
}
