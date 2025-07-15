import { WorldStorage } from "~/types.ts";

export function sortByOrder(worlds: WorldStorage) {
  return Object.entries(worlds).sort(([, a], [, b]) => a.order - b.order);
}
