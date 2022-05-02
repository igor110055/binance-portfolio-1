import React from "react";
import { Col, Row, RowProps } from "react-bootstrap";
import { OHLCProvider } from "../../contexts/OHLCProvider";
import { useBalances } from "../../hooks/useBalances";
import { BalanceCard } from "./BalanceCard";

export function BalanceGrid(props: RowProps) {
  const balances = useBalances();

  return (
    <Row xs={1} md={2} xl={4} className="g-4" {...props}>
      {balances.map((balance) => (
        <Col key={balance.asset}>
          <OHLCProvider asset={balance.asset}>
            <BalanceCard balance={balance} />
          </OHLCProvider>
        </Col>
      ))}
    </Row>
  );
}
