import { RGBColor } from "~/types.ts";
import { rgbToHsl } from "~/utils/colors/rgbToHsl.ts";
import { hslToRgb } from "~/utils/colors/hslToRgb.ts";

export function lighter(color: RGBColor, percent: number): RGBColor {
  const clampedPercent = Math.max(0, Math.min(100, percent));
  const { h, s, l } = rgbToHsl(color);
  const newBrightness = l + l * (clampedPercent / 100);

  return hslToRgb({ h, s, l: newBrightness });
}
