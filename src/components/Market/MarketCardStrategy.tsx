import { Button, Col, Row } from "react-bootstrap";
import {
  useStrategy,
  useStrategyWeight,
} from "../../contexts/Strategy/useStrategy";
import { getTradeAmounts, MarketData } from "../../lib/markets";
import { AssetAmount } from "../Asset/AssetAmount";
import { AssetPrice } from "../Asset/AssetPrice";

export function MarketCardStrategy({
  exchange,
  market,
}: {
  market: MarketData;
  exchange: boolean;
}) {
  const strategy = useStrategy();
  const weight = useStrategyWeight(market.baseAsset.assetId);
  if (weight === undefined) {
    return null;
  }

  const { baseAmount, quoteAmount } = getTradeAmounts(market, strategy);

  if (exchange) {
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

  return (
    <Row className="g-2">
      {weight.tradeValue < 0 ? (
        <Col className="d-grid text-center">
          <Button variant="danger">
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
          <Button variant="success">
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
