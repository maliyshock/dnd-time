import { useEffect } from "react";
import { getNow } from "~/utils/time/getNow.ts";
import { formatTime } from "~/utils/time/formatTime.ts";
import useStore from "~/store/useStore.ts";
import { storeWorlds } from "~/utils/localStorage/setWorlds.ts";

// store worlds and last active world in local storage
export function useTimeKeeper() {
  const activeWorldName = useStore(store => store.activeWorldName);
  const worlds = useStore(store => store.worlds);
  const time = useStore(store => store.time);

  // as far active world name changes save all of the worlds to the storage

  useEffect(() => {
    const activeWorld = worlds[activeWorldName];
    const newWorlds = { ...worlds };
    const currentTime = getNow(time);
    const { hours, minutes } = activeWorld.initialTime;

    newWorlds[activeWorldName] = { ...activeWorld, initialTime: currentTime };

    storeWorlds(newWorlds);
    localStorage.setItem("lastActiveWorld", activeWorldName);

    document.title = `DND Timer – ${formatTime(hours)} : ${formatTime(minutes)}`;
  }, [activeWorldName, time, worlds]);
}
