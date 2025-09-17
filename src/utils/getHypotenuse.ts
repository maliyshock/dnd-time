type GetHypotenuseArgs = {
  width: number;
  height: number;
};

// Pythagorean theorem for hypotenuse
export function getHypotenuse({ width, height }: GetHypotenuseArgs) {
  return Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
}

export function getScreenHypotenuse() {
  const { width, height } = window.screen;

  return getHypotenuse({ width, height });
}
