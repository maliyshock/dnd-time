import { useEffect, useRef, useState } from "react";

type TimerState = "idle" | "running" | "paused" | "completed";

type GetRemainingTime = {
  initialDelay: number;
  startTime: number;
};

const getRemainingTime = ({ initialDelay, startTime }: GetRemainingTime) => {
  return Math.max(0, initialDelay - (Date.now() - startTime));
};

export function useTimer() {
  const [state, setState] = useState<TimerState>("idle");
  const [remainingTime, setRemainingTime] = useState(0);
  const timerId = useRef<NodeJS.Timeout | null>(null);
  const startTime = useRef(0);
  const savedCallback = useRef<() => void>(null);
  const initialDelay = useRef(0);

  const start = ({ delay, callback }: { delay: number; callback: () => void }) => {
    savedCallback.current = callback;
    initialDelay.current = delay;
    setState("running");
    startTime.current = Date.now();

    if (timerId.current) clearTimeout(timerId.current);
    timerId.current = setTimeout(() => {
      savedCallback.current?.();
      setState("completed");
    }, delay);
  };

  const pause = () => {
    if (state !== "running") return;
    const timeLeft = getRemainingTime({ initialDelay: initialDelay.current, startTime: startTime.current });

    setRemainingTime(timeLeft);
    clearTimeout(timerId.current!);
    setState("paused");
  };

  const resume = () => {
    if (state !== "paused") return;

    startTime.current = Date.now();
    setState("running");
    timerId.current = setTimeout(() => {
      savedCallback.current?.();
      setState("completed");
    }, remainingTime);
  };

  useEffect(() => {
    return () => {
      if (timerId.current) {
        clearTimeout(timerId.current);
        timerId.current = null;
      }
    };
  }, []);

  return {
    state,
    start,
    pause,
    resume,
  };
}
