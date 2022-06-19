import { Button, Col, Row } from "react-bootstrap";
import {
  useStrategy,
  useStrategyWeight,
} from "../../contexts/Strategy/useStrategy";
import { AssetId } from "../../lib/assets";
import { getTradeAmounts, MarketData } from "../../lib/markets";
import { AssetAmount } from "../Asset/AssetAmount";
import { AssetIcon } from "../Asset/AssetIcon";
import { AssetPrice } from "../Asset/AssetPrice";

export function MarketLimitStrategy({ market }: { market: MarketData }) {
  const strategy = useStrategy();
  const weight = useStrategyWeight(market.baseAsset.assetId);
  if (weight === undefined) {
    return null;
  }

  const { baseAmount, quoteAmount, tradeValue } = getTradeAmounts(
    market,
    strategy
  );

  return (
    <Row className="g-2">
      <Col className="d-grid text-center">
        <small>Sell</small>
        <Button variant="danger">
          <AssetAmount
            amount={quoteAmount}
            assetId={market.quoteAsset.assetId}
            maxDigits={4}
          />
        </Button>
        <small className="text-danger">
          <AssetPrice price={market.buy.quotePrice} maxDigits={4} />
        </small>
      </Col>
      <Col className="text-center px-0">
        <small className="d-block mt-3 mb-2">
          <AssetIcon assetId={market.quoteAsset.assetId} />
          &nbsp;&rarr;&nbsp;
          <AssetIcon assetId={market.baseAsset.assetId} />
        </small>
        <AssetAmount
          amount={tradeValue}
          assetId={process.env.REACT_APP_CURRENCY as AssetId}
          maxDigits={0}
        />
      </Col>
      <Col className="d-grid text-center">
        <small>Buy</small>
        <Button variant="success">
          <AssetAmount
            amount={baseAmount}
            assetId={market.baseAsset.assetId}
            maxDigits={4}
          />
        </Button>
        <small className="text-success">
          <AssetPrice price={market.buy.basePrice} maxDigits={4} />
        </small>
      </Col>
    </Row>
  );
}
