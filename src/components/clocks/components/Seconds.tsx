import { TimeItem } from "~/components/clocks/components/TimeItem.tsx";
import useStore from "~/store/useStore.ts";
import { SECOND } from "~/constants.ts";
import { useCallback } from "react";
import { updateTime } from "~/utils/time/updateTime.ts";
import { getSeconds } from "~/utils/time/getSeconds.ts";

type SecondsProps = {
  onTimeChange(): void;
};

export function Seconds({ onTimeChange }: SecondsProps) {
  const time = useStore(store => store.time);
  const seconds = getSeconds(time);
  const setTime = useStore(store => store.setTime);

  const handleTimeChange = useCallback(
    (step: number) => {
      setTime(prevTime => updateTime(prevTime, step));
      onTimeChange();
    },
    [onTimeChange, setTime],
  );

  return <TimeItem fadeOut step={SECOND} value={seconds} onTimeChange={handleTimeChange} />;
}
