import { useEffect, useState } from "react";

type AnimationState = "running" | "paused";

export function useAnimationControl() {
  const [state, setState] = useState<AnimationState>("running");

  useEffect(() => {
    document.body.style.setProperty("--animation-play-state", state);
  }, [state]);

  return [state, setState] as const;
}
