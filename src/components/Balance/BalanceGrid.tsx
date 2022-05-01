import React from "react";
import { Col, Row } from "react-bootstrap";
import { BalanceCard } from "./BalanceCard";

export function BalanceGrid(props: { balances: Balance[] }) {
  return (
    <Row xs={1} md={2} xl={4} className="g-4">
      {props.balances.map((balance) => (
        <Col>
          <BalanceCard key={balance.asset} balance={balance} />
        </Col>
      ))}
    </Row>
  );
}
