import { Col, Row } from "react-bootstrap";
import { useStrategy } from "../../contexts/Strategy/useStrategy";
import { useMarkets } from "../../hooks/useMarkets";
import { AssetId } from "../../lib/assets";
import { getTradeValue, MarketData } from "../../lib/markets";
import { MarketCard } from "./MarketCard";

const MINIMUM_TRADE_VALUE = 20;

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
  const strategy = useStrategy();
  const markets = useMarkets(baseAssetIds, quoteAssetIds);
  return (
    <Row xs={2} sm={2} md={2} lg={2} xl={3} className="MarketGrid g-4">
      {markets
        .filter((market) => {
          if (exchange) {
            const tradeValue = getTradeValue(market, strategy);
            return Math.abs(tradeValue) > MINIMUM_TRADE_VALUE;
          }
          return true;
        })
        .sort(exchange ? byBuyRatio : bySellRatio)
        .map((market) => (
          <Col key={market.symbol}>
            <MarketCard exchange={exchange} market={market} />
          </Col>
        ))}
    </Row>
  );
}
