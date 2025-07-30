import { Step } from "~/utils/generateSteps.ts";
import { useMemo, useRef, useState } from "react";
import { getRandomNum } from "~/utils/getRandomNum.ts";
import useStore from "~/store/useStore.ts";
import { Button } from "~/components/ui/button";
import { Up } from "~/components/ui/icons/Up.tsx";
import "./time-changer.scss";

type TimeChangerProps = {
  steps: Step[];
  descender?: boolean;
  onChange: (step: number) => void;
};

export function TimeChanger({ steps, descender = false, onChange }: TimeChangerProps) {
  const arrowVariation = useRef(getRandomNum({ max: 2 }));
  const highlight = useStore(store => store.cmdIsPressed);
  const [step, setStep] = useState<Step>(steps[0]);
  const filteredSteps = useMemo(() => {
    const result = steps.filter(item => item.id !== step.id);

    if (!descender) {
      return result.reverse();
    }

    return result;
  }, [descender, step.id, steps]);

  return (
    <div className={`clocks__item-changer-wrapper time-changer ${descender ? "descender" : ""} ${highlight ? "highlighted" : ""}`}>
      <div className="time-changer__button-wrapper flex justify-center items-center">
        <Button className="time-changer__button pointer-events-auto" onMouseDown={() => onChange(descender ? -step.value : step.value)}>
          <span className={`time-changer__value absolute ${String(step.label).length > 1 ? "text-xs md:text-xl" : "text-lg md:text-2xl"}`}>{step.label}</span>
          <Up className="time-changer__icon" variation={arrowVariation.current} />
        </Button>
      </div>

      <div className="time-changer__steps-wrapper">
        <ul className="time-changer__steps rounded-4xl">
          {filteredSteps.map((item, i) => (
            <li className={`time-changer__step-item ${String(item.label).length > 1 ? "text-xl" : "text-2xl"}`} key={i}>
              <button className="time-changer__step-button" onClick={() => setStep(item)}>
                <span className="time-changer__step-value">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
