import { useMemo } from "react";
import { BollingerBands } from "technicalindicators";
import { OHLCData } from "../contexts/useOHLCContext";

export const BOLLINGER_BANDS_PERIOD = 21;
export const BOLLINGER_BANDS_STANDARD_DEVIATION = 2;

export function useBollingerBands(data: OHLCData[]) {
  return useMemo(() => {
    const bollingerBands = BollingerBands.calculate({
      period: BOLLINGER_BANDS_PERIOD,
      stdDev: BOLLINGER_BANDS_STANDARD_DEVIATION,
      values: data.map((d) => d.close),
    });
    const offset = data.length - bollingerBands.length;
    return bollingerBands.map((d, index) => {
      return { ...d, ...data[index + offset] };
    });
  }, [data]);
}
