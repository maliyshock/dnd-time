import { MemoizedTimeItem } from "~/components/clocks/components/TimeItem.tsx";
import useStore from "~/store/useStore.ts";
import { HOUR_STEPS } from "~/constants.ts";
import { useCallback } from "react";
import { updateTime } from "~/utils/time/updateTime.ts";

type HoursProps = {
  onTimeChange(): void;
};

export function Hours({ onTimeChange }: HoursProps) {
  const hours = useStore(store => store.hours);
  const setTime = useStore(store => store.setTime);

  const handleTimeChange = useCallback(
    (step: number) => {
      setTime(prevTime => updateTime(prevTime, step));
      onTimeChange();
    },
    [onTimeChange, setTime],
  );

  return <MemoizedTimeItem steps={HOUR_STEPS} value={hours} onTimeChange={handleTimeChange} />;
}
