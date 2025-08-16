import { SelectTime } from "~/components/ui/time/SelectTime.tsx";
import { Input } from "~/components/ui/shadcn/input.tsx";
import { SHDButton } from "~/components/ui/shadcn/shd-button.tsx";
import { Check, Ban, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { HOURS_OPTIONS, MINUTES_OPTIONS } from "~/constants.ts";
import { generateWorldName } from "~/utils/worlds/generateWorldName.ts";
import { Separator } from "~/components/ui/shadcn/separator.tsx";
import { cn } from "~/utils/cn.ts";
import { formatTime } from "~/utils/time/formatTime.ts";
import { Label } from "~/components/ui/shadcn/label.tsx";
import "./world-form.scss";

export type OnSubmitArgs = {
  hours: number;
  minutes: number;
  name: string;
};

type EditWorldProps = {
  className?: string;
  initHours?: number;
  initMinutes?: number;
  initName?: string;
  onSubmit({ hours, minutes, name }: OnSubmitArgs): void;
  onCancel(): void;
};

function getInitValue(initValue: number | undefined, allowedValues: string[]) {
  if (!initValue) return allowedValues[0];
  const formatedValue = String(formatTime(initValue));

  if (allowedValues.includes(formatedValue)) {
    return formatedValue;
  }

  return allowedValues.find(val => val[0] === formatedValue[0]) || allowedValues[0];
}

export function WorldForm({ initHours, initMinutes, initName, onSubmit, onCancel, className }: EditWorldProps) {
  const [name, setName] = useState<string>(initName || generateWorldName());
  const [hour, setHour] = useState<string>(getInitValue(initHours, HOURS_OPTIONS));
  const [minute, setMinute] = useState<string>(getInitValue(initMinutes, MINUTES_OPTIONS));

  return (
    <form className={cn(`world-form w-full gap-y-4 md:gap-y-0 gap-x-2 py-4 md:py-0 px-6 ${className || ""}`)}>
      <SelectTime
        className="world-form__item grid gap-0 col-span-2 md:col-auto w-full md:w-18"
        label="Hours"
        name="hours"
        value={hour}
        onChange={setHour}
        options={HOURS_OPTIONS}
      />

      <div aria-hidden="true" className="world-form__item grid ">
        <span className="self-center justify-self-center -translate-y-1 md:translate-y-0">:</span>
      </div>

      <SelectTime
        className="world-form__item grid gap-0 col-span-2 md:col-auto w-full md:w-18"
        label="Minutes"
        name="minutes"
        value={minute}
        onChange={setMinute}
        options={MINUTES_OPTIONS}
      />

      <div className="world-form__item grid col-span-4 md:col-auto">
        <Label htmlFor="worldName">World Name</Label>
        <Input
          id="worldName"
          type="text"
          placeholder="World name"
          name="worldName"
          className="w-full flex-1 "
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>

      <div className="world-form__item grid">
        <SHDButton
          type="button"
          variant="ghost"
          onClick={e => {
            e.stopPropagation();
            setName(generateWorldName());
          }}
          aria-label="Regenerate the world name"
        >
          <RefreshCcw />
        </SHDButton>
      </div>

      <div className="world-form__item hidden md:grid ">
        <Separator orientation="vertical" className="min-h-8 separator--full mr-2" />
      </div>

      <div className="world-form__item grid col-span-2 md:col-auto">
        <SHDButton
          className="row-3 md:row-auto"
          type="button"
          aria-label="Submit edit"
          name="worldName"
          variant="default"
          disabled={name.length === 0}
          onClick={() => {
            const convertedHours = Number(hour);
            const convertedMinutes = Number(minute);

            onSubmit({ hours: convertedHours, minutes: convertedMinutes, name });
          }}
        >
          <Check />
        </SHDButton>
      </div>

      <div className="world-form__item grid col-start-4 md:col-start-auto col-span-2 md:col-auto">
        <SHDButton
          className="row-3 md:row-auto"
          type="button"
          variant="outline"
          onClick={e => {
            e.stopPropagation();
            onCancel();
          }}
          aria-label="Cancel edit"
        >
          <Ban />
        </SHDButton>
      </div>
    </form>
  );
}
