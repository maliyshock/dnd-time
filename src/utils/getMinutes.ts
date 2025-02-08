import { HOUR, MINUTE } from "~/constants.ts";

export function getMinutes(seconds: number) {
  return Math.floor((seconds % HOUR) / MINUTE);
}
