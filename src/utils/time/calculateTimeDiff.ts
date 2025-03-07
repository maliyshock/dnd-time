import { getStorageTime } from "~/utils/time/getStorageTime.ts";
import { DAY } from "~/constants.ts";

export function calculateTimeDiff() {
  const lastActive = getStorageTime("lastActive");
  const lastActiveAppTime = getStorageTime("lastActiveAppTime");

  if (lastActive !== undefined && lastActiveAppTime !== undefined) {
    const realTimeDelta = Date.now() - lastActive;
    const backgroundDelta = Math.floor(realTimeDelta / 1000); // convert milliseconds to seconds

    return (lastActiveAppTime + backgroundDelta) % DAY;
  }

  return;
}
