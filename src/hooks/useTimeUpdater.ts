import { useEffect } from "react";
import { updateTime } from "~/utils/time/updateTime.ts";
import { SECOND } from "~/constants.ts";
import useStore from "~/store/useStore.ts";

type UseTimeUpdater = {
  initTime?: number;
};

export const useTimeUpdater = (props?: UseTimeUpdater) => {
  const play = useStore(store => store.play);
  const timeIsChanging = useStore(store => store.timeIsChanging);
  const setTime = useStore(store => store.setTime);

  useEffect(() => {
    if (props?.initTime !== undefined) {
      setTime(() => props.initTime!);
    }
  }, [props?.initTime, setTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (play && !timeIsChanging) {
        setTime((prevTime: number) => updateTime(prevTime, SECOND));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [play, setTime, timeIsChanging]);
};
