import { MINUTE } from "~/constants.ts";

/**
 * return minutes amount per item (for exmple per Hour or per Day)
 */
export function getMinutes(seconds: number, per?: number) {
  if (per !== undefined) {
    return Math.floor((seconds / MINUTE) % per);
  }

  return Math.floor(seconds / MINUTE);
}
