export function getRandomNum({ min, max }: { min?: number; max: number }) {
  if (min !== undefined) {
    return Math.round(Math.random() * (max - min) + min);
  }

  return Math.round(Math.random() * max);
}
