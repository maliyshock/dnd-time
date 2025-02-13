import { DAY, DAY_ANGLE_PER_SECOND, DAY_TIME_DURATION, MORNING_START, NIGHT_ANGLE_PER_SECOND, NIGHT_START, ZERO_TIME } from "~/constants.ts";

// same principle but for color
export function calculateSunAngle(time: number) {
  const timeOfDay = time % DAY; // time in seconds

  if (timeOfDay >= ZERO_TIME && timeOfDay < MORNING_START) {
    // night time
    return timeOfDay * NIGHT_ANGLE_PER_SECOND;
  }

  if (timeOfDay >= MORNING_START && timeOfDay < NIGHT_START) {
    // day time
    // enable transition
    return MORNING_START * NIGHT_ANGLE_PER_SECOND + (timeOfDay - MORNING_START) * DAY_ANGLE_PER_SECOND;
  }

  if (timeOfDay >= NIGHT_START) {
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
