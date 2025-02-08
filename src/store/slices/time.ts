import { StateCreator } from "zustand";
import { HOUR, MINUTE } from "~/constants.ts";

export type TimeSlice = {
  speed: number;
  totalSeconds: number;
  play: boolean;
  setPlay: (payload: boolean) => void;
  setTime: (payload: number) => void;
};

const now = new Date();
const hours = now.getHours();
const minutes = now.getMinutes();
const seconds = now.getSeconds();

const initialState = {
  speed: 1,
  play: true,
  totalSeconds: hours * HOUR + minutes * MINUTE + seconds,
};

export const timeSlice: StateCreator<TimeSlice, [], [], TimeSlice> = set => ({
  ...initialState,
  setPlay: (payload: boolean) => set({ play: payload }),
  setTime: (payload: number) => set({ totalSeconds: payload }),
});
