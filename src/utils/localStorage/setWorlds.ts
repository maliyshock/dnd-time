import { WorldStorage } from "~/types.ts";

export function storeWorlds(worlds: WorldStorage) {
  localStorage.setItem("worldStorage", JSON.stringify(worlds));
}
