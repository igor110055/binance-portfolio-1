import React, { useMemo } from "react";
import { Col, Row, RowProps } from "react-bootstrap";
import { useBinance } from "../../hooks/useBinance";
import { BalanceCard } from "./BalanceCard";

export function BalanceGrid(props: RowProps) {
  const { account } = useBinance();

  const balances = useMemo(
    () =>
      account.balances.filter(
        (balance) =>
          (Number(balance.free) > 0 || Number(balance.locked) > 0) &&
          !balance.asset.startsWith("LD") &&
          balance.asset !== process.env.REACT_APP_CURRENCY
      ),
    [account.balances]
  );

  return (
    <Row xs={1} md={2} xl={4} className="g-4" {...props}>
      {balances.map((balance) => (
        <Col key={balance.asset}>
          <BalanceCard balance={balance} />
        </Col>
      ))}
    </Row>
  );
}
