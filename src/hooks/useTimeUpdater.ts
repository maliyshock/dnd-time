import { useEffect } from "react";
import { updateTime } from "~/utils/time/updateTime.ts";
import { SECOND } from "~/constants.ts";
import useStore from "~/store/useStore.ts";

type UseTimeUpdater = {
  initTime?: number;
};

export const useTimeUpdater = (props?: UseTimeUpdater) => {
  const play = useStore(store => store.play);
  const setTime = useStore(store => store.setTime);
  const time = useStore(store => store.time);

  useEffect(() => {
    if (props?.initTime !== undefined) {
      setTime(props.initTime);
    }
  }, [props?.initTime, setTime]);

  useEffect(() => {
    if (play) {
      const interval = setInterval(() => {
        setTime(updateTime(time, SECOND));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [play, setTime, time]);
};
