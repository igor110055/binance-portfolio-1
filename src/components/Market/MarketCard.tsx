import _ from "lodash";
import React from "react";
import { Card } from "react-bootstrap";
import { ResponsiveContainer } from "recharts";
import { MarketData } from "../../contexts/useMarketsContext";
import { ChartBollingerPercentB } from "../Chart/ChartBollingerPercentB";
import { MarketChart } from "./MarketChart";

export function MarketCard(props: { data: MarketData }) {
  const price = _.last(props.data.ohlc)?.close;
  return (
    <Card className="MarketCard">
      <MarketChart data={props.data} />
      <Card.Body>
        <Card.Title>{props.data.asset}</Card.Title>
        <Card.Subtitle>
          <strong className="me-1">{props.data.currency}</strong>
          {price?.toFixed(2)}
        </Card.Subtitle>
      </Card.Body>
      <ResponsiveContainer height={80}>
        <ChartBollingerPercentB data={props.data.bollingerBands} />
      </ResponsiveContainer>
    </Card>
  );
}
