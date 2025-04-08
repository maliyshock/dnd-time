import { StateCreator } from "zustand";
import { HOUR, MINUTE } from "~/constants.ts";
import { calculateSunAngle } from "~/components/sun/utils/calculateSunAngle.ts";
import { getMinutes } from "~/utils/time/getMinutes.ts";
import { getHours } from "~/utils/time/getHours.ts";
import { generateColors } from "~/utils/colors/getColorByTime.ts";
import { RGBColor } from "~/types.ts";
import { secondsToMinutes } from "~/utils/time/secondsToMinutes.ts";
import { getNow } from "~/utils/time/getNow.ts";

export type TimeSlice = {
  speed: number;
  time: number;
  timeIsChanging: boolean;
  totalMinutes: number;
  minutes: number;
  hours: number;
  play: boolean;
  sunAngle: number;
  currentColors: [RGBColor, RGBColor, number?];
  colors: Map<number, [RGBColor, RGBColor, number?]>;
  setPlay: (payload: boolean) => void;
  setTogglePlay: () => void;
  setTimeIsChanging: (payload: boolean) => void;
  setTime: (fn: (prev: number) => number) => void;
};

const { hours, minutes, seconds } = getNow();

const initDayTime = hours * HOUR + minutes * MINUTE + seconds; // in seconds
const totalMinutes = secondsToMinutes(initDayTime);
const colors = generateColors();

const initialState = {
  speed: 1,
  play: true,
  time: initDayTime,
  timeIsChanging: false,
  totalMinutes,
  minutes,
  hours,
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
  setTogglePlay: () => set(store => ({ play: !store.play })),
  // flag to pause the time for a bit, without changing the play state
  setTimeIsChanging: (payload: boolean) => set({ timeIsChanging: payload }),

  setTime: fn =>
    set(store => {
      const time = fn(store.time);
      const minutes = getMinutes(time);
      // we want to change color within each minute change
      const totalMinutes = secondsToMinutes(time);
      const hours = getHours(time);
      const shouldSunUpdate = getMinutes(store.time) !== minutes || getHours(store.time) !== hours;
      const shouldColorUpdate = totalMinutes !== store.totalMinutes;

      return {
        time,
        minutes,
        totalMinutes,
        hours,
        sunAngle: shouldSunUpdate ? calculateSunAngle(time) : store.sunAngle,
        currentColors: shouldColorUpdate && colors.get(totalMinutes) !== undefined ? colors.get(totalMinutes) : store.currentColors,
      };
    }),
});
