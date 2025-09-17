import { getScreenHypotenuse } from "~/utils/getHypotenuse.ts";
import { MAX_STARS, MIN_STARS } from "~/constants.ts";
import { clamp } from "~/utils/clamp.ts";

export function getStarsAmount() {
  const screenSize = getScreenHypotenuse();
  let result;

  if (window.innerWidth < 480) {
    result = Math.round(screenSize / 8);
  } else {
    result = Math.round(screenSize / 10);
  }

  return clamp(result, MIN_STARS, MAX_STARS);
}
