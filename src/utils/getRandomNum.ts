type GetRandomNumArgs = {
  min?: number;
  max: number;
  round?: boolean;
};

export function getRandomNum({ min, max, round = true }: GetRandomNumArgs) {
  const minimal = min || 0;

  if (round) {
    return Math.round(Math.random() * (max - minimal) + minimal);
  }

  return Math.random() * (max - minimal) + minimal;
}
