import { StateCreator } from "zustand";
import { calculateSunAngle } from "~/components/sun/utils/calculateSunAngle.ts";
import { getMinutes } from "~/utils/time/getMinutes.ts";
import { getHours } from "~/utils/time/getHours.ts";
import { generateColors } from "~/utils/colors/getColorByTime.ts";
import { RGBColor, World, WorldStorage } from "~/types.ts";
import { secondsToMinutes } from "~/utils/time/secondsToMinutes.ts";
import { getNow } from "~/utils/time/getNow.ts";
import { getWorlds } from "~/utils/localStorage/getWorlds.ts";
import { sortByOrder } from "~/utils/worlds/sortByOrder.ts";

export type TimeSlice = {
  activeWorldName: string;
  worlds: WorldStorage;
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
  setWorlds: (payload: WorldStorage | ((prev: WorldStorage) => WorldStorage)) => void;
  selectWorld: (payload: string) => void;
  deleteWorld: (payload: string) => void;
  setActiveWorldName: (payload: string) => void;
  setPlay: (payload: boolean) => void;
  setTogglePlay: () => void;
  setTimeIsChanging: (payload: boolean) => void;
  setTime: (valueOrFn: number | ((prev: number) => number)) => void;
};

// get last active world name and time based on the info from the local storage
const currentWorldName = localStorage.getItem("lastActiveWorld");
// const lastActiveWorldTime = getStorageItem("lastActiveWorldTime");
const defaultWorld = { name: "Untitled World", initialTime: getNow(), order: 0 };
const worlds = getWorlds() ?? { [defaultWorld.name]: defaultWorld };

const currentWorld: World = currentWorldName ? worlds[currentWorldName] || defaultWorld : defaultWorld;
const { totalSeconds, minutes, hours } = currentWorld.initialTime;
const totalMinutes = secondsToMinutes(totalSeconds);
const colors = generateColors();

const initialState = {
  activeWorldName: currentWorld.name,
  worlds, // TODO: probably should be extracted to separate slice
  speed: 1,
  play: true,
  time: totalSeconds,
  timeIsChanging: false,
  totalMinutes,
  minutes,
  hours,
  sunAngle: calculateSunAngle(totalSeconds),
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

  setWorlds: (valueOrFn: WorldStorage | ((prev: WorldStorage) => WorldStorage)) =>
    set(store => {
      const result = typeof valueOrFn === "function" ? valueOrFn(store.worlds) : valueOrFn;

      return { worlds: result };
    }),

  deleteWorld: (payload: string) => {
    set(store => {
      const newWorlds = { ...store.worlds };

      delete newWorlds[payload];

      if (store.activeWorldName === payload) {
        const sortedNewWorlds = sortByOrder(newWorlds);
        const newActiveWorld = sortedNewWorlds[0];

        return { worlds: newWorlds, activeWorldName: newActiveWorld[0] };
      }

      return { worlds: newWorlds };
    });
  },

  selectWorld: (payload: string) => {
    set(store => {
      const newActiveWorld = store.worlds[payload];
      const { totalSeconds, minutes, hours } = newActiveWorld.initialTime;
      const totalMinutes = secondsToMinutes(totalSeconds);

      return {
        activeWorldName: payload,
        time: totalSeconds,
        minutes,
        hours: hours,
        totalMinutes,
        sunAngle: calculateSunAngle(totalSeconds),
        currentColors: colors.get(totalMinutes) || [
          { r: 255, g: 255, b: 255 },
          { r: 255, g: 255, b: 255 },
        ],
      };
    });
  },

  setActiveWorldName: (payload: string) => set({ activeWorldName: payload }),

  setTime: (valueOrFn: number | ((prev: number) => number)) =>
    set(store => {
      const time = typeof valueOrFn === "function" ? valueOrFn(store.time) : valueOrFn;
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
