import React from "react";
import { Col, Row } from "react-bootstrap";
import { useMarketsContext } from "../../contexts/useMarketsContext";
import { MarketCard } from "./MarketCard";

export function MarketGrid() {
  const markets = useMarketsContext();

  return (
    <Row xs={1} sm={2} md={3} lg={4} xl={6} className="MarketGrid g-4">
      {markets.map((data) => (
        <Col key={data.baseAsset + data.quoteAsset}>
          <MarketCard data={data} />
        </Col>
      ))}
    </Row>
  );
}
