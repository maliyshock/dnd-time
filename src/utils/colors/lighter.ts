import { RGBColor } from "~/types.ts";

export function lighter(color: RGBColor, percent: number): RGBColor {
  const clampedPercent = Math.max(0, Math.min(100, percent));

  // relative
  // const factor = 1 + percent / 100;
  // const r = Math.round(Math.min(255, color.r * factor));
  // const g = Math.round(Math.min(255, color.g * factor));
  // const b = Math.round(Math.min(255, color.b * factor));

  // absolute
  const r = Math.round(color.r + (255 - color.r) * (clampedPercent / 100));
  const g = Math.round(color.g + (255 - color.g) * (clampedPercent / 100));
  const b = Math.round(color.b + (255 - color.b) * (clampedPercent / 100));

  return { r, g, b };
}
