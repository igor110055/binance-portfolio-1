import { useCallback } from "react";
import { Table } from "react-bootstrap";
import { usePortfolio } from "../../contexts/Portfolio/usePortfolio";
import { usePortfolioWeights } from "../../hooks/usePortfolioWeights";
import { PortfolioTableRow } from "./PortfolioTableRow";
import { PortfolioData } from "../../lib/portfolio";
import { AssetDropdown } from "../Asset/AssetDropdown";

export function PortfolioTable() {
  const [portfolio, setPortfolio] = usePortfolio();
  const weights = usePortfolioWeights();

  const handleChange = useCallback(
    (balance: PortfolioData) => (nextBalance: PortfolioData) => {
      setPortfolio((p) => {
        return p.map((prevBalance) => {
          if (prevBalance.assetId === balance.assetId) {
            return nextBalance;
          }
          return prevBalance;
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
          <th colSpan={2}>Current</th>
          <th>Target</th>
        </tr>
      </thead>
      <tbody>
        {portfolio.map((balance) => {
          const weight = weights[balance.assetId];
          return (
            <PortfolioTableRow
              key={balance.assetId}
              balance={balance}
              onChange={handleChange(balance)}
              weight={weight}
            />
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <th>
            <AssetDropdown
              onSelect={(assetId) => {
                if (assetId) {
                  setPortfolio((p) => {
                    return [
                      ...p,
                      {
                        assetId,
                        available: 0,
                        unavailable: 0,
                        target: undefined,
                      },
                    ];
                  });
                }
              }}
            />
          </th>
          <th colSpan={2}></th>
          <th></th>
        </tr>
      </tfoot>
    </Table>
  );
}
