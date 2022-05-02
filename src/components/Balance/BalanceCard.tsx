import _ from "lodash";
import React from "react";
import { Card } from "react-bootstrap";
import { useOHLC } from "../../contexts/useOHLCContext";
import { BalanceChart } from "./BalanceChart";

function BalanceCardPrice(props: { asset: string }) {
  const ohlc = useOHLC(props.asset);
  const latestPrice = _.last(ohlc)?.close;
  return (
    <>
      {latestPrice?.toFixed(2)}
      <small>{process.env.REACT_APP_CURRENCY}</small>
    </>
  );
}

export function BalanceCard(props: { asset: string }) {
  return (
    <Card>
      <BalanceChart asset={props.asset} />
      <Card.Body>
        <Card.Title>{props.asset}</Card.Title>
        <Card.Text>
          <BalanceCardPrice asset={props.asset} />
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
