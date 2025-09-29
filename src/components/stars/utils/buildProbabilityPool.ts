import { StarDictionaryItem, StarVariation } from "~/constants.ts";

// TODO: write tests for this
export function buildProbabilityPool(items: StarDictionaryItem[], scale: number = 100): StarVariation[] {
  const newItems = [...items];
  const itemsWeight = newItems.reduce((sum, item) => sum + item.chance, 0);

  return newItems.flatMap(({ name, chance }) => {
    const count = Math.round((chance / itemsWeight) * scale);

    return Array(count).fill(name);
  });
}
