import { getHours } from "~/utils/time/getHours.ts";
import { getMinutes } from "~/utils/time/getMinutes.ts";
import { getSeconds } from "~/utils/time/getSeconds.ts";
import { HOUR, MINUTE, MINUTES_IN_HOUR } from "~/constants.ts";

export type Time = {
  totalSeconds: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export function getNow(totalSeconds?: number): Time {
  if (totalSeconds !== undefined) {
    return {
      totalSeconds: totalSeconds,
      hours: getHours(totalSeconds),
      minutes: getMinutes(totalSeconds, MINUTES_IN_HOUR),
      seconds: getSeconds(totalSeconds),
    };
  }

  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  return {
    totalSeconds: hours * HOUR + minutes * MINUTE + seconds,
    hours,
    minutes,
    seconds,
  };
}
