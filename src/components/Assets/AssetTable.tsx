import { Form, Table } from "react-bootstrap";
import { AssetData } from "../../lib/assets";
import { AssetIcon } from "./AssetIcon";

export function AssetTable({ assets }: { assets: AssetData[] }) {
  const weights = assets.reduce<{ [asset: string]: number }>((w, asset) => {
    w[asset.asset] = (asset.available + asset.unavailable) * asset.lastPrice;
    return w;
  }, {});
  const total = assets.reduce((t, asset) => {
    return t + weights[asset.asset];
  }, 0);
  return (
    <Table className="AssetTable" hover={true}>
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
        {assets.map((asset) => {
          const current = ((weights[asset.asset] / total) * 100).toFixed(2);
          return (
            <tr key={asset.asset}>
              <th>
                <AssetIcon asset={asset} className="me-1" /> {asset.asset}
              </th>
              <td>
                <Form.Control
                  defaultValue={asset.available}
                  type="number"
                  placeholder="0"
                  size="sm"
                />
              </td>
              <td>
                <Form.Control
                  defaultValue={asset.unavailable}
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
