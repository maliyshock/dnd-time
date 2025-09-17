/**
 * Calculates baseSpeedPerSecond so that the duration of one half-cycle
 * is equal to targetHalfPeriodSeconds (e.g. 3 seconds).
 *
 * Formulas:
 *  Let range = xMax - xMin.
 *  Let us denote I(alpha, epsilon) = ∫_0^1 (epsilon + (1 - p))^(−alpha) dp
 *  Then T_half = (range / baseSpeedPerSecond) * I
 *  => baseSpeedPerSecond = (range * I) / T_half
 *
 * Special cases for I:
 *  If alpha ≠ 1:
 *    I = [ (epsilon + 1)^(1−alpha) − epsilon^(1−alpha) ] / (1 − alpha)
 *  If alpha = 1:
 *    I = ln( (epsilon + 1) / epsilon )
 */
export function computeBaseSpeedForHalfPeriod(params: {
  xMin: number;
  xMax: number;
  sharpnessAlpha: number;
  epsilonMinSpeed: number;
  targetHalfPeriodSeconds: number; // desired duration of the stroke from minimum to maximum
}): number {
  const { xMin, xMax, sharpnessAlpha, epsilonMinSpeed, targetHalfPeriodSeconds } = params;

  const range = xMax - xMin;

  if (range <= 0) {
    throw new Error("xMax must be greater than xMin.");
  }

  if (epsilonMinSpeed <= 0) {
    throw new Error("epsilonMinSpeed must be > 0.");
  }

  if (targetHalfPeriodSeconds <= 0) {
    throw new Error("targetHalfPeriodSeconds must be > 0.");
  }

  const alpha = sharpnessAlpha;
  const epsilon = epsilonMinSpeed;

  let integralI: number;
  const alphaIsOne = Math.abs(alpha - 1) < 1e-9;

  if (alphaIsOne) {
    integralI = Math.log((epsilon + 1) / epsilon);
  } else {
    const oneMinusAlpha = 1 - alpha;
    const termA = Math.pow(epsilon + 1, oneMinusAlpha);
    const termB = Math.pow(epsilon, oneMinusAlpha);

    integralI = (termA - termB) / oneMinusAlpha;
  }

  return (range * integralI) / targetHalfPeriodSeconds;
}
