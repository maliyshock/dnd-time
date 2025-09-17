import { useCallback, useState } from "react";
import { SHDButton } from "~/components/ui/shadcn/shd-button.tsx";
import { WorldForm, OnSubmitArgs } from "~/components/header/worlds/WorldForm.tsx";
import useStore from "~/store/useStore.ts";
import { getTotalSeconds } from "~/utils/time/getTotalSeconds.ts";

import { cn } from "~/utils/cn.ts";

export function AddNewWorld() {
  const [showAddNew, setShowAddNew] = useState(false);
  const addWorld = useStore(store => store.addWorld);

  //TODO: perhaps should exist as a store method
  const handleAdd = useCallback(
    ({ name, hours, minutes }: OnSubmitArgs) => {
      const newWorld = {
        id: globalThis.crypto.randomUUID(),
        name,
        order: Math.floor(Date.now() / 1000),
        initialTime: {
          hours,
          minutes,
          seconds: 0,
          totalSeconds: getTotalSeconds({ hours, minutes }),
        },
      };

      addWorld(newWorld);
    },
    [addWorld],
  );

  return (
    <>
      {showAddNew ? (
        <WorldForm className={cn("bg-background")} onSubmit={handleAdd} onCancel={() => setShowAddNew(false)} />
      ) : (
        <SHDButton type="button" variant="default" className="w-full text-2xl rounded-t-none" size="xl" onClick={() => setShowAddNew(true)}>
          Add +
        </SHDButton>
      )}
    </>
  );
}
