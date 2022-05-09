import { ChangeEvent, useCallback, useMemo } from "react";
import { Form, Table } from "react-bootstrap";
import { useAssets } from "../../contexts/useAssets";
import { usePortfolio } from "../../contexts/Portfolio/usePortfolio";
import { AssetIcon } from "../Assets/AssetIcon";

export function PortfolioTable() {
  const [assets] = useAssets();
  const [portfolio, setPortfolio] = usePortfolio();

  const [weights, total] = useMemo(() => {
    return portfolio.reduce<
      [{ [assetId: string]: number | undefined }, number]
    >(
      ([w, t], balance) => {
        const asset = assets.find((a) => a.assetId === balance.assetId);
        if (asset) {
          t += w[balance.assetId] =
            (balance.available + balance.unavailable) * asset.lastPrice;
        }
        return [w, t];
      },
      [{}, 0]
    );
  }, [assets, portfolio]);

  const handleChangeNumber = useCallback(
    (assetId: string, prop: "available" | "unavailable" | "target") =>
      (event: ChangeEvent<HTMLInputElement>) => {
        setPortfolio((p) => {
          return p.map((b) => {
            if (b.assetId === assetId) {
              return {
                ...b,
                [prop]: Number(event.target.value),
              };
            }
            return b;
          });
        });
      },
    [setPortfolio]
  );

  return (
    <Table className="PortfolioTable" hover={true}>
      <thead>
        <tr>
          <th>Asset</th>
          <th>Available</th>
          <th>Locked</th>
          <th>Current</th>
          <th>Target</th>
        </tr>
      </thead>
      <tbody>
        {portfolio.map((balance) => {
          const weight = weights[balance.assetId];
          if (weight) {
            const current = ((weight / total) * 100).toFixed(2);
            return (
              <tr key={balance.assetId}>
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
                    onChange={handleChangeNumber(balance.assetId, "available")}
                  />
                </td>
                <td>
                  <Form.Control
                    defaultValue={balance.unavailable}
                    type="number"
                    placeholder="0"
                    size="sm"
                    onChange={handleChangeNumber(
                      balance.assetId,
                      "unavailable"
                    )}
                  />
                </td>
                <td>{current}%</td>
                <td>
                  <Form.Control
                    className="form-percentage"
                    defaultValue={balance.target}
                    type="number"
                    placeholder={current + "%"}
                    size="sm"
                    onChange={handleChangeNumber(balance.assetId, "target")}
                  />
                </td>
              </tr>
            );
          }
          return null;
        })}
      </tbody>
    </Table>
  );
}
