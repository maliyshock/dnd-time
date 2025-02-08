import { useCallback, useEffect, useRef } from "react";
import "./clocks.scss";
import useStore from "~/store/useStore.ts";
import { MemoizedTimeItem, TimeItem } from "~/components/clocks/components/TimeItem.tsx";
import { getRandomNum } from "~/utils/getRandomNum.ts";
import { Player } from "~/components/clocks/components/Player.tsx";
import { updateTime } from "~/utils/updateTime.ts";
import { HOUR, MINUTE, SECOND } from "~/constants.ts";
import { getHours } from "~/utils/getHours.ts";
import { getMinutes } from "~/utils/getMinutes.ts";
import { getSeconds } from "~/utils/getSeconds.ts";
import { useTimeUpdater } from "~/hooks/useTimeUpdater.ts";

export default function Clocks() {
  const play = useStore(store => store.play);
  const setPlay = useStore(store => store.setPlay);
  const totalSeconds = useStore(store => store.totalSeconds);
  const setTotalSeconds = useStore(store => store.setTime);

  const memoryBank = useRef<boolean | null>(null);
  const playRef = useRef(play);
  const timeChangeRef = useRef<NodeJS.Timeout>(null);
  const upVariation = useRef(getRandomNum(2));
  const downVariation = useRef(getRandomNum(2));

  const hours = getHours(totalSeconds);
  const minutes = getMinutes(totalSeconds);
  const seconds = getSeconds(totalSeconds);

  const timeHandler = useCallback(() => {
    if (memoryBank.current === false && playRef.current === true) {
      return;
    }

    if (memoryBank.current === true && playRef.current === false) {
      setPlay(true);
    }

    timeChangeRef.current = null;
  }, [setPlay]);

  const handleTimeChange = useCallback(
    (step: number) => {
      // remember what was the play value on the moment of the call
      memoryBank.current = timeChangeRef.current === null ? play : memoryBank.current;
      if (play) {
        setPlay(false);
      }

      // throttle
      setTotalSeconds(updateTime(totalSeconds, step));
      timeChangeRef.current = timeChangeRef.current || setTimeout(timeHandler, 500);
    },
    [play, setPlay, setTotalSeconds, timeHandler, totalSeconds],
  );

  useTimeUpdater();

  useEffect(() => {
    playRef.current = play;
  }, [play]);

  return (
    <div className="clocks">
      <div className="clocks__player-wrapper">
        <Player />
      </div>

      <div className="clocks__display">
        <MemoizedTimeItem step={HOUR} value={hours} onTimeChange={handleTimeChange} />
        :
        <MemoizedTimeItem step={MINUTE} value={minutes} onTimeChange={handleTimeChange} />
        :
        <TimeItem
          descenderVariation={downVariation.current}
          fadeOut
          raiserVariation={upVariation.current}
          step={SECOND}
          value={seconds}
          onTimeChange={handleTimeChange}
        />
      </div>
    </div>
  );
}
