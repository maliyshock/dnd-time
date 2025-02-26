import { getRandomNum } from "~/utils/getRandomNum.ts";

export function getStartPoint() {
  const randomDegree = getRandomNum({ max: 360 });

  return Math.round(randomDegree / 10) * 10;
}
