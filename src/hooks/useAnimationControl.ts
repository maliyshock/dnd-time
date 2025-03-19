import { useEffect, useState } from "react";
import useStore from "~/store/useStore.ts";

type AnimationState = "running" | "paused";

export function useAnimationControl() {
  const play = useStore(store => store.play);
  const [state, setState] = useState<AnimationState>("running");

  useEffect(() => {
    setState(play ? "running" : "paused");
  }, [play]);

  useEffect(() => {
    document.body.style.setProperty("--animation-play-state", state);
  }, [state]);

  return [state, setState] as const;
}
