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
    <form className={cn(`flex w-full items-center gap-2  px-6 justify-between ${className || ""}`)}>
      <SelectTime name="hours" value={hour} onChange={setHour} options={HOURS_OPTIONS} />
      :
      <SelectTime name="minutes" value={minute} onChange={setMinute} options={MINUTES_OPTIONS} />
      <div className="flex items-center gap-2">
        <Input type="text" placeholder="World name" name="worldName" className="w-full flex-1" value={name} onChange={e => setName(e.target.value)} />

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
      <Separator orientation="vertical" className="min-h-8" />
      <div className="flex gap-2">
        <SHDButton
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

        <SHDButton
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
