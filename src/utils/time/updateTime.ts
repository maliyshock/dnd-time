import { DAY } from "~/constants.ts";

// Ограничение до 24 часов
export function updateTime(currentTime: number, step: number) {
  return (currentTime + step + DAY) % DAY;
}
