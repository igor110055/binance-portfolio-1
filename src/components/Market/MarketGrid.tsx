import React from "react";
import { Col, Row } from "react-bootstrap";
import { useMarkets } from "../../hooks/useMarkets";
import { MarketCard } from "./MarketCard";

export function MarketGrid() {
  const markets = useMarkets();

  return (
    <Row lg={2} xl={3} className="MarketGrid g-4">
      {markets.map((market) => (
        <Col key={market.symbol}>
          <MarketCard market={market} />
        </Col>
      ))}
    </Row>
  );
}
