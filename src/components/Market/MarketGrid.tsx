import { Col, Row } from "react-bootstrap";
import { useMarkets } from "../../hooks/useMarkets";
import { AssetId } from "../../lib/assets";
import { MarketData } from "../../lib/markets";
import { MarketCard } from "./MarketCard";

export type MarketGridProps = {
  baseAssetIds?: AssetId[];
  quoteAssetIds?: AssetId[];
  sort: "buy" | "sell";
  exchange: boolean;
};

function byBuyRatio(a: MarketData, b: MarketData) {
  return a.buy.ratio - b.buy.ratio;
}

function bySellRatio(a: MarketData, b: MarketData) {
  return b.sell.ratio - a.sell.ratio;
}

export function MarketGrid({
  baseAssetIds,
  quoteAssetIds,
  sort,
  exchange,
}: MarketGridProps) {
  const markets = useMarkets(baseAssetIds, quoteAssetIds);
  return (
    <Row xs={2} md={3} xl={4} className="MarketGrid g-4">
      {markets.sort(sort === "buy" ? byBuyRatio : bySellRatio).map((market) => (
        <Col key={market.symbol}>
          <MarketCard exchange={exchange} market={market} />
        </Col>
      ))}
    </Row>
  );
}
