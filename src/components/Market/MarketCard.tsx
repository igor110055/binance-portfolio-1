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

export function MarketCard({
  market,
  ...props
}: CardProps & { market: MarketData }) {
  const price = _.last(market.ohlc)?.close || 0;
  const distanceColor = useMemo(() => {
    if (market.distanceSell < 0) return "success";
    if (market.distanceBuy < 0) return "danger";
    return undefined;
  }, [market.distanceBuy, market.distanceSell]);
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
              "px-1"
            )}
          >
            {_.round(market.priceChangePercent, 2)}%
          </span>
        </Card.Title>
        <Card.Subtitle>
          <strong className="me-1">
            <AssetIcon className="me-1" assetId={market.quoteAsset.assetId} />
            {market.quoteAsset.assetId}
          </strong>
          {_.round(price, 6)}
        </Card.Subtitle>
        {/* <Card.Text as="pre">
          {JSON.stringify(
            _.omit(market, [
              "ohlc",
              "bollingerBands",
              "macd",
              "rsi",
              "sma",
              "baseAsset.ohlc",
              "baseAsset.bollingerBands",
              "baseAsset.macd",
              "baseAsset.rsi",
              "baseAsset.sma",
              "quoteAsset.ohlc",
              "quoteAsset.bollingerBands",
              "quoteAsset.macd",
              "quoteAsset.rsi",
              "quoteAsset.sma",
            ]),
            null,
            2
          )}
        </Card.Text> */}
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
