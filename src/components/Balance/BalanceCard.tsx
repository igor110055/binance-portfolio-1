import _ from "lodash";
import React from "react";
import { Card } from "react-bootstrap";
import { useCrossOHLC } from "../../contexts/useOHLCContext";
import { BalanceChart } from "./BalanceChart";

function BalanceCardPrice(props: { price?: number; currency: string }) {
  return (
    <>
      {props.price?.toFixed(2)}
      <small>{props.currency}</small>
    </>
  );
}

export function BalanceCard(props: { asset: string; currency: string }) {
  const ohlc = useCrossOHLC(props.asset, props.currency);
  const price = _.last(ohlc)?.close;
  return (
    <Card>
      <BalanceChart ohlc={ohlc} />
      <Card.Body>
        <Card.Title>
          {props.asset}
          <small>-{props.currency}</small>
        </Card.Title>
        <Card.Text>
          <BalanceCardPrice price={price} currency={props.currency} />
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
