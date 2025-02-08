import { HOUR } from "~/constants.ts";

export function getHours(seconds: number) {
  return Math.floor(seconds / HOUR) % 24;
}
