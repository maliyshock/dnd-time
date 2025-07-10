import useStore from "~/store/useStore.ts";
import { useMemo } from "react";
import { MemoizedWorldItem } from "~/components/header/worlds/WorldItem.tsx";
import { sortByOrder } from "~/utils/worlds/sortByOrder.ts";

export function WorldsList() {
  const actualHours = useStore(store => store.hours);
  const actualMinutes = useStore(store => store.minutes);
  const activeWorldName = useStore(store => store.activeWorldName);
  const worlds = useStore(store => store.worlds);
  const sortedWorlds = useMemo(() => sortByOrder(worlds), [worlds]);

  const memoWorlds = useMemo(() => {
    return sortedWorlds.map(([, worldItem], index) => {
      const isActive = activeWorldName === worldItem.name;

      return (
        <MemoizedWorldItem
          isLast={sortedWorlds.length === 1}
          isActive={isActive}
          key={index}
          hours={isActive ? actualHours : worldItem.initialTime.hours}
          minutes={isActive ? actualMinutes : worldItem.initialTime.minutes}
          name={worldItem.name}
        />
      );
    });
  }, [activeWorldName, actualHours, actualMinutes, sortedWorlds]);

  return <ul className="my-2 ml-6 list-disc [&>li]:mt-2">{memoWorlds}</ul>;
}
