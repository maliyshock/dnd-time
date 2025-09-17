import { clamp } from "~/utils/clamp.ts";
import { STAR_MAX_SIZE } from "~/constants.ts";

/**
 * scale - fluctuates between 0.5 and 1 (between STAR_SCALE_MIN and STAR_SCALE_MAX parameters)
 * size – current size from 1 to STAR_MAX_SIZE
 * divide by 2 just to make it bigger, that lower oscillation part is around 1-2 px
 */
export function getStarScale({ scale, size }: { scale: number; size: number }) {
  return clamp((scale * size) / (STAR_MAX_SIZE / 2), 0.1, 1);
}
