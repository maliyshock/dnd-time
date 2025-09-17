import { getScreenHypotenuse } from "~/utils/getHypotenuse.ts";
import { MAX_STARS, MIN_STARS } from "~/constants.ts";

export function getStarsAmount() {
  const screenSize = getScreenHypotenuse();
  let result;

  if (window.innerWidth < 480) {
    result = Math.round(screenSize / 6);
  } else {
    result = Math.round(screenSize / 4);
  }

  return Math.min(MAX_STARS, Math.max(MIN_STARS, result));
}
