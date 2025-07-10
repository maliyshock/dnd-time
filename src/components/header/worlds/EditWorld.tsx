import { SelectTime } from "~/components/ui/time/SelectTime.tsx";
import { Input } from "~/components/ui/input.tsx";
import { SHDButton } from "~/components/ui/shd-button.tsx";
import { Check } from "lucide-react";
import { useMemo, useState } from "react";
import useStore from "~/store/useStore.ts";
import { HOURS_OPTIONS, MINUTES_OPTIONS } from "~/constants.ts";

export type OnSubmitArgs = {
  hours: number;
  minutes: number;
  name: string;
};

type EditWorldProps = {
  onSubmit({ hours, minutes, name }: OnSubmitArgs): void;
};

export function EditWorld({ onSubmit }: EditWorldProps) {
  const [name, setName] = useState("");
  const [hour, setHour] = useState("00");
  const [minute, setMinute] = useState("00");

  const worlds = useStore(store => store.worlds);
  const worldNames = useMemo(() => Object.keys(worlds), [worlds]);

  return (
    <>
      <SelectTime value={hour} onChange={setHour} options={HOURS_OPTIONS} />
      :
      <SelectTime value={minute} onChange={setMinute} options={MINUTES_OPTIONS} />
      <Input type="text" placeholder="World name" className="w-full flex-1" value={name} onChange={e => setName(e.target.value)} />
      <div className="flex gap-2">
        <SHDButton
          variant="secondary"
          className=""
          disabled={name.length === 0}
          onClick={() => {
            if (worldNames.includes(name)) {
              // TODO: case name exist already -> show error
              return;
            }

            if (name === "") {
              // TODO: case empty name -> show error
              return;
            }

            const convertedHours = Number(hour);
            const convertedMinutes = Number(minute);

            onSubmit({ hours: convertedHours, minutes: convertedMinutes, name });
          }}
        >
          <Check />
        </SHDButton>
      </div>
    </>
  );
}
