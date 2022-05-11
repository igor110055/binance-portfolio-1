import "bootstrap/dist/css/bootstrap.min.css";
import { MarketGrid } from "../Market/MarketGrid";
import { PortfolioChart } from "./PortfolioChart";
import { ResponsiveContainer } from "recharts";
import { PortfolioTable } from "./PortfolioTable";
import { Col, Row } from "react-bootstrap";
import { Loader } from "../../common/Loader";
import { useAssets } from "../../contexts/Assets/useAssets";

export function PortfolioDashboard() {
  const [, assetsLoading] = useAssets();
  return (
    <div className="PortfolioDashboard">
      <Row className="mb-4">
        <Col md={4} className="position-relative">
          <div className="PortfolioDashboard-loader">
            {assetsLoading ? <Loader /> : null}
            <ResponsiveContainer
              className="PortfolioDashboard-chart"
              aspect={1}
            >
              <PortfolioChart />
            </ResponsiveContainer>
          </div>
        </Col>
        <Col md={8}>
          <PortfolioTable />
        </Col>
      </Row>
      <MarketGrid />
    </div>
  );
}
