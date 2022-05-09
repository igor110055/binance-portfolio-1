import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { MarketGrid } from "../Market/MarketGrid";
import { MarketsProvider } from "../../contexts/MarketsProvider";
import { ChartAssetsPie } from "../Chart/ChartAssetsPie";
import { useAssets } from "../../contexts/useAssets";
import { ResponsiveContainer } from "recharts";
import { PortfolioTable } from "./PortfolioTable";
import { Col, Row } from "react-bootstrap";
import { Loader } from "../../common/Loader";

export function PortfolioDashboard() {
  const assets = useAssets();
  return (
    <div className="PortfolioDashboard">
      <Row className="mb-4">
        <Col md={4} className="position-relative">
          <div className="PortfolioDashboard-loader">
            {assets.loading ? <Loader /> : null}
            <ResponsiveContainer
              className="PortfolioDashboard-chart"
              aspect={1}
            >
              <ChartAssetsPie assets={assets.data} />
            </ResponsiveContainer>
          </div>
        </Col>
        <Col md={8}>
          <PortfolioTable assets={assets.data} />
        </Col>
      </Row>
      <MarketsProvider>
        <MarketGrid />
      </MarketsProvider>
    </div>
  );
}
