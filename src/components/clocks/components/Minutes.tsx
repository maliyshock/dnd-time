import { MemoizedTimeItem } from "~/components/clocks/components/TimeItem.tsx";
import useStore from "~/store/useStore.ts";
import { MINUTE_STEPS } from "~/constants.ts";
import { useCallback } from "react";
import { updateTime } from "~/utils/time/updateTime.ts";

type MinutesProps = {
  onTimeChange(): void;
};

export function Minutes({ onTimeChange }: MinutesProps) {
  const minutes = useStore(store => store.minutes);
  const setTime = useStore(store => store.setTime);

  const handleTimeChange = useCallback(
    (step: number) => {
      setTime(prevTime => updateTime(prevTime, step));
      onTimeChange();
    },
    [onTimeChange, setTime],
  );

  return <MemoizedTimeItem steps={MINUTE_STEPS} value={minutes} onTimeChange={handleTimeChange} />;
}
