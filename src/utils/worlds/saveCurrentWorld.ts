import { World, WorldStorage } from "~/types.ts";
import { getNow } from "~/utils/time/getNow.ts";

type SaveCurrentWorldArgs = {
  worlds: WorldStorage;
  currentWorld: World;
  currentTime?: number;
};

/**
 * Saves data to local storage
 */
export function saveCurrentWorld({ worlds, currentWorld, currentTime }: SaveCurrentWorldArgs) {
  currentWorld = currentTime !== undefined ? { ...currentWorld, initialTime: getNow(currentTime) } : currentWorld;
  localStorage.setItem("worldStorage", JSON.stringify({ ...worlds, [currentWorld.id]: currentWorld }));

  return currentWorld;
}
