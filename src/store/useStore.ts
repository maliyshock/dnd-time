import { create } from "zustand";
import { TimeSlice, timeSlice } from "~/store/slices/timeSlice.ts";
import { CmdSlice, cmdSlice } from "~/store/slices/cmdSlice.ts";
import { CloudSlice, cloudsSlice } from "~/store/slices/cloudsSlice.ts";
import { SoundSlice, soundSlice } from "~/store/slices/soundSlice.ts";
import { subscribeWithSelector } from "zustand/middleware";

type StoreState = TimeSlice & CmdSlice & CloudSlice & SoundSlice;

export const useStore = create<StoreState>()(
  subscribeWithSelector((...a) => ({
    ...timeSlice(...a),
    ...cmdSlice(...a),
    ...cloudsSlice(...a),
    ...soundSlice(...a),
  })),
);

export default useStore;
