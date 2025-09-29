import { getStorageItem } from "~/utils/time/getStorageItem.ts";
import { getWorlds } from "~/utils/localStorage/getWorlds.ts";
import { World } from "~/types.ts";
import { saveCurrentWorld } from "~/utils/worlds/saveCurrentWorld.ts";

/**
 * Returns last active world if exist.
 * Updates local storage time with last active world
 */
export function refreshStorage() {
  const currentWorldId = localStorage.getItem("lastActiveWorldId");
  const currentWorldTime = getStorageItem("lastActiveWorldTime");
  const worlds = getWorlds();

  if (!currentWorldId || !currentWorldTime || !worlds) return;

  // find and update the values
  const currentWorld: World | undefined = worlds[currentWorldId];

  if (!currentWorld) return;

  return saveCurrentWorld({ worlds, currentWorld, currentTime: currentWorldTime });
}
