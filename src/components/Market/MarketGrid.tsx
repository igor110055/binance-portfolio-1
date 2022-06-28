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
};

function byBuyRatio(a: MarketData, b: MarketData) {
  return b.buy.ratio - a.buy.ratio;
}

export function MarketGrid({ baseAssetIds, quoteAssetIds }: MarketGridProps) {
  const strategy = useStrategy();
  const markets = useMarkets(baseAssetIds, quoteAssetIds);
  return (
    <Row xs={2} sm={2} md={2} lg={2} xl={3} className="MarketGrid g-4">
      {markets
        .filter((market) => {
          const tradeValue = getTradeValue(market, strategy);
          return Math.abs(tradeValue) > MINIMUM_TRADE_VALUE;
        })
        .sort(byBuyRatio)
        .map((market) => (
          <Col key={market.symbol}>
            <MarketCard market={market} />
          </Col>
        ))}
    </Row>
  );
}
