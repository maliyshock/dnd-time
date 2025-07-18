import { useCallback, useRef } from "react";
import "./clocks.scss";
import useStore from "~/store/useStore.ts";
import { Player } from "~/components/clocks/components/Player.tsx";
import { Hours } from "~/components/clocks/components/Hours.tsx";
import { Minutes } from "~/components/clocks/components/Minutes.tsx";
import { Seconds } from "~/components/clocks/components/Seconds.tsx";
import { useTimeUpdater } from "~/hooks/useTimeUpdater.ts";
import { useTimeKeeper } from "~/hooks/useTimeKeeper.ts";

export default function Clocks() {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const setTimeIsChanging = useStore(store => store.setTimeIsChanging);

  useTimeUpdater();
  useTimeKeeper();

  const handleTimeChange = useCallback(() => {
    if (timer.current !== null) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => setTimeIsChanging(false), 500);
    setTimeIsChanging(true);
  }, [setTimeIsChanging]);

  return (
    <div className="clocks">
      <div className="clocks__player-wrapper">
        <Player />
      </div>

      <div className="clocks__display">
        <Hours onTimeChange={handleTimeChange} />
        :
        <Minutes onTimeChange={handleTimeChange} />
        :
        <Seconds onTimeChange={handleTimeChange} />
      </div>
    </div>
  );
}
