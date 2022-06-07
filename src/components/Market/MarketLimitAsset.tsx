import { Button, Col, Row } from "react-bootstrap";
import { useStrategyWeight } from "../../contexts/Strategy/useStrategy";
import { MarketData } from "../../lib/markets";
import { AssetAmount } from "../Asset/AssetAmount";
import { AssetPrice } from "../Asset/AssetPrice";

export function MarketLimitAsset({ market }: { market: MarketData }) {
  const weight = useStrategyWeight(market.baseAsset.assetId);
  if (weight === undefined) {
    return null;
  }
  return (
    <Row className="g-2">
      {weight.tradeValue < 0 ? (
        <Col className="d-grid text-center">
          <Button variant="danger" disabled={weight.tradeAmount === 0}>
            <AssetAmount
              amount={weight.tradeAmount * -1}
              assetId={market.baseAsset.assetId}
              decimals={6}
            />
          </Button>
          <small className="text-danger">
            <AssetPrice price={market.sell.basePrice} decimals={3} />
          </small>
        </Col>
      ) : (
        <Col className="d-grid text-center">
          <Button variant="success" disabled={weight.tradeAmount === 0}>
            <AssetAmount
              amount={weight.tradeAmount}
              assetId={market.baseAsset.assetId}
              decimals={6}
            />
          </Button>
          <small className="text-success">
            <AssetPrice price={market.buy.basePrice} decimals={3} />
          </small>
        </Col>
      )}
    </Row>
  );
}
