import { useCallback, useMemo } from "react";
import { Table } from "react-bootstrap";
import { usePortfolio } from "../../contexts/Portfolio/usePortfolio";
import { PortfolioTableRow } from "./PortfolioTableRow";
import { PortfolioData } from "../../lib/portfolio";
import { AssetDropdown } from "../Asset/AssetDropdown";
import { AssetId } from "../../lib/assets";
import { AssetAmount } from "../Asset/AssetAmount";
import {
  StrategyWeight,
  useStrategy,
} from "../../contexts/Strategy/useStrategy";

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

  const handleSort = useCallback(
    (key: keyof StrategyWeight) => () => {
      setPortfolio((p) => {
        return [
          ...p.sort((a, b) => {
            const aWeight = strategy.weights.find(
              (w) => w.assetId === a.assetId
            );
            const bWeight = strategy.weights.find(
              (w) => w.assetId === b.assetId
            );
            if (aWeight && bWeight) {
              if (
                typeof aWeight[key] === "string" &&
                typeof bWeight[key] === "string"
              ) {
                return (aWeight[key] as string).localeCompare(
                  bWeight[key] as string
                );
              }
              return (
                Math.abs(Number(bWeight[key])) - Math.abs(Number(aWeight[key]))
              );
            }
            return 0;
          }),
        ];
      });
    },
    [setPortfolio, strategy.weights]
  );

  const assetIds = useMemo(() => {
    return portfolio.map((balance) => balance.assetId);
  }, [portfolio]);

  const targetUnit = useMemo(() => {
    if (strategy.totalTarget === 100) {
      return "%";
    }
    if (strategy.totalTarget === 1000) {
      return "???";
    }
    if (strategy.totalTarget === 10000) {
      return "???";
    }
    return `/${strategy.totalTarget}`;
  }, [strategy.totalTarget]);

  return (
    <Table className="PortfolioTable" hover={true}>
      <thead>
        <tr>
          <th
            className="table-sort"
            onClick={handleSort("assetId")}
            colSpan={2}
          >
            Asset
          </th>
          <th
            className="table-sort table-warning"
            onClick={handleSort("targetValue")}
            colSpan={1}
          >
            Allocation
          </th>
          <th
            className="table-sort"
            onClick={handleSort("currentValue")}
            colSpan={3}
          >
            Current
          </th>
          <th
            className="table-sort table-secondary"
            onClick={handleSort("tradeValue")}
            colSpan={3}
          >
            Target
          </th>
          <th className="table-sort" onClick={handleSort("tradeValue")}>
            Limit
          </th>
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
          <th colSpan={2}>
            <AssetDropdown disabled={assetIds} onSelect={handleCreate} />
          </th>
          <th className="table-warning">{targetUnit}</th>
          <th colSpan={2}></th>
          <th>
            <AssetAmount
              assetId={process.env.REACT_APP_CURRENCY as AssetId}
              amount={strategy.totalAmount}
              maxDigits={4}
            />
          </th>
          <th colSpan={3} className="table-secondary"></th>
          <th></th>
        </tr>
      </tfoot>
    </Table>
  );
}
