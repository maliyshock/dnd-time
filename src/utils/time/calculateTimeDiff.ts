import { DAY } from "~/constants.ts";

export function calculateTimeDiff(lastActive: number | undefined, lastActiveAppTime: number | undefined) {
  if (lastActive !== undefined && lastActiveAppTime !== undefined) {
    const realTimeDelta = Date.now() - lastActive;
    const backgroundDelta = Math.floor(realTimeDelta / 1000); // convert milliseconds to seconds

    return (lastActiveAppTime + backgroundDelta) % DAY;
  }

  return;
}
