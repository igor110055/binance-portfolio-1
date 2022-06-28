import "bootstrap/dist/css/bootstrap.min.css";
import { MarketGrid } from "../Market/MarketGrid";
import { PortfolioChart } from "../Portfolio/PortfolioChart";
import { ResponsiveContainer } from "recharts";
import { PortfolioTable } from "../Portfolio/PortfolioTable";
import { Col, Row } from "react-bootstrap";
import { Loader } from "../../common/Loader";
import { useAssets } from "../../contexts/Assets/useAssets";
import { useStrategy } from "../../contexts/Strategy/useStrategy";

export function Dashboard() {
  const [, loading] = useAssets();
  const strategy = useStrategy();
  return (
    <div className="Dashboard">
      <Row className="mb-4">
        <Col lg={3} className="position-relative">
          <div className="Dashboard-chart">
            {loading ? <Loader /> : null}
            <ResponsiveContainer aspect={1}>
              <PortfolioChart />
            </ResponsiveContainer>
          </div>
        </Col>
        <Col lg={9}>
          <PortfolioTable />
        </Col>
      </Row>
      <MarketGrid
        baseAssetIds={strategy.baseAssetIds}
        quoteAssetIds={strategy.quoteAssetIds}
      />
    </div>
  );
}
