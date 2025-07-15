import { useCallback, useState } from "react";
import { SHDButton } from "~/components/ui/shd-button";
import { XIcon } from "lucide-react";
import { EditWorld, OnSubmitArgs } from "~/components/header/worlds/EditWorld.tsx";
import useStore from "~/store/useStore.ts";
import { WorldStorage } from "~/types.ts";
import { getTotalSeconds } from "~/utils/time/getTotalSeconds.ts";

export function AddNewWorld() {
  const [showAddNew, setShowAddNew] = useState(false);
  const setWorlds = useStore(store => store.setWorlds);

  //TODO: perhaps should exist as a store method
  const handleAdd = useCallback(
    ({ name, hours, minutes }: OnSubmitArgs) => {
      const worldStorageString = localStorage.getItem("worldStorage");
      let worldStorage: WorldStorage = {};

      if (worldStorageString) {
        //TODO: add order

        worldStorage = JSON.parse(worldStorageString);

        worldStorage = {
          ...worldStorage,
          [name]: {
            name,
            order: Math.floor(Date.now() / 1000),
            initialTime: {
              hours,
              minutes,
              seconds: 0,
              totalSeconds: getTotalSeconds({ hours, minutes }),
            },
          },
        };

        setWorlds(worldStorage);
      }
    },
    [setWorlds],
  );

  return (
    <>
      {showAddNew ? (
        <section className="flex w-full items-center gap-4">
          <EditWorld onSubmit={handleAdd} />
          <SHDButton variant="secondary" className="" onClick={() => setShowAddNew(false)}>
            <XIcon />
          </SHDButton>
        </section>
      ) : (
        <SHDButton type="button" variant="default" className="w-full text-xl" size="lg" onClick={() => setShowAddNew(true)}>
          Add +
        </SHDButton>
      )}
    </>
  );
}
