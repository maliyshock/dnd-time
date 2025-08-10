import { useEffect } from "react";
import useStore from "~/store/useStore.ts";


export function useAnimationControl() {
  const applyAnimationVar = (play: boolean) => document.body.style.setProperty("--animation-play-state", play ? "running" : "paused");

  useEffect(() => {
    // sets initial value
    applyAnimationVar(useStore.getState().play);

    return useStore.subscribe(
      s => s.play,
      play => applyAnimationVar(play),
    )
  }, []);
}
