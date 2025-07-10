import { HOUR, MINUTE } from "~/constants.ts";

type GetTotalSeconds = {
  hours?: number;
  minutes?: number;
  seconds?: number;
};

export function getTotalSeconds({ hours = 0, minutes = 0, seconds = 0 }: GetTotalSeconds) {
  return hours * HOUR + minutes * MINUTE + seconds;
}
