import { formatTime } from "~/utils/time/formatTime.ts";
import "../clocks.scss";
import { memo, useRef } from "react";
import { Up } from "~/components/ui/icons/up.tsx";
import { getRandomNum } from "~/utils/getRandomNum.ts";
import useStore from "~/store/useStore.ts";
import { Button } from "~/components/ui/button";
import { useGetPlaySample } from "~/hooks/useGetPlaySample.ts";

type TimeItemProps = {
  value: number;
  fadeOut?: boolean;
  step: number;
  raiserVariation?: number;
  descenderVariation?: number;
  onTimeChange: (step: number) => void;
};

export function TimeItem({ value, fadeOut = false, step, onTimeChange, raiserVariation, descenderVariation }: TimeItemProps) {
  const upVariation = useRef(raiserVariation || getRandomNum({ max: 2 }));
  const downVariation = useRef(descenderVariation || getRandomNum({ max: 2 }));
  const cmdIsPressed = useStore(store => store.cmdIsPressed);
  const playSample = useGetPlaySample({ name: "bip", shift: true });

  return (
    <div className="clocks__item-wrapper">
      <div className="clocks__item-changer-wrapper">
        <Button
          className={`clocks__item-changer clocks__clickable-item riser ${cmdIsPressed ? "fade-in" : ""}`}
          onClick={() => {
            onTimeChange(step);
            playSample();
          }}
        >
          <Up variation={upVariation.current} />
        </Button>
      </div>

      <div className={`clocks__item  ${fadeOut ? "fade-out" : ""}`}>{formatTime(value)}</div>

      <div className="clocks__item-changer-wrapper">
        <Button
          className={`clocks__item-changer clocks__clickable-item descender ${cmdIsPressed ? "fade-in" : ""}`}
          onClick={() => {
            onTimeChange(-step);
            playSample();
          }}
        >
          <Up variation={downVariation.current} />
        </Button>
      </div>
    </div>
  );
}

export const MemoizedTimeItem = memo(TimeItem);
