import { useEffect } from "react";
import useStore from "~/store/useStore.ts";

export function useAnimationControl() {
  const play = useStore(store => store.play);

  useEffect(() => {
    document.body.style.setProperty("--animation-play-state", play ? "running" : "paused");
  }, [play]);
}
