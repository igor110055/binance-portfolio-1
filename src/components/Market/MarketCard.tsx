import _ from "lodash";
import React, { useMemo } from "react";
import { Badge, Card } from "react-bootstrap";
import { ResponsiveContainer } from "recharts";
import { MarketData } from "../../lib/markets";
import { ChartBollingerBands } from "../Chart/ChartBollingerBands";
import { ChartMACD } from "../Chart/ChartMACD";
import { ChartRSI } from "../Chart/ChartRSI";

export function MarketCard(props: { data: MarketData }) {
  const price = _.last(props.data.ohlc)?.close;
  const color = useMemo(() => {
    if (props.data.score > 1) return "success";
    if (props.data.score < 1) return "danger";
    return undefined;
  }, [props.data.score]);
  return (
    <Card className="MarketCard">
      <ResponsiveContainer className="MarketChart" height={160}>
        <ChartBollingerBands
          bollingerBands={props.data.bollingerBands}
          ohlc={props.data.ohlc}
        />
      </ResponsiveContainer>
      <Card.Body>
        <Card.Title className="d-flex">
          {props.data.baseAsset}
          <Badge bg={color} className="ms-auto">
            {props.data.score.toFixed(2)}%
          </Badge>
        </Card.Title>
        <Card.Subtitle>
          <strong className="me-1">{props.data.quoteAsset}</strong>
          {price?.toFixed(2)}
        </Card.Subtitle>
      </Card.Body>
      <ResponsiveContainer height={80}>
        <ChartMACD data={props.data.macd} />
      </ResponsiveContainer>
      <ResponsiveContainer height={80}>
        <ChartRSI data={props.data.rsi} />
      </ResponsiveContainer>
    </Card>
  );
}
