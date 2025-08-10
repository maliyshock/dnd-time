import { useEffect } from "react";
import { getNow } from "~/utils/time/getNow.ts";
import { formatTime } from "~/utils/time/formatTime.ts";
import useStore from "~/store/useStore.ts";
import { storeWorlds } from "~/utils/localStorage/setWorlds.ts";

// store worlds and last active world in local storage
export function useTimeKeeper() {
  const activeWorldId = useStore(store => store.activeWorldId);
  const worlds = useStore(store => store.worlds);
  const time = useStore(store => store.time);

  // as far active world name changes save all of the worlds to the storage

  useEffect(() => {
    const activeWorld = worlds[activeWorldId];
    const newWorlds = { ...worlds };
    const currentTime = getNow(time);
    const { hours, minutes } = activeWorld.initialTime;

    newWorlds[activeWorldId] = { ...activeWorld, initialTime: currentTime };

    storeWorlds(newWorlds);
    localStorage.setItem("lastActiveWorldId", activeWorldId);

    document.title = `D&D Time – ${formatTime(hours)}:${formatTime(minutes)}`;
  }, [activeWorldId, time, worlds]);
}
