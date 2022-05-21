import "bootstrap/dist/css/bootstrap.min.css";
import { MarketGrid } from "../Market/MarketGrid";
import { PortfolioChart } from "../Portfolio/PortfolioChart";
import { ResponsiveContainer } from "recharts";
import { PortfolioTable } from "../Portfolio/PortfolioTable";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { Loader } from "../../common/Loader";
import { useAssets } from "../../contexts/Assets/useAssets";
import { useStrategy } from "../../hooks/useStrategy";

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
      <Tabs
        defaultActiveKey="assets"
        id="Dashboard-markets"
        mountOnEnter={true}
        className="mb-4"
        variant="pills"
      >
        <Tab eventKey="assets" title="Assets">
          <MarketGrid sort="sell" />
        </Tab>
        <Tab eventKey="strategy" title="Strategy">
          <MarketGrid
            baseAssetIds={strategy.baseAssetIds}
            quoteAssetIds={strategy.quoteAssetIds}
            sort="buy"
          />
        </Tab>
      </Tabs>
    </div>
  );
}
