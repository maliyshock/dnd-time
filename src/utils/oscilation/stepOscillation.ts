import { OscillationProfile } from "~/types.ts";
import { clamp } from "~/utils/clamp.ts";

/** Oscillator state */
export type OscillationState = {
  value: number; // Current x in [0.7..1.0]
  direction: 1 | -1; // Direction of movement: +1 up, -1 down
};

type StepOscillationArgs = {
  value: number; // Current x in [0.7..1.0]
  direction: 1 | -1; // Direction of movement: +1 up, -1 down
  deltaTimeSeconds: number;
  profile: OscillationProfile;
};

/**
 * One integration step per deltaTimeSeconds.
 * Returns the new state taking into account reflections on the boundaries.
 */
export function stepOscillation({ value, direction, deltaTimeSeconds, profile }: StepOscillationArgs): OscillationState {
  const { xMin, xMax, sharpnessAlpha, epsilonMinSpeed, baseSpeedPerSecond } = profile;
  const clampedValue = clamp(value, xMin, xMax);
  const range = xMax - xMin;

  if (range <= 0) {
    throw new Error("Profile parameters are incorrect: xMax must be greater than xMin.");
  }

  // Normalized position: 0 at the bottom, 1 at the top
  const normalizedPosition = (clampedValue - xMin) / range;

  // Speed factor: faster at the bottom (normalizedPosition ~ 0), slower at the top (normalizedPosition ~ 1)
  // epsilonMinSpeed prevents the speed from becoming zero at the very top
  const speedFactor = Math.pow(epsilonMinSpeed + (1 - normalizedPosition), sharpnessAlpha);

  // Instantaneous speed with scale
  const instantaneousSpeed = baseSpeedPerSecond * speedFactor;

  // Euler step
  let nextValue = clampedValue + direction * instantaneousSpeed * deltaTimeSeconds;
  let nextDirection = direction;

  // Reflections on boundaries
  if (nextValue <= xMin) {
    nextValue = xMin;
    nextDirection = 1;
  } else if (nextValue >= xMax) {
    nextValue = xMax;
    nextDirection = -1;
  }

  return { value: nextValue, direction: nextDirection };
}
