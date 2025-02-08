import { formatTime } from "~/utils/formatTime.ts";
import "../clocks.scss";
import { memo, useRef } from "react";
import { Up } from "~/components/icons/up.tsx";
import { getRandomNum } from "~/utils/getRandomNum.ts";
import useStore from "~/store/useStore.ts";

type TimeItemProps = {
  value: number;
  fadeOut?: boolean;
  step: number;
  raiserVariation?: number;
  descenderVariation?: number;
  onTimeChange: (step: number) => void;
};

export function TimeItem({ value, fadeOut = false, step, onTimeChange, raiserVariation, descenderVariation }: TimeItemProps) {
  const upVariation = useRef(raiserVariation || getRandomNum(2));
  const downVariation = useRef(descenderVariation || getRandomNum(2));
  const cmdIsPressed = useStore(store => store.cmdIsPressed);

  return (
    <div className="clocks__item-wrapper">
      <div className="clocks__item-changer-wrapper">
        <button className={`clocks__item-changer riser ${cmdIsPressed ? "fade-in" : ""}`} onClick={() => onTimeChange(step)}>
          <Up variation={upVariation.current} />
        </button>
      </div>

      <div className={`clocks__item ${fadeOut ? "fade-out" : ""}`}>{formatTime(value)}</div>

      <div className="clocks__item-changer-wrapper">
        <button className={`clocks__item-changer descender ${cmdIsPressed ? "fade-in" : ""}`} onClick={() => onTimeChange(-step)}>
          <Up variation={downVariation.current} />
        </button>
      </div>
    </div>
  );
}

export const MemoizedTimeItem = memo(TimeItem);
