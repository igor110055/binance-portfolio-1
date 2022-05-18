import React, { HTMLProps, useMemo } from "react";
import { MarketData } from "../../lib/markets";
import { useStrategy } from "../../hooks/useStrategy";
import { AssetAmount } from "../Asset/AssetAmount";
import { AssetId } from "../../lib/assets";
import _ from "lodash";

export function MarketCardStrategy({
  market,
  ...props
}: HTMLProps<HTMLDivElement> & { market: MarketData }) {
  const strategy = useStrategy();

  const baseWeight = useMemo(() => {
    return strategy.weights.find((w) => w.assetId === market.baseAsset.assetId);
  }, [market.baseAsset.assetId, strategy.weights]);
  const quoteWeight = useMemo(() => {
    return strategy.weights.find(
      (w) => w.assetId === market.quoteAsset.assetId
    );
  }, [market.quoteAsset.assetId, strategy.weights]);

  const baseValue = useMemo(() => {
    if (baseWeight) {
      return baseWeight.targetValue - baseWeight.currentValue;
    }
    return 0;
  }, [baseWeight]);
  const quoteValue = useMemo(() => {
    if (quoteWeight) {
      return quoteWeight.currentValue - quoteWeight.targetValue;
    }
    return 0;
  }, [quoteWeight]);

  const dealValue = useMemo(() => {
    return Math.min(baseValue, quoteValue);
  }, [baseValue, quoteValue]);

  const priceLimitSell = _.round(
    Math.max(
      _.last(market.quoteAsset.ohlc)?.close || 0,
      _.last(market.quoteAsset.bollingerBands)?.upper || 0,
      _.last(market.quoteAsset.sma) || 0
    ),
    3
  );
  const priceLimitBuy = _.round(
    Math.min(
      _.last(market.baseAsset.ohlc)?.close || 0,
      _.last(market.baseAsset.bollingerBands)?.lower || 0,
      _.last(market.baseAsset.sma) || 0
    ),
    3
  );

  return (
    <div
      className="MarketCardStrategy d-flex justify-content-between"
      {...props}
    >
      <div className="left">
        <strong className="text-danger">Sell</strong>
        <AssetAmount
          amount={dealValue / market.quoteAsset.lastPrice}
          assetId={market.quoteAsset.assetId}
          decimals={6}
          logo={true}
        />
        <small className="text-danger">{Number(priceLimitSell)}</small>
      </div>
      <div className="center">
        <AssetAmount
          amount={dealValue}
          assetId={process.env.REACT_APP_CURRENCY as AssetId}
          decimals={2}
          logo={true}
        />
      </div>
      <div className="right">
        <strong className="text-success">Buy</strong>
        <AssetAmount
          amount={dealValue / market.baseAsset.lastPrice}
          assetId={market.baseAsset.assetId}
          className="right"
          decimals={6}
          logo={true}
        />
        <small className="text-success">{Number(priceLimitBuy)}</small>
      </div>
    </div>
  );
}
