import React, { useMemo } from "react";
import { Card, Spinner } from "react-bootstrap";
import { useBinanceTickerPrice } from "../../hooks/useBinance";

export function BalanceCard(props: { balance: Balance }) {
  const symbol = props.balance.asset + process.env.REACT_APP_CURRENCY;
  const tickerPriceParams = useMemo(() => ({ symbol }), [symbol]);
  const tickerPrice = useBinanceTickerPrice(tickerPriceParams);

  if (tickerPrice.loading) {
    return <Spinner animation="grow" />;
  }

  if (!tickerPrice.data) {
    return null;
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>{props.balance.asset}</Card.Title>
        <Card.Text>
          {Number(tickerPrice.data.price).toFixed(2)}
          <small>{process.env.REACT_APP_CURRENCY}</small>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
