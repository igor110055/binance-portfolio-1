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
        <Col md={3} lg={4} xl={3} className="position-relative">
          <div className="Dashboard-chart">
            {assetsLoading ? <Loader /> : null}
            <ResponsiveContainer aspect={1}>
              <PortfolioChart />
            </ResponsiveContainer>
          </div>
        </Col>
        <Col md={9} lg={8} xl={9}>
          <PortfolioTable />
        </Col>
      </Row>
      <MarketGrid />
    </div>
  );
}
