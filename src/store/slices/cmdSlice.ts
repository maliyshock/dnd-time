import { StateCreator } from "zustand";

// TODO: rename it - there should not be cmd
export type CmdSlice = {
  cmdIsPressed: boolean;
  setCmdIsPressed: (isPressed: boolean) => void;
};

const initialState = {
  cmdIsPressed: false,
};

export const cmdSlice: StateCreator<CmdSlice, [], [], CmdSlice> = set => ({
  ...initialState,
  setCmdIsPressed: (payload: boolean) => set({ cmdIsPressed: payload }),
});
