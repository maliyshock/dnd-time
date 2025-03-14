export function hexToRgb(hex: string) {
  // Убираем символ #, если он есть
  hex = hex.replace(/^#/, "");

  // Разбираем HEX-строку на компоненты
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  // Возвращаем объект с RGB-значениями
  return { r, g, b };
}
