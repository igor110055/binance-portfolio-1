import React from "react";
import { Col, Row } from "react-bootstrap";
import { useMarketsContext } from "../../contexts/useMarketsContext";
import { BalanceCard } from "./BalanceCard";

export function BalanceGrid() {
  const data = useMarketsContext();

  return (
    <>
      {data.map(({ asset, markets }) => {
        return (
          <div key={asset}>
            <h2>{asset}</h2>
            <Row xs={1} md={2} xl={4} className="g-4">
              {markets.map(({ currency, ohlc }) => (
                <Col key={currency}>
                  <BalanceCard currency={currency} ohlc={ohlc} />
                </Col>
              ))}
            </Row>
          </div>
        );
      })}
    </>
  );
}
