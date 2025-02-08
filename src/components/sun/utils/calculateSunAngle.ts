import { DAY, DAY_ANGLE_PER_SECOND, DAY_TIME_DURATION, EVENING_START, MORNING_START, NIGHT_ANGLE_PER_SECOND, ZERO_TIME } from "~/constants.ts";

export const START_ANGLE = -45; // Starting angle at 06:00

export function calculateSunAngle(totalSeconds: number) {
  const timeOfDay = totalSeconds % DAY; // Остаток от деления на количество секунд в сутках

  if (timeOfDay >= ZERO_TIME && timeOfDay < MORNING_START) {
    // night time
    return timeOfDay * NIGHT_ANGLE_PER_SECOND;
  }

  if (timeOfDay >= MORNING_START && timeOfDay < EVENING_START) {
    // day time
    // enable transition
    return MORNING_START * NIGHT_ANGLE_PER_SECOND + (timeOfDay - MORNING_START) * DAY_ANGLE_PER_SECOND;
  }

  if (timeOfDay >= EVENING_START) {
    // night time
    // disable transition
    return (
      MORNING_START * NIGHT_ANGLE_PER_SECOND +
      DAY_TIME_DURATION * DAY_ANGLE_PER_SECOND +
      (timeOfDay - MORNING_START - DAY_TIME_DURATION) * NIGHT_ANGLE_PER_SECOND
    );
  }

  // should never get there
  return 0;
}
