export const round = (val: number) => Math.round(val * 100) / 100;

export const safeAvg = (sum: number, count: number) => count > 0 ? round(sum / count) : 0;

export const safePercentage = (count: number, all_count: number) => count > 0 ? round(count * 100 / all_count) : 0;

export const renderThreeFixed = (first?: any, second?: any, third?: any, suffix = "") => `${first.toFixed(2)}${second ? `/${second.toFixed(2)}` : ""}${third ? `/${third.toFixed(2)}` : ""}${suffix}`;
export const renderCRThreeFixed = (first?: any, first_cond?: any, second?: any,  third?: any, suffix = "") => `${first_cond ? first.toFixed(2) : "—"}${second ? `/${second.toFixed(2)}` : ""}${third ? `/${third.toFixed(2)}` : ""}${first_cond || second || third ? suffix : ""}`;
export const renderThree = (first?: any, second?: any, third?: any, suffix = "") => `${first}${second ? `/${second}` : ""}${third ? `/${third}` : ""}${suffix}`;

const isFiniteNumber = (val: unknown): val is number => typeof val === "number" && Number.isFinite(val);

export const PRICE_MAX_RATE = 0.25;

export const getPriceFact = (spend: number, approves: number) =>
  isFiniteNumber(spend) && isFiniteNumber(approves) && approves > 0 ? round(spend / approves) : 0;

export const getPriceMax = (avgCheckUsd: number) =>
  isFiniteNumber(avgCheckUsd) && avgCheckUsd > 0 ? round(avgCheckUsd * PRICE_MAX_RATE) : 0;

export const getMinus = (spend: number, approves: number, priceFact: number, priceMax: number) => {
  const safeSpend = isFiniteNumber(spend) ? spend : 0;
  const safeApproves = isFiniteNumber(approves) ? approves : 0;

  if (safeApproves <= 0) {
    return safeSpend > 0 ? round(-safeSpend) : 0;
  }

  if (!isFiniteNumber(priceFact) || !isFiniteNumber(priceMax) || priceFact <= priceMax) {
    return 0;
  }

  return round((priceMax - priceFact) * safeApproves);
};

export const getFactMaxRatio = (priceFact: number, priceMax: number) => {
  const fact = isFiniteNumber(priceFact) ? priceFact : 0;
  const max = isFiniteNumber(priceMax) ? priceMax : 0;

  if (max <= 0) {
    return fact > 0 ? Infinity : 0;
  }

  return fact / max;
};

export type PriceIndicatorColor = "green" | "yellow" | "red";

export const getPriceIndicatorColor = (priceFact: number, priceMax: number): PriceIndicatorColor => {
  const ratio = getFactMaxRatio(priceFact, priceMax);

  if (ratio >= 1) return "red";
  if (ratio >= 0.8) return "yellow";
  return "green";
};
