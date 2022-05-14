import React from "react";
import { Col, Row } from "react-bootstrap";
import { useMarkets } from "../../hooks/useMarkets";
import { MarketCard } from "./MarketCard";

export function MarketGrid() {
  const markets = useMarkets();

  return (
    <Row xs={1} sm={2} lg={3} xl={4} className="MarketGrid g-4">
      {markets.map((market) => (
        <Col key={market.symbol}>
          <MarketCard market={market} />
        </Col>
      ))}
    </Row>
  );
}
