import { formatTime } from "~/utils/time/formatTime.ts";
import "../clocks.scss";
import { HTMLAttributes, memo } from "react";
import { useGetPlaySample } from "~/hooks/useGetPlaySample.ts";
import { TimeChanger } from "~/components/clocks/components/TimeChanger.tsx";
import useStore from "~/store/useStore.ts";
import { HOUR_STEPS, MINUTE_STEPS, SECOND_STEPS } from "~/constants.ts";
import { getSeconds } from "~/utils/time/getSeconds.ts";

type TimeType = "hours" | "minutes" | "seconds";

type TimeItemProps = {
  fadeOut?: boolean;
  raiserVariation?: number;
  descenderVariation?: number;
  onTimeChange: (step: number) => void;
  timeType: TimeType;
} & HTMLAttributes<HTMLDivElement>;

function getSteps(timeType: TimeType) {
  switch (timeType) {
    case "hours":
      return HOUR_STEPS;
    case "minutes":
      return MINUTE_STEPS;
    case "seconds":
      return SECOND_STEPS;
  }
}

export function TimeItem({ timeType, onTimeChange, ...props }: TimeItemProps) {
  const timeValue = useStore(store => store[timeType === "seconds" ? "time" : timeType]);
  const playSample = useGetPlaySample({ name: "bip", shift: true });
  const steps = getSteps(timeType);

  return (
    <div {...props} className="clocks__item-wrapper rounded-4xl py-2">
      <TimeChanger
        steps={steps}
        onChange={stepValue => {
          playSample();
          onTimeChange(stepValue);
        }}
      />

      <div className={`clocks__item  ${timeType === "seconds" ? "fade-out" : ""}`}>
        {formatTime(timeType === "seconds" ? getSeconds(timeValue) : timeValue)}
      </div>

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
