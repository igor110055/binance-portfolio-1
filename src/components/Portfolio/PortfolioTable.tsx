import { useMemo } from "react";
import { Form, Table } from "react-bootstrap";
import { useAssets } from "../../contexts/useAssets";
import { usePortfolio } from "../../contexts/Portfolio/usePortfolio";
import { AssetIcon } from "../Assets/AssetIcon";

export function PortfolioTable() {
  const [assets] = useAssets();
  const [portfolio] = usePortfolio();

  const [weights, total] = useMemo(() => {
    return portfolio.reduce<[{ [assetId: string]: number }, number]>(
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
          const current = ((weights[balance.assetId] / total) * 100).toFixed(2);
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
                />
              </td>
              <td>
                <Form.Control
                  defaultValue={balance.unavailable}
                  type="number"
                  placeholder="0"
                  size="sm"
                />
              </td>
              <td>{current}%</td>
              <td>
                <Form.Control
                  type="number"
                  placeholder={current + "%"}
                  size="sm"
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
