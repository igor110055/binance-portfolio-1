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
import { MarketCardStrategy } from "./MarketCardStrategy";

export function MarketCard({
  market,
  ...props
}: CardProps & { market: MarketData }) {
  const price = _.last(market.ohlc)?.close;
  const color = useMemo(() => {
    if (market.priceChangePercent > 0) return "success";
    if (market.priceChangePercent < 0) return "danger";
    return undefined;
  }, [market.priceChangePercent]);

  return (
    <Card className="MarketCard" {...props}>
      <ResponsiveContainer aspect={16 / 9}>
        <ChartBollingerBands
          bollingerBands={market.bollingerBands}
          ohlc={market.ohlc}
        />
      </ResponsiveContainer>
      <Card.Body>
        <Card.Title className="d-flex">
          <AssetIcon className="me-1" assetId={market.baseAsset.assetId} />
          {market.baseAsset.assetId}
          <span className={classNames(`text-${color}`, "ms-auto", "px-1")}>
            {market.priceChangePercent.toFixed(2)}%
          </span>
        </Card.Title>
        <Card.Subtitle>
          <strong className="me-1">
            <AssetIcon className="me-1" assetId={market.quoteAsset.assetId} />
            {market.quoteAsset.assetId}
          </strong>
          {price?.toFixed(6)}
        </Card.Subtitle>
        <MarketCardStrategy market={market} />
      </Card.Body>
      <ResponsiveContainer aspect={32 / 9}>
        <ChartRSI data={market.rsi} />
      </ResponsiveContainer>
      <ResponsiveContainer aspect={32 / 9}>
        <ChartMACD data={market.macd} />
      </ResponsiveContainer>
    </Card>
  );
}
