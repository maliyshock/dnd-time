import { useCallback, useEffect, useRef } from "react";
import { updateTime } from "~/utils/time/updateTime.ts";
import { SECOND, TICK } from "~/constants.ts";
import useStore from "~/store/useStore.ts";
import { getNow } from "~/utils/time/getNow.ts";
import { formatTime } from "~/utils/time/formatTime.ts";
import { calculateTimeDiff } from "~/utils/time/calculateTimeDiff.ts";

export const useTimeUpdater = () => {
  const play = useStore(store => store.play);
  const timeIsChanging = useStore(store => store.timeIsChanging);
  const setTime = useStore(store => store.setTime);
  const time = useStore(store => store.time);

  const timeIntervalRef = useRef<undefined | NodeJS.Timeout>(undefined);

  const handleAppTime = useCallback(() => {
    if (!play) return;
    if (document.hidden) {
      localStorage.setItem("lastActive", JSON.stringify(Date.now()));
    } else {
      // calculate delta in time since we left off
      const expectedTime = calculateTimeDiff();

      if (expectedTime) {
        setTime(() => expectedTime);
        localStorage.removeItem("lastActive");
      }
    }
  }, [play, setTime]);

  const startTimeInterval = useCallback(() => {
    timeIntervalRef.current = setInterval(() => {
      if (play && !timeIsChanging) {
        setTime((prevTime: number) => updateTime(prevTime, SECOND));
      }
    }, TICK);
  }, [play, setTime, timeIsChanging]);

  const handleVisibilityChange = useCallback(() => {
    clearInterval(timeIntervalRef.current);
    if (!document.hidden) {
      startTimeInterval();
    }

    handleAppTime();
  }, [handleAppTime, startTimeInterval]);

  useEffect(() => {
    // remember the time every time its changes
    localStorage.setItem("lastActiveAppTime", JSON.stringify(time));
    const { hours, minutes } = getNow(time);

    document.title = `DND Timer – ${formatTime(hours)} : ${formatTime(minutes)}`;
  }, [time]);

  // initial interval start
  useEffect(() => {
    startTimeInterval();

    return () => clearInterval(timeIntervalRef.current);
  }, [startTimeInterval]);

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [handleVisibilityChange]);
};
