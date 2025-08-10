import { useCallback, useRef } from "react";
import "./clocks.scss";
import useStore from "~/store/useStore.ts";
import { useTimeUpdater } from "~/hooks/useTimeUpdater.ts";
import { useTimeKeeper } from "~/hooks/useTimeKeeper.ts";
import { MemoizedTimeItem } from "~/components/clocks/components/TimeItem.tsx";

export default function Clocks() {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const setTimeIsChanging = useStore(store => store.setTimeIsChanging);
  const setTime = useStore(store => store.setTime);

  useTimeUpdater(); // causes rerender when play changes
  useTimeKeeper(); // causes rerender every second

  const handleTimeChange = useCallback(
    (step: number) => {
      if (timer.current !== null) {
        clearTimeout(timer.current);
      }

      setTime(prev => prev + step);

      timer.current = setTimeout(() => setTimeIsChanging(false), 500);
      setTimeIsChanging(true);
    },
    [setTime, setTimeIsChanging],
  );

  return (
    <div className="clocks">
      <div className="clocks__display">
        <MemoizedTimeItem timeType="hours" tabIndex={0} onTimeChange={handleTimeChange} />
        :
        <MemoizedTimeItem timeType="minutes" tabIndex={1} onTimeChange={handleTimeChange} />
        :
        <MemoizedTimeItem timeType="seconds" tabIndex={2} onTimeChange={handleTimeChange} />
      </div>
    </div>
  );
}
