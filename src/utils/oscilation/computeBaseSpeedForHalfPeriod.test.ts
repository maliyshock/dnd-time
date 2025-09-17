import { describe, it, expect } from "vitest";
import { computeBaseSpeedForHalfPeriod } from "~/utils/oscilation/computeBaseSpeedForHalfPeriod.ts";

const close = (a: number, b: number, tolerance = 1e-10) => Math.abs(a - b) <= tolerance;

describe("computeBaseSpeedForHalfPeriod", () => {
  it("alpha ≠ 1: matches the analytical formula", () => {
    const params = {
      xMin: 0.6,
      xMax: 1.4,
      sharpnessAlpha: 1.2, // ≠ 1
      epsilonMinSpeed: 0.02,
      targetHalfPeriodSeconds: 3.0,
    };

    const expected = (() => {
      const range = params.xMax - params.xMin; // 0.8
      const alpha = params.sharpnessAlpha; // 1.2
      const epsilon = params.epsilonMinSpeed; // 0.02
      const oneMinusAlpha = 1 - alpha; // -0.2
      const termA = Math.pow(epsilon + 1, oneMinusAlpha);
      const termB = Math.pow(epsilon, oneMinusAlpha);
      const integralI = (termA - termB) / oneMinusAlpha;

      return (range * integralI) / params.targetHalfPeriodSeconds;
    })();

    const result = computeBaseSpeedForHalfPeriod(params);

    expect(close(result, expected, 1e-10)).toBe(true);
  });

  it("alpha = 1: matches the logarithmic closed form", () => {
    const params = {
      xMin: 0.6,
      xMax: 1.4,
      sharpnessAlpha: 1.0, // = 1
      epsilonMinSpeed: 0.02,
      targetHalfPeriodSeconds: 2.5,
    };

    const expected = (() => {
      const range = params.xMax - params.xMin; // 0.8
      const epsilon = params.epsilonMinSpeed; // 0.02
      const integralI = Math.log((epsilon + 1) / epsilon);

      return (range * integralI) / params.targetHalfPeriodSeconds;
    })();

    const result = computeBaseSpeedForHalfPeriod(params);

    expect(close(result, expected, 1e-10)).toBe(true);
  });

  it("continuity near alpha≈1 (1±1e-9 is close to alpha=1 result)", () => {
    const base = {
      xMin: 0.6,
      xMax: 1.4,
      epsilonMinSpeed: 0.02,
      targetHalfPeriodSeconds: 3.0,
    };

    const at1 = computeBaseSpeedForHalfPeriod({ ...base, sharpnessAlpha: 1.0 });
    const atUp = computeBaseSpeedForHalfPeriod({ ...base, sharpnessAlpha: 1.0 + 1e-9 });
    const atDn = computeBaseSpeedForHalfPeriod({ ...base, sharpnessAlpha: 1.0 - 1e-9 });

    expect(close(atUp, at1, 1e-8)).toBe(true);
    expect(close(atDn, at1, 1e-8)).toBe(true);
  });

  it("inverse proportionality to targetHalfPeriodSeconds", () => {
    const p1 = computeBaseSpeedForHalfPeriod({
      xMin: 0.6,
      xMax: 1.4,
      sharpnessAlpha: 1.2,
      epsilonMinSpeed: 0.02,
      targetHalfPeriodSeconds: 3,
    });
    const p2 = computeBaseSpeedForHalfPeriod({
      xMin: 0.6,
      xMax: 1.4,
      sharpnessAlpha: 1.2,
      epsilonMinSpeed: 0.02,
      targetHalfPeriodSeconds: 6, // doubled
    });

    // should be roughly half
    expect(close(p2 / p1, 0.5, 1e-10)).toBe(true);
  });

  it("validates inputs: range<=0", () => {
    expect(() =>
      computeBaseSpeedForHalfPeriod({
        xMin: 1,
        xMax: 1,
        sharpnessAlpha: 1.2,
        epsilonMinSpeed: 0.02,
        targetHalfPeriodSeconds: 3,
      }),
    ).toThrow(/xMax must be greater than xMin/i);
  });

  it("validates inputs: epsilon<=0", () => {
    expect(() =>
      computeBaseSpeedForHalfPeriod({
        xMin: 0.6,
        xMax: 1.4,
        sharpnessAlpha: 1.2,
        epsilonMinSpeed: 0,
        targetHalfPeriodSeconds: 3,
      }),
    ).toThrow(/epsilonMinSpeed must be > 0/i);
  });

  it("validates inputs: targetHalfPeriodSeconds<=0", () => {
    expect(() =>
      computeBaseSpeedForHalfPeriod({
        xMin: 0.6,
        xMax: 1.4,
        sharpnessAlpha: 1.2,
        epsilonMinSpeed: 0.02,
        targetHalfPeriodSeconds: 0,
      }),
    ).toThrow(/targetHalfPeriodSeconds must be > 0/i);
  });
});
