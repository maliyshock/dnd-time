import { StateCreator } from "zustand";

export type CmdSlice = {
  cmdIsPressed: boolean;
  setCmdIsPressed: (isPressed: boolean) => void;
};

const initialState = {
  cmdIsPressed: false,
  setCmdIsPressed: () => null,
};

export const cmdSlice: StateCreator<CmdSlice, [], [], CmdSlice> = set => ({
  ...initialState,
  setCmdIsPressed: (payload: boolean) => set({ cmdIsPressed: payload }),
});
