import _ from "lodash";

export function roundLength(
  n: number,
  maxDigits: number,
  minDecimals: number = 2
) {
  if (maxDigits < minDecimals) {
    return _.round(n, minDecimals);
  }
  for (let decimals = minDecimals; decimals < maxDigits - 1; decimals += 1) {
    const rounded = _.round(n, decimals);
    const absRounded = Math.abs(rounded);
    if (String(absRounded).length >= maxDigits + 1) {
      return rounded;
    }
  }
  return _.round(n, maxDigits - 1);
}
