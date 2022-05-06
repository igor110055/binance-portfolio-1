import { BollingerBands, MACD, RSI } from "technicalindicators";
import { MACDOutput } from "technicalindicators/declarations/moving_averages/MACD";
import { BollingerBandsOutput } from "technicalindicators/declarations/volatility/BollingerBands";
import { OHLCData } from "./ohlc";

export type AnalysisData = {
  bollingerBands: BollingerBandsOutput[];
  macd: MACDOutput[];
  rsi: number[];
};

export const BOLLINGER_BANDS_PERIOD = 21;
export const BOLLINGER_BANDS_STANDARD_DEVIATION = 2;

export const MACD_FAST_PERIOD = 12;
export const MACD_SLOW_PERIOD = 26;
export const MACD_SIGNAL_PERIOD = 9;

export const RSI_PERIOD = 6;

export const SCORE_PERIOD = 1;

export function getAnalysisData(ohlc: OHLCData[], limit: number): AnalysisData {
  const values = ohlc.map((data) => data.close);
  const bollingerBands = BollingerBands.calculate({
    period: BOLLINGER_BANDS_PERIOD,
    stdDev: BOLLINGER_BANDS_STANDARD_DEVIATION,
    values,
  });
  const macd = MACD.calculate({
    values,
    fastPeriod: MACD_FAST_PERIOD,
    slowPeriod: MACD_SLOW_PERIOD,
    signalPeriod: MACD_SIGNAL_PERIOD,
    SimpleMAOscillator: false,
    SimpleMASignal: false,
  });
  const rsi = RSI.calculate({
    values,
    period: RSI_PERIOD,
  });
  return {
    bollingerBands: [
      ...Array(ohlc.length - bollingerBands.length).fill(undefined),
      ...bollingerBands,
    ].slice(-limit),
    macd: [...Array(ohlc.length - macd.length).fill(undefined), ...macd].slice(
      -limit
    ),
    rsi: [...Array(ohlc.length - rsi.length).fill(undefined), ...rsi].slice(
      -limit
    ),
  };
}
