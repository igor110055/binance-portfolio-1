import "bootstrap/dist/css/bootstrap.min.css";
import { MarketGrid } from "../Market/MarketGrid";
import { PortfolioChart } from "../Portfolio/PortfolioChart";
import { ResponsiveContainer } from "recharts";
import { PortfolioTable } from "../Portfolio/PortfolioTable";
import { Col, Row } from "react-bootstrap";
import { Loader } from "../../common/Loader";
import { useAssets } from "../../contexts/Assets/useAssets";

export function Dashboard() {
  const [, assetsLoading] = useAssets();
  return (
    <div className="Dashboard">
      <Row className="mb-4">
        <Col md={4} className="position-relative">
          <div className="Dashboard-chart">
            {assetsLoading ? <Loader /> : null}
            <ResponsiveContainer aspect={1}>
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
