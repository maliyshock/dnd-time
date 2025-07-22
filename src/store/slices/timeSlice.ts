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
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

export type TimeSlice = {
  activeWorldId: string;
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
  addWorld: (world: World) => void;
  selectWorld: (payload: string) => void;
  deleteWorld: (payload: string) => void;
  setActiveWorldId: (payload: string) => void;
  setPlay: (payload: boolean) => void;
  setTogglePlay: () => void;
  setTimeIsChanging: (payload: boolean) => void;
  setTime: (valueOrFn: number | ((prev: number) => number)) => void;
};

// get last active world name and time based on the info from the local storage
const currentWorldId = localStorage.getItem("lastActiveWorldId");
const defaultId = uuidv4();
const defaultWorld = { id: defaultId, name: "Untitled World", initialTime: getNow(), order: 0 };
const worlds = getWorlds() ?? { [defaultId]: defaultWorld };

const currentWorld: World = currentWorldId ? worlds[currentWorldId] || defaultWorld : defaultWorld;
const { totalSeconds, minutes, hours } = currentWorld.initialTime;
const totalMinutes = secondsToMinutes(totalSeconds);
const colors = generateColors();

const initialState = {
  activeWorldId: currentWorld.id,
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

  deleteWorld: (id: string) => {
    set(store => {
      const newWorlds = { ...store.worlds };

      delete newWorlds[id];

      if (store.activeWorldId === id) {
        const sortedNewWorlds = sortByOrder(newWorlds);
        const newActiveWorld = sortedNewWorlds[0];

        return { worlds: newWorlds, activeWorldId: newActiveWorld[0] };
      }

      return { worlds: newWorlds };
    });
  },

  addWorld: (world: World) =>
    set(store => {
      // validation rules
      const worldNames = Object.entries(store.worlds).map(([, world]) => world.name);

      if (worldNames.includes(world.name) && !(world.id in store.worlds)) {
        // TODO: validation case name exist already -> show error
        toast("World with this name exist already", {
          // description: "Sunday, December 03, 2023 at 9:00 AM",
          // action: {
          //   label: "Undo",
          //   onClick: () => console.log("Undo"),
          // },
        });

        return store;
      }

      if (world.name === "") {
        // TODO: validation case empty name -> show error
        toast("World name could not be empty", {
          // description: "Sunday, December 03, 2023 at 9:00 AM",
          // action: {
          //   label: "Undo",
          //   onClick: () => console.log("Undo"),
          // },
        });

        return store;
      }

      return { worlds: { ...store.worlds, [world.id]: world } };
    }),

  selectWorld: (id: string) => {
    set(store => {
      const newActiveWorld = store.worlds[id];

      const { totalSeconds, minutes, hours } = newActiveWorld.initialTime;
      const totalMinutes = secondsToMinutes(totalSeconds);

      return {
        activeWorldId: id,
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

  setActiveWorldId: (id: string) => set({ activeWorldId: id }),

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
