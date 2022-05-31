import { Button, Col, Row } from "react-bootstrap";
import { useStrategy } from "../../contexts/Strategy/useStrategy";
import { getMarketTrade, MarketData } from "../../lib/markets";
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

  const { buy, sell } = getMarketTrade(market, strategy);

  if (exchange) {
    return (
      <Row className="g-2">
        <Col className="d-grid text-center">
          <small>Sell</small>
          <Button variant="danger">
            <AssetAmount
              amount={buy.quoteAmount}
              assetId={market.quoteAsset.assetId}
              decimals={6}
            />
          </Button>
          <small className="text-danger">
            <AssetPrice price={buy.quotePrice} decimals={3} />
          </small>
        </Col>
        <Col className="d-grid text-center">
          <small>Buy</small>
          <Button variant="success">
            <AssetAmount
              amount={buy.baseAmount}
              assetId={market.baseAsset.assetId}
              decimals={6}
            />
          </Button>
          <small className="text-success">
            <AssetPrice price={buy.basePrice} decimals={3} />
          </small>
        </Col>
      </Row>
    );
  }

  const weight = strategy.weights.find(
    (w) => w.assetId === market.baseAsset.assetId
  );
  if (weight === undefined) {
    return null;
  }
  return (
    <Row className="g-2">
      {weight.tradeValue < 0 ? (
        <Col className="d-grid text-center">
          <Button variant="danger">
            <AssetAmount
              amount={sell.baseAmount}
              assetId={market.baseAsset.assetId}
              decimals={6}
            />
          </Button>
          <small className="text-danger">
            <AssetPrice price={sell.basePrice} decimals={3} />
          </small>
        </Col>
      ) : (
        <Col className="d-grid text-center">
          <Button variant="success">
            <AssetAmount
              amount={buy.baseAmount}
              assetId={market.baseAsset.assetId}
              decimals={6}
            />
          </Button>
          <small className="text-success">
            <AssetPrice price={buy.basePrice} decimals={3} />
          </small>
        </Col>
      )}
    </Row>
  );
}
