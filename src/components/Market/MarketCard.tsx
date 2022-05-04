import _ from "lodash";
import React from "react";
import { Card } from "react-bootstrap";
import { ResponsiveContainer } from "recharts";
import { MarketData } from "../../contexts/useMarketsContext";
import { ChartBollingerBands } from "../Chart/ChartBollingerBands";
import { ChartBollingerPercentB } from "../Chart/ChartBollingerPercentB";
import { ChartMACD } from "../Chart/ChartMACD";
import { ChartRSI } from "../Chart/ChartRSI";

export function MarketCard(props: { data: MarketData }) {
  const price = _.last(props.data.ohlc)?.close;
  return (
    <Card className="MarketCard">
      <ResponsiveContainer className="MarketChart" height={160}>
        <ChartBollingerBands data={props.data} />
      </ResponsiveContainer>
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
      <ResponsiveContainer height={80}>
        <ChartMACD data={props.data.macd} />
      </ResponsiveContainer>
      <ResponsiveContainer height={80}>
        <ChartRSI data={props.data.rsi} />
      </ResponsiveContainer>
    </Card>
  );
}
