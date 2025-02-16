import { rgbToHsl } from "~/utils/colors/rgbToHsl.ts";
import { RGBColor } from "~/types.ts";
import { hslToRgb } from "~/utils/colors/hslToRgb.ts";

export function shiftColor(color: RGBColor, degrees: number): RGBColor {
  // Преобразуем RGB в HSL
  const hsl = rgbToHsl(color);

  // Сдвигаем Hue на указанное количество градусов
  hsl.h = (hsl.h + degrees) % 360;
  if (hsl.h < 0) hsl.h += 360; // Убедимся, что Hue остается в диапазоне [0, 360)

  // Преобразуем HSL обратно в RGB
  return hslToRgb(hsl);
}
