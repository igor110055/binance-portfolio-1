import _ from "lodash";
import React from "react";
import { Card } from "react-bootstrap";
import { useOHLCContext } from "../../contexts/useOHLCContext";
import { BalanceChart } from "./BalanceChart";

function BalanceCardPrice() {
  const ohlc = useOHLCContext();
  const latestPrice = _.last(ohlc)?.close;
  return (
    <>
      {latestPrice?.toFixed(2)}
      <small>{process.env.REACT_APP_CURRENCY}</small>
    </>
  );
}

export function BalanceCard(props: { balance: AccountBalance }) {
  return (
    <Card>
      <BalanceChart />
      <Card.Body>
        <Card.Title>{props.balance.asset}</Card.Title>
        <Card.Text>
          <BalanceCardPrice />
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
