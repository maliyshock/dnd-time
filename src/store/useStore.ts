import { create } from "zustand";
import { TimeSlice, timeSlice } from "~/store/slices/timeSlice.ts";
import { CmdSlice, cmdSlice } from "~/store/slices/cmdSlice.ts";
import { CloudSlice, cloudsSlice } from "~/store/slices/cloudsSlice.ts";

const useStore = create<TimeSlice & CmdSlice & CloudSlice>()((...a) => ({
  ...timeSlice(...a),
  ...cmdSlice(...a),
  ...cloudsSlice(...a),
}));

export default useStore;
