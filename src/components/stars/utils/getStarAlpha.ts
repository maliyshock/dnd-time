import { clamp } from "~/utils/clamp.ts";

type GetStarAlphaArgs = {
  scale: number;
  multiplier?: number;
};

export function getStarAlpha({ scale, multiplier = 1 }: GetStarAlphaArgs) {
  return clamp(scale * multiplier, 0.1, 0.95);
}
