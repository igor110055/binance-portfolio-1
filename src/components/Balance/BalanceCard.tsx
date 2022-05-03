import _ from "lodash";
import React from "react";
import { Card } from "react-bootstrap";
import { BalanceChart } from "./BalanceChart";

function BalanceCardPrice(props: { price?: number; currency: string }) {
  return (
    <>
      {props.price?.toFixed(2)}
      <small>{props.currency}</small>
    </>
  );
}

export function BalanceCard(props: { currency: string; ohlc: OHLCData[] }) {
  const price = _.last(props.ohlc)?.close;
  return (
    <Card>
      <BalanceChart ohlc={props.ohlc} />
      <Card.Body>
        <Card.Title>
          <BalanceCardPrice price={price} currency={props.currency} />
        </Card.Title>
      </Card.Body>
    </Card>
  );
}
