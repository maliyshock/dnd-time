import { useEffect } from "react";
import useStore from "~/store/useStore.ts";

export function useDebugStore() {
  useEffect(() => {
    return useStore.subscribe(
      s => s, // whole store
      (next, prev) => {
        const changed = Object.keys(next).filter(k => next[k as keyof typeof next] !== prev[k as keyof typeof prev]);

        if (changed.length) console.log("[store changed]:", changed);
      },
    );
  }, []);
}
