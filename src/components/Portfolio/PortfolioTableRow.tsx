import { ChangeEvent, useCallback, useMemo } from "react";
import { Form } from "react-bootstrap";
import { AssetIcon } from "../Asset/AssetIcon";
import { PortfolioData } from "../../lib/portfolio";
import { AssetAmount } from "../Asset/AssetAmount";
import _ from "lodash";
import { useAsset } from "../../contexts/Assets/useAssets";
import { AssetId } from "../../lib/assets";
import { StrategyWeight } from "../../contexts/Strategy/useStrategy";
import { useMarket } from "../../hooks/useMarkets";
import { roundLength } from "../../lib/round";

export function PortfolioTableRow({
  balance,
  weight,
  onDelete,
  onUpdate,
}: {
  balance: PortfolioData;
  weight?: StrategyWeight;
  onUpdate: (balance: PortfolioData) => void;
  onDelete: () => void;
}) {
  const [asset] = useAsset(weight?.assetId);
  const handleChangeAvailable = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onUpdate({
        ...balance,
        available: Number(event.target.value),
      });
    },
    [balance, onUpdate]
  );
  const handleChangeTarget = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onUpdate({
        ...balance,
        target:
          event.target.value === "" ? undefined : Number(event.target.value),
      });
    },
    [balance, onUpdate]
  );

  const priceChangeColor = useMemo(() => {
    if (asset) {
      if (asset.priceChangePercent > 0) return "success";
      if (asset.priceChangePercent < 0) return "danger";
    }
    return "secondary";
  }, [asset]);

  const tradeValueColor = useMemo(() => {
    if (weight) {
      if (weight.tradeValue > 0) return "success";
      if (weight.tradeValue < 0) return "danger";
    }
    return "secondary";
  }, [weight]);

  const market = useMarket(asset?.assetId);

  const [limitPrice, limitAmount] = useMemo(() => {
    if (asset && market && weight) {
      if (weight.tradeValue > 0)
        return [
          market.buy.basePrice,
          (weight.tradeAmount / asset.lastPrice) * market.buy.basePrice,
        ];
      if (weight.tradeValue < 0)
        return [
          market.sell.basePrice,
          (weight.tradeAmount / asset.lastPrice) * market.sell.basePrice,
        ];
    }
    return [undefined, undefined];
  }, [asset, market, weight]);

  if (asset === undefined || weight === undefined || market === undefined) {
    return null;
  }

  const percentageTarget = String(_.round(weight.target * 100, 2));

  const priceChangePercent = _.round(asset.priceChangePercent, 2);
  const priceChange =
    (priceChangePercent <= 0 ? "" : "+") + priceChangePercent + "%";

  const targetAmountRounded = roundLength(weight.tradeAmount, 4);
  const targetAmountChange =
    (targetAmountRounded <= 0 ? "" : "+") + targetAmountRounded;

  const targetValueRounded = roundLength(weight.tradeValue, 4);
  const targetValueChange =
    (targetValueRounded <= 0 ? "" : "+") + targetValueRounded;

  const percentageRounded = _.round((weight.target - weight.current) * 100, 2);
  const percentageChange =
    (percentageRounded <= 0 ? "" : "+") + percentageRounded;

  return (
    <tr className="PortfolioTableRow">
      <th>
        <div className="d-flex">
          <AssetIcon assetId={balance.assetId} className="me-2" />
          {balance.assetId}
          <span className="PortfolioTableRow-close ms-auto" onClick={onDelete}>
            ✕
          </span>
        </div>
      </th>
      <td>
        <AssetAmount
          amount={asset.lastPrice}
          assetId={process.env.REACT_APP_CURRENCY as AssetId}
          maxDigits={4}
        >
          <span className={"text-" + priceChangeColor}>{priceChange}</span>
        </AssetAmount>
      </td>
      <td className="table-warning">
        <Form.Control
          defaultValue={balance.target}
          type="number"
          placeholder={percentageTarget}
          size="sm"
          onChange={handleChangeTarget}
        />
      </td>
      <td>
        <Form.Control
          defaultValue={balance.available}
          type="number"
          placeholder="0"
          size="sm"
          onChange={handleChangeAvailable}
        />
      </td>
      <td>{_.round(weight.current * 100, 2) + "%"}</td>
      <td>
        <AssetAmount
          amount={balance.available * asset.lastPrice}
          assetId={process.env.REACT_APP_CURRENCY as AssetId}
          maxDigits={4}
        />
      </td>
      <td className={"table-" + tradeValueColor}>
        <AssetAmount
          amount={weight.targetAmount}
          assetId={balance.assetId}
          maxDigits={4}
        >
          <span className={"text-" + tradeValueColor}>
            {targetAmountChange}
          </span>
        </AssetAmount>
      </td>
      <td className={"table-" + tradeValueColor}>
        {percentageTarget + "%"}
        <small className={"ms-1 text-" + tradeValueColor}>
          {percentageChange + "%"}
        </small>
      </td>
      <td className={"table-" + tradeValueColor}>
        <AssetAmount
          amount={weight.targetAmount * asset.lastPrice}
          assetId={process.env.REACT_APP_CURRENCY as AssetId}
          maxDigits={4}
        >
          <span className={"text-" + tradeValueColor}>{targetValueChange}</span>
        </AssetAmount>
      </td>
      <td className={"text-" + tradeValueColor}>
        {limitAmount ? (
          <AssetAmount
            amount={limitAmount}
            assetId={asset.assetId}
            maxDigits={4}
          />
        ) : null}
      </td>
      <td className={"text-" + tradeValueColor}>
        {limitPrice ? (
          <AssetAmount
            amount={limitPrice}
            assetId={process.env.REACT_APP_CURRENCY as AssetId}
            maxDigits={4}
          />
        ) : null}
      </td>
    </tr>
  );
}
