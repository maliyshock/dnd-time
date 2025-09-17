import { RGBColor } from "~/types.ts";
import { rgbToHsl } from "~/utils/colors/rgbToHsl.ts";
import { hslToRgb } from "~/utils/colors/hslToRgb.ts";
import { clamp } from "~/utils/clamp.ts";

export function lighter(color: RGBColor, percent: number): RGBColor {
  const clampedPercent = clamp(percent, 0, 100);
  const { h, s, l } = rgbToHsl(color);
  const newBrightness = l + l * (clampedPercent / 100);

  return hslToRgb({ h, s, l: newBrightness });
}
