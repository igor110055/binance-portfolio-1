import _ from "lodash";
import React, { useMemo } from "react";
import { Badge, Card, CardProps } from "react-bootstrap";
import { ResponsiveContainer } from "recharts";
import { MarketData } from "../../lib/markets";
import { ChartBollingerBands } from "../Chart/ChartBollingerBands";
import { ChartMACD } from "../Chart/ChartMACD";
import { ChartRSI } from "../Chart/ChartRSI";

export function MarketCard({
  market,
  ...props
}: CardProps & { market: MarketData }) {
  const price = _.last(market.ohlc)?.close;
  const color = useMemo(() => {
    if (market.priceChangePercent > 1) return "success";
    if (market.priceChangePercent < 1) return "danger";
    return undefined;
  }, [market.priceChangePercent]);

  return (
    <Card className="MarketCard" {...props}>
      <ResponsiveContainer height={160}>
        <ChartBollingerBands
          bollingerBands={market.bollingerBands}
          ohlc={market.ohlc}
        />
      </ResponsiveContainer>
      <Card.Body>
        <Card.Title className="d-flex">
          {market.baseAsset.asset}
          <Badge bg={color} className="ms-auto">
            {market.priceChangePercent.toFixed(2)}%
          </Badge>
        </Card.Title>
        <Card.Subtitle>
          <strong className="me-1">{market.quoteAsset.asset}</strong>
          {price?.toFixed(2)}
        </Card.Subtitle>
      </Card.Body>
      <ResponsiveContainer height={80}>
        <ChartMACD data={market.macd} />
      </ResponsiveContainer>
      <ResponsiveContainer height={80}>
        <ChartRSI data={market.rsi} />
      </ResponsiveContainer>
    </Card>
  );
}
