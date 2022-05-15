import React, { HTMLProps, useMemo } from "react";
import { MarketData } from "../../lib/markets";
import { useStrategy } from "../../hooks/useStrategy";
import { AssetAmount } from "../Asset/AssetAmount";
import { AssetId } from "../../lib/assets";

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

  return (
    <div
      className="MarketCardStrategy d-flex justify-content-between"
      {...props}
    >
      <AssetAmount
        amount={dealValue / market.quoteAsset.lastPrice}
        assetId={market.quoteAsset.assetId}
        className="left"
        decimals={6}
        logo={true}
      />
      <AssetAmount
        amount={dealValue}
        assetId={process.env.REACT_APP_CURRENCY as AssetId}
        className="middle"
        decimals={2}
        logo={true}
      />
      <AssetAmount
        amount={dealValue / market.baseAsset.lastPrice}
        assetId={market.baseAsset.assetId}
        className="right"
        decimals={6}
        logo={true}
      />
    </div>
  );
}
