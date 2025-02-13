import { HOUR, MINUTE } from "~/constants.ts";

// returns 0 when we pass the total amount of seconds of the day
export function getMinutes(seconds: number) {
  return Math.floor((seconds % HOUR) / MINUTE);
}
