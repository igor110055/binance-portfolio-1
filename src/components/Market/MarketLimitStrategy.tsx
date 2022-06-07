import { Button, Col, Row } from "react-bootstrap";
import {
  useStrategy,
  useStrategyWeight,
} from "../../contexts/Strategy/useStrategy";
import { getTradeAmounts, MarketData } from "../../lib/markets";
import { AssetAmount } from "../Asset/AssetAmount";
import { AssetPrice } from "../Asset/AssetPrice";

export function MarketLimitStrategy({ market }: { market: MarketData }) {
  const strategy = useStrategy();
  const weight = useStrategyWeight(market.baseAsset.assetId);
  if (weight === undefined) {
    return null;
  }

  const { baseAmount, quoteAmount } = getTradeAmounts(market, strategy);

  return (
    <Row className="g-2">
      <Col className="d-grid text-center">
        <small>Sell</small>
        <Button variant="danger">
          <AssetAmount
            amount={quoteAmount}
            assetId={market.quoteAsset.assetId}
            decimals={6}
          />
        </Button>
        <small className="text-danger">
          <AssetPrice price={market.buy.quotePrice} decimals={3} />
        </small>
      </Col>
      <Col className="d-grid text-center">
        <small>Buy</small>
        <Button variant="success">
          <AssetAmount
            amount={baseAmount}
            assetId={market.baseAsset.assetId}
            decimals={6}
          />
        </Button>
        <small className="text-success">
          <AssetPrice price={market.buy.basePrice} decimals={3} />
        </small>
      </Col>
    </Row>
  );
}
