import { COLORS, MINUTES_IN_DAY } from "~/constants.ts";
import { interpolateColor } from "~/utils/colors/interpolateColor.ts";
import { RGBColor } from "~/types.ts";
import { secondsToMinutes } from "~/utils/time/secondsToMinutes.ts";

export function generateColors(): Map<number, [RGBColor, RGBColor]> {
  const colors = new Map();

  let counter = 0;
  let prevPoint = COLORS[counter];
  let nextPoint = COLORS[counter + 1];

  for (let i = 0; i < MINUTES_IN_DAY; i++) {
    if (i >= secondsToMinutes(nextPoint.time)) {
      counter++;
      prevPoint = COLORS[counter];
      nextPoint = COLORS[counter + 1];
    }

    const prevPointInMinutes = secondsToMinutes(prevPoint.time);
    const nextPointInMinutes = secondsToMinutes(nextPoint.time);
    const range = nextPointInMinutes - prevPointInMinutes;
    const t = (i - prevPointInMinutes) / range;
    const firstColor = interpolateColor(prevPoint.color[0], nextPoint.color[0], t);
    const secondColor = interpolateColor(prevPoint.color[1], nextPoint.color[1], t);

    colors.set(i, [firstColor, secondColor]);
  }

  return colors;
}
