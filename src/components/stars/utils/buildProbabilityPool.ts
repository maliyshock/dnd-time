import { StarDictionaryItem, StarVariation } from "~/constants.ts";

export function buildProbabilityPool(items: StarDictionaryItem[], scale: number = 100): StarVariation[] {
  const newItems = [...items];
  const itemsWeight = newItems.reduce((sum, item) => sum + item.chance, 0);
  let totalWeight: number = itemsWeight;

  if (itemsWeight < 100) {
    totalWeight = 100;
    newItems.push({ name: "default", chance: 100 - itemsWeight });
  }

  return newItems.flatMap(({ name, chance }) => {
    const count = Math.round((chance / totalWeight) * scale);

    return Array(count).fill(name);
  });
}
