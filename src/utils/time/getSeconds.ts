import { MINUTE } from "~/constants.ts";

export function getSeconds(seconds: number) {
  return seconds % MINUTE;
}
