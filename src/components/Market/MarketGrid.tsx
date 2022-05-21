import { Col, Row } from "react-bootstrap";
import { useMarkets } from "../../hooks/useMarkets";
import { AssetId } from "../../lib/assets";
import { MarketData } from "../../lib/markets";
import { MarketCard } from "./MarketCard";

export type MarketGridProps = {
  baseAssetIds?: AssetId[];
  quoteAssetIds?: AssetId[];
  sort: "buy" | "sell";
};

function byRsiBuy(a: MarketData, b: MarketData) {
  return a.rsi[a.rsi.length - 1] - b.rsi[b.rsi.length - 1];
}

function byRsiSell(a: MarketData, b: MarketData) {
  return b.rsi[b.rsi.length - 1] - a.rsi[a.rsi.length - 1];
}

export function MarketGrid({
  baseAssetIds,
  quoteAssetIds,
  sort,
}: MarketGridProps) {
  const markets = useMarkets(baseAssetIds, quoteAssetIds);
  return (
    <Row xs={2} md={3} xl={4} className="MarketGrid g-4">
      {markets.sort(sort === "buy" ? byRsiBuy : byRsiSell).map((market) => (
        <Col key={market.symbol}>
          <MarketCard market={market} />
        </Col>
      ))}
    </Row>
  );
}
