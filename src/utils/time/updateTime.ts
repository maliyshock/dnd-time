import { DAY } from "~/constants.ts";

// 24 hours limited
export function updateTime(currentTime: number, step: number) {
  return (currentTime + step + DAY) % DAY;
}
