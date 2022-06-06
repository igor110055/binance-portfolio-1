import { Col, Row } from "react-bootstrap";
import { useMarkets } from "../../hooks/useMarkets";
import { AssetId } from "../../lib/assets";
import { MarketData } from "../../lib/markets";
import { MarketCard } from "./MarketCard";

export type MarketGridProps = {
  baseAssetIds?: AssetId[];
  quoteAssetIds?: AssetId[];
  exchange: boolean;
};

function byBuyRatio(a: MarketData, b: MarketData) {
  return a.buy.ratio - b.buy.ratio;
}

function bySellRatio(a: MarketData, b: MarketData) {
  return a.sell.ratio - b.sell.ratio;
}

export function MarketGrid({
  baseAssetIds,
  quoteAssetIds,
  exchange,
}: MarketGridProps) {
  const markets = useMarkets(baseAssetIds, quoteAssetIds);
  return (
    <Row xs={2} md={3} xl={4} className="MarketGrid g-4">
      {markets.sort(exchange ? byBuyRatio : bySellRatio).map((market) => (
        <Col key={market.symbol}>
          <MarketCard exchange={exchange} market={market} />
        </Col>
      ))}
    </Row>
  );
}
