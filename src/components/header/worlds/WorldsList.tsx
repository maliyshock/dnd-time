import useStore from "~/store/useStore.ts";
import { useMemo } from "react";
import { MemoizedWorldItem } from "~/components/header/worlds/world-item/WorldItem.tsx";
import { sortByOrder } from "~/utils/worlds/sortByOrder.ts";
import "./worlds-list.scss";
import { useConfirm } from "~/components/header/worlds/hooks/useConfirm.ts";

export function WorldsList() {
  const actualHours = useStore(store => store.hours);
  const actualMinutes = useStore(store => store.minutes);
  const activeWorldId = useStore(store => store.worlds[store.activeWorldId].id);
  const worlds = useStore(store => store.worlds);
  const sortedWorlds = useMemo(() => sortByOrder(worlds), [worlds]);
  const { showConfirmId } = useConfirm();

  const memoWorlds = useMemo(() => {
    return sortedWorlds.map(([, worldItem], index) => {
      const isActive = activeWorldId === worldItem.id;

      return (
        <MemoizedWorldItem
          isLast={sortedWorlds.length === 1}
          isActive={isActive}
          key={index}
          hours={isActive ? actualHours : worldItem.initialTime.hours}
          minutes={isActive ? actualMinutes : worldItem.initialTime.minutes}
          name={worldItem.name}
          id={worldItem.id}
          order={worldItem.order}
          showConfirm={worldItem.id === showConfirmId}
        />
      );
    });
  }, [activeWorldId, actualHours, actualMinutes, showConfirmId, sortedWorlds]);

  return <ul className="worlds-list">{memoWorlds}</ul>;
}
