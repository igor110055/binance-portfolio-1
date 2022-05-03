import React, { useMemo } from "react";
import { Col, Row, RowProps } from "react-bootstrap";
import { useBalances } from "../../hooks/useBalances";
import { BalanceCard } from "./BalanceCard";

export function BalanceGrid(props: RowProps) {
  const balances = useBalances();
  const assets = useMemo(
    () => balances.map((balance) => balance.asset),
    [balances]
  );

  return (
    <Row xs={1} md={2} xl={4} className="g-4" {...props}>
      {assets.map((asset) => {
        const currencies = assets.filter((currency) => currency !== asset);
        return currencies.map((currency) => (
          <Col key={asset}>
            <BalanceCard asset={asset} currency={currency} />
          </Col>
        ));
      })}
    </Row>
  );
}
