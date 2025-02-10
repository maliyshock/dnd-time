import { StateCreator } from "zustand";
import { HOUR, MINUTE } from "~/constants.ts";
import { calculateSunAngle } from "~/components/sun/utils/calculateSunAngle.ts";
import { getMinutes } from "~/utils/getMinutes.ts";
import { getHours } from "~/utils/getHours.ts";

export type TimeSlice = {
  speed: number;
  time: number;
  play: boolean;
  setPlay: (payload: boolean) => void;
  setTime: (payload: number) => void;
  sunAngle: number;
};

const now = new Date();
const hours = now.getHours();
const minutes = now.getMinutes();
const seconds = now.getSeconds();
const initTime = hours * HOUR + minutes * MINUTE + seconds;

const initialState = {
  speed: 1,
  play: true,
  time: initTime,
  sunAngle: calculateSunAngle(initTime),
};

export const timeSlice: StateCreator<TimeSlice, [], [], TimeSlice> = set => ({
  ...initialState,
  setPlay: (payload: boolean) => set({ play: payload }),
  setTime: (payload: number) =>
    set(store => {
      const minutes = getMinutes(payload);
      const hours = getHours(payload);
      const shouldSunUpdate = getMinutes(store.time) !== minutes || getHours(store.time) !== hours;

      return { time: payload, sunAngle: shouldSunUpdate ? calculateSunAngle(payload) : store.sunAngle };
    }),
});
