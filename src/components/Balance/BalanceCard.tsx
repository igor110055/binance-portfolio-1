import React from "react";
import { Card, Spinner } from "react-bootstrap";
import { useBinance, useBinanceKlines } from "../../hooks/useBinance";
import { Chart } from "../Chart/Chart";

function BalanceCardChart(props: { symbol: string }) {
  const klines = useBinanceKlines(props.symbol, "1d", 30);
  if (klines.loading) {
    return <Spinner animation="grow" />;
  }
  if (!klines.data) {
    throw new Error(`Klines not found for symbol "${props.symbol}".`);
  }
  return <Chart klines={klines.data} />;
}

export function BalanceCard(props: { balance: AccountBalance }) {
  const { tickerPrices } = useBinance();
  const symbol = props.balance.asset + process.env.REACT_APP_CURRENCY;
  const tickerPrice = tickerPrices.find(
    (tickerPrice) => tickerPrice.symbol === symbol
  );

  if (!tickerPrice) {
    throw new Error(`Ticker Price not found for symbol "${symbol}".`);
  }

  return (
    <Card>
      <BalanceCardChart symbol={symbol} />
      <Card.Body>
        <Card.Title>{props.balance.asset}</Card.Title>
        <Card.Text>
          {Number(tickerPrice.price).toFixed(2)}
          <small>{process.env.REACT_APP_CURRENCY}</small>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
