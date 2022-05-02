import { useMemo } from "react";
import { BollingerBands } from "technicalindicators";
import { OHLCData } from "../contexts/useOHLCContext";

const BOLLINGER_BANDS_PERIOD = 14;
const BOLLINGER_BANDS_STANDARD_DEVIATION = 2;

export function useBollingerBands(data: OHLCData[]) {
  return useMemo(() => {
    const bollingerBands = BollingerBands.calculate({
      period: BOLLINGER_BANDS_PERIOD,
      stdDev: BOLLINGER_BANDS_STANDARD_DEVIATION,
      values: data.map((d) => d.close),
    });
    const offset = data.length - bollingerBands.length;
    return data.map((d, index) => {
      const bollingerBandsIndex = index - offset;
      if (bollingerBandsIndex >= 0) {
        return { ...d, ...bollingerBands[bollingerBandsIndex] };
      }
      return d;
    });
  }, [data]);
}
