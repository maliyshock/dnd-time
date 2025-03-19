import { create } from "zustand";
import { TimeSlice, timeSlice } from "~/store/slices/timeSlice.ts";
import { CmdSlice, cmdSlice } from "~/store/slices/cmdSlice.ts";
import { CloudSlice, cloudsSlice } from "~/store/slices/cloudsSlice.ts";
import { SoundSlice, soundSlice } from "~/store/slices/soundSlice.ts";

const useStore = create<TimeSlice & CmdSlice & CloudSlice & SoundSlice>()((...a) => ({
  ...timeSlice(...a),
  ...cmdSlice(...a),
  ...cloudsSlice(...a),
  ...soundSlice(...a),
}));

export default useStore;
