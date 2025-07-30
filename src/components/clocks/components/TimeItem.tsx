import { formatTime } from "~/utils/time/formatTime.ts";
import "../clocks.scss";
import { memo } from "react";
import { useGetPlaySample } from "~/hooks/useGetPlaySample.ts";
import { Step } from "~/utils/generateSteps.ts";
import { TimeChanger } from "~/components/clocks/components/TimeChanger.tsx";

type TimeItemProps = {
  value: number;
  fadeOut?: boolean;
  steps: Step[];
  raiserVariation?: number;
  descenderVariation?: number;
  onTimeChange: (step: number) => void;
};

export function TimeItem({ value, fadeOut = false, steps, onTimeChange }: TimeItemProps) {
  const playSample = useGetPlaySample({ name: "bip", shift: true });

  return (
    <div className="clocks__item-wrapper">
      <TimeChanger
        steps={steps}
        onChange={stepValue => {
          playSample();
          onTimeChange(stepValue);
        }}
      />

      <div className={`clocks__item  ${fadeOut ? "fade-out" : ""}`}>{formatTime(value)}</div>

      <TimeChanger
        steps={steps}
        descender
        onChange={stepValue => {
          playSample();
          onTimeChange(stepValue);
        }}
      />
    </div>
  );
}

export const MemoizedTimeItem = memo(TimeItem);
