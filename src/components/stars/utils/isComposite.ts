import { STAR_TRANSFORM_THRESHOLD } from "~/constants.ts";

export function isComposite(size: number): boolean {
  return size > STAR_TRANSFORM_THRESHOLD;
}
