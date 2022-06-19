import classNames from "classnames";
import _ from "lodash";
import React, { useMemo } from "react";
import { Card, CardProps } from "react-bootstrap";
import { ResponsiveContainer } from "recharts";
import { AssetIcon } from "../Asset/AssetIcon";
import { MarketData } from "../../lib/markets";
import { ChartBollingerBands } from "../Chart/ChartBollingerBands";
import { ChartMACD } from "../Chart/ChartMACD";
import { ChartRSI } from "../Chart/ChartRSI";
import { MarketLimitAsset } from "./MarketLimitAsset";
import { AssetPrice } from "../Asset/AssetPrice";
import { MarketLimitStrategy } from "./MarketLimitStrategy";

export function MarketCard({
  exchange,
  market,
  ...props
}: CardProps & { market: MarketData; exchange: boolean }) {
  const distanceColor = useMemo(() => {
    if (market.sell.ratio <= 1) return "success";
    if (market.buy.ratio <= 1) return "danger";
    return undefined;
  }, [market.buy.ratio, market.sell.ratio]);
  const priceChangeColor = useMemo(() => {
    if (market.priceChangePercent > 0) return "success";
    if (market.priceChangePercent < 0) return "danger";
    return undefined;
  }, [market.priceChangePercent]);

  return (
    <Card className="MarketCard" border={distanceColor} {...props}>
      <ResponsiveContainer aspect={2}>
        <ChartBollingerBands
          bollingerBands={market.bollingerBands}
          ohlc={market.ohlc}
          sma={market.sma}
          limitBuy={market.limitBuy}
          limitSell={market.limitSell}
        />
      </ResponsiveContainer>
      <Card.Body>
        <Card.Title className="d-flex">
          <AssetIcon className="me-1" assetId={market.baseAsset.assetId} />
          {market.baseAsset.assetId}
          <span
            className={classNames(
              `text-${priceChangeColor}`,
              "ms-auto",
              "ps-1"
            )}
          >
            {_.round(market.priceChangePercent, 2)}%
          </span>
        </Card.Title>
        <Card.Subtitle className="mb-2">
          <AssetPrice
            price={market.lastPrice}
            assetId={market.quoteAsset.assetId}
            maxDigits={4}
            logo={true}
          />
        </Card.Subtitle>
        {exchange ? (
          <MarketLimitStrategy market={market} />
        ) : (
          <MarketLimitAsset market={market} />
        )}
      </Card.Body>
      <ResponsiveContainer aspect={4}>
        <ChartRSI data={market.rsi} />
      </ResponsiveContainer>
      <ResponsiveContainer aspect={4}>
        <ChartMACD data={market.macd} />
      </ResponsiveContainer>
    </Card>
  );
}
