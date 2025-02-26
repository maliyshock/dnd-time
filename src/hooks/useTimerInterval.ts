import { useCallback, useEffect, useRef, useState } from "react";

type IntervalState = "idle" | "running" | "paused";

export function useTimerInterval() {
  const [state, setState] = useState<IntervalState>("idle");
  const intervalId = useRef<NodeJS.Timeout | null>(null);
  const savedCallback = useRef<() => void>(null);
  const delayRef = useRef<number | undefined>(undefined);
  const remainingRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number | undefined>(undefined);

  const clear = useCallback(() => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
  }, []);

  const saveRemaining = useCallback(() => {
    if (startTimeRef.current && delayRef.current) {
      const elapsed = Date.now() - startTimeRef.current;

      remainingRef.current = Math.max(delayRef.current - elapsed, 0);
    }
  }, []);

  const start = useCallback(
    ({ callback, delay }: { callback: () => void; delay: number }) => {
      if (state !== "idle") return;

      savedCallback.current = callback;
      delayRef.current = delay;
      startTimeRef.current = Date.now();

      setState("running");

      intervalId.current = setInterval(() => {
        savedCallback.current?.();
        startTimeRef.current = Date.now(); // Reset timer after each execution
      }, delay);
    },
    [state],
  );

  const pause = useCallback(() => {
    if (state !== "running") return;

    saveRemaining();
    clear();
    setState("paused");
  }, [state, clear, saveRemaining]);

  const resume = useCallback(() => {
    if (state !== "paused" || !remainingRef.current) return;

    startTimeRef.current = Date.now();
    delayRef.current = remainingRef.current;

    setState("running");

    intervalId.current = setInterval(() => {
      savedCallback.current?.();
      startTimeRef.current = Date.now();
    }, remainingRef.current);

    remainingRef.current = undefined;
  }, [state]);

  const reset = useCallback(() => {
    clear();
    setState("idle");
    remainingRef.current = undefined;
    delayRef.current = undefined;
  }, [clear]);

  // Очистка при размонтировании
  useEffect(() => {
    return () => clear();
  }, [clear]);

  return {
    state,
    start,
    pause,
    resume,
    reset,
  };
}
