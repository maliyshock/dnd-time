import { getStorageTime } from "~/utils/time/getStorageTime.ts";
import { getHours } from "~/utils/time/getHours.ts";
import { getMinutes } from "~/utils/time/getMinutes.ts";
import { getSeconds } from "~/utils/time/getSeconds.ts";

type Now = {
  hours: number;
  minutes: number;
  seconds: number;
};

export function getNow(seconds?: number): Now {
  if (seconds !== undefined) {
    return {
      hours: getHours(seconds),
      minutes: getMinutes(seconds),
      seconds: getSeconds(seconds),
    };
  }

  const savedAppTime = getStorageTime("lastActiveAppTime");

  if (savedAppTime) {
    return {
      hours: getHours(savedAppTime),
      minutes: getMinutes(savedAppTime),
      seconds: getSeconds(savedAppTime),
    };
  }

  const now = new Date();

  return {
    hours: now.getHours(),
    minutes: now.getMinutes(),
    seconds: now.getSeconds(),
  };
}
