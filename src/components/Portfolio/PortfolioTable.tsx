import { useCallback, useMemo } from "react";
import { Table } from "react-bootstrap";
import { usePortfolio } from "../../contexts/Portfolio/usePortfolio";
import { useStrategy } from "../../hooks/useStrategy";
import { PortfolioTableRow } from "./PortfolioTableRow";
import { PortfolioData } from "../../lib/portfolio";
import { AssetDropdown } from "../Asset/AssetDropdown";
import { AssetId } from "../../lib/assets";

export function PortfolioTable() {
  const [portfolio, setPortfolio] = usePortfolio();
  const strategy = useStrategy();

  const handleCreate = useCallback(
    (assetId: AssetId | null) => {
      if (assetId) {
        setPortfolio((p) => {
          return [
            ...p,
            {
              assetId,
              available: 0,
              target: undefined,
            },
          ];
        });
      }
    },
    [setPortfolio]
  );

  const handleUpdate = useCallback(
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

  const handleDelete = useCallback(
    (balance: PortfolioData) => () => {
      setPortfolio((p) => {
        return p.filter(
          (prevBalance) => prevBalance.assetId !== balance.assetId
        );
      });
    },
    [setPortfolio]
  );

  const assetIds = useMemo(() => {
    return portfolio.map((balance) => balance.assetId);
  }, [portfolio]);

  const targetUnit = useMemo(() => {
    if (strategy.actualTargetTotal === 100) {
      return "%";
    }
    if (strategy.actualTargetTotal === 1000) {
      return "‰";
    }
    if (strategy.actualTargetTotal === 10000) {
      return "‱";
    }
    return `/${strategy.actualTargetTotal}`;
  }, [strategy.actualTargetTotal]);

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
          const weight = strategy.weights.find(
            (w) => w.assetId === balance.assetId
          );
          return (
            <PortfolioTableRow
              key={balance.assetId}
              balance={balance}
              onUpdate={handleUpdate(balance)}
              onDelete={handleDelete(balance)}
              weight={weight}
            />
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <th>
            <AssetDropdown disabled={assetIds} onSelect={handleCreate} />
          </th>
          <th colSpan={2}></th>
          <th colSpan={2}>{targetUnit}</th>
        </tr>
      </tfoot>
    </Table>
  );
}
