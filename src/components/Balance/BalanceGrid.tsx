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
              {markets.map((data) => (
                <Col key={data.currency}>
                  <BalanceCard currency={data.currency} data={data} />
                </Col>
              ))}
            </Row>
          </div>
        );
      })}
    </>
  );
}
