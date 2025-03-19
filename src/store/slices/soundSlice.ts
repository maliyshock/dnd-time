import { StateCreator } from "zustand";

export type SoundSlice = {
  soundOn: boolean;
  setSoundOn: (isOn: boolean) => void;
  setSoundToggle: () => void;
};

const initialState = {
  soundOn: false,
};

export const soundSlice: StateCreator<SoundSlice, [], [], SoundSlice> = set => ({
  ...initialState,
  setSoundToggle: () => set(store => ({ soundOn: !store.soundOn })),
  setSoundOn: (payload: boolean) => set({ soundOn: payload }),
});
