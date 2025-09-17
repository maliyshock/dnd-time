import { useCallback, useEffect, useRef } from "react";
import { SECOND, TICK } from "~/constants.ts";
import useStore from "~/store/useStore.ts";
import { calculateTimeDiff } from "~/utils/time/calculateTimeDiff.ts";
import { getStorageItem } from "~/utils/time/getStorageItem.ts";
import { useGetPlaySample } from "~/hooks/useGetPlaySample.ts";

// TODO: state changes cause root component to rerender
export const useTimeUpdater = () => {
  const play = useStore(store => store.play);
  const timeIsChanging = useStore(store => store.timeIsChanging);
  const setTime = useStore(store => store.setTime);
  const timeIntervalRef = useRef<undefined | NodeJS.Timeout>(undefined);
  const dropSample = useGetPlaySample({ name: "drop" });

  const handleTimeStorage = useCallback(() => {
    if (!play) return;

    if (document.hidden) {
      setTimeout(() => {
        // if it has been triggered then it is tab switch, not reload
        localStorage.setItem("lastAbsoluteTime", JSON.stringify(Date.now()));
      }, 300);
    } else {
      // calculate delta in time since we left off. Uses lastActive
      const lastActive = getStorageItem("lastAbsoluteTime");
      const lastActiveWorldTime = getStorageItem("lastActiveWorldTime");
      const expectedTime = calculateTimeDiff(lastActive, lastActiveWorldTime);

      if (expectedTime) {
        setTime(expectedTime);
        localStorage.removeItem("lastAbsoluteTime");
      }
    }
  }, [play, setTime]);

  const startTimeInterval = useCallback(() => {
    timeIntervalRef.current = setInterval(() => {
      if (play && !timeIsChanging) {
        setTime((prevTime: number) => prevTime + SECOND);
      }
    }, TICK);
  }, [play, setTime, timeIsChanging]);

  const handleVisibilityChange = useCallback(() => {
    clearInterval(timeIntervalRef.current);
    if (!document.hidden) {
      startTimeInterval();
    }

    handleTimeStorage();
  }, [handleTimeStorage, startTimeInterval]);

  // initial interval start
  useEffect(() => {
    startTimeInterval();

    return () => clearInterval(timeIntervalRef.current);
  }, [startTimeInterval]);

  useEffect(() => {
    dropSample();
  }, [dropSample, play]);

  // it triggers on page reload!
  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [handleVisibilityChange]);
};
