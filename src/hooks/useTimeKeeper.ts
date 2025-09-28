import { useEffect } from "react";
import { getNow } from "~/utils/time/getNow.ts";
import { formatTime } from "~/utils/time/formatTime.ts";
import useStore from "~/store/useStore.ts";

// TODO: state changes cause root component to rerender
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

    // localStorage.setItem("worldStorage", JSON.stringify(newWorlds));
    localStorage.setItem("lastActiveWorldId", activeWorldId);
    localStorage.setItem("lastActiveWorldTime", String(time));

    document.title = `D&D Time – ${formatTime(hours)}:${formatTime(minutes)}`;
  }, [activeWorldId, time, worlds]);
}
