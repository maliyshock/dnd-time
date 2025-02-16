type RGBColor = { r: number; g: number; b: number };

export function darker(color: RGBColor, percent: number): RGBColor {
  const clampedPercent = Math.max(0, Math.min(100, percent));
  const factor = 1 - clampedPercent / 100;

  const r = Math.round(color.r * factor);
  const g = Math.round(color.g * factor);
  const b = Math.round(color.b * factor);

  return { r, g, b };
}
