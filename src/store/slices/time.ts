import { StateCreator } from "zustand";
import { HOUR, MINUTE } from "~/constants.ts";
import { calculateSunAngle } from "~/components/sun/utils/calculateSunAngle.ts";
import { getMinutes } from "~/utils/getMinutes.ts";
import { getHours } from "~/utils/getHours.ts";
import { generateColors } from "~/utils/getColorByTime.ts";
import { RGBColor } from "~/types.ts";
import { secondsToMinutes } from "~/utils/secondsToMinutes.ts";

export type TimeSlice = {
  speed: number;
  time: number;
  totalMinutes: number;
  play: boolean;
  setPlay: (payload: boolean) => void;
  setTime: (payload: number) => void;
  sunAngle: number;
  currentColors: [RGBColor, RGBColor];
  colors: Map<number, [RGBColor, RGBColor]>;
};

const now = new Date();
const hours = now.getHours();
const minutes = now.getMinutes();
const seconds = now.getSeconds();
const initDayTime = hours * HOUR + minutes * MINUTE + seconds; // in seconds
const totalMinutes = secondsToMinutes(initDayTime);
const colors = generateColors();

const initialState = {
  speed: 1,
  play: true,
  time: initDayTime,
  totalMinutes,
  sunAngle: calculateSunAngle(initDayTime),
  currentColors: colors.get(totalMinutes) || [
    { r: 255, g: 255, b: 255 },
    { r: 255, g: 255, b: 255 },
  ],
  colors,
};

export const timeSlice: StateCreator<TimeSlice, [], [], TimeSlice> = set => ({
  ...initialState,
  setPlay: (payload: boolean) => set({ play: payload }),
  setTime: (payload: number) =>
    set(store => {
      const minutes = getMinutes(payload);
      const totalMinutes = secondsToMinutes(payload);
      const hours = getHours(payload);
      const shouldSunUpdate = getMinutes(store.time) !== minutes || getHours(store.time) !== hours;
      const shouldColorUpdate = totalMinutes !== store.totalMinutes;

      return {
        time: payload,
        sunAngle: shouldSunUpdate ? calculateSunAngle(payload) : store.sunAngle,
        totalMinutes,
        currentColors: shouldColorUpdate && colors.get(totalMinutes) !== undefined ? colors.get(totalMinutes) : store.currentColors,
      };
    }),
});
