export function clamp(value: number, min: number, max: number) {
  if (min > max) {
    return Math.min(Math.max(value, min), min + 1);
  }

  return Math.min(Math.max(value, min), max);
}
