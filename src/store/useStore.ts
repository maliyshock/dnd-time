import { create } from "zustand";
import { TimeSlice, timeSlice } from "~/store/slices/time.ts";
import { CmdSlice, cmdSlice } from "~/store/slices/cmdSlice.ts";

const useStore = create<TimeSlice & CmdSlice>()((...a) => ({
  ...timeSlice(...a),
  ...cmdSlice(...a),
}));

export default useStore;
