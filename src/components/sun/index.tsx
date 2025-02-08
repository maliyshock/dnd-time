import "./sun.scss";
import useStore from "~/store/useStore.ts";
import { getMinutes } from "~/utils/getMinutes.ts";
import { useEffect, useRef, useState } from "react";
import { calculateSunAngle } from "~/components/sun/utils/calculateSunAngle.ts";
import { getHours } from "~/utils/getHours.ts";
import { toRadians } from "~/utils/toRadians.ts";

export default function Sun() {
  const totalSeconds = useStore(store => store.totalSeconds);
  const memoizedMinutes = useRef(getMinutes(totalSeconds));
  const memoizedHours = useRef(getHours(totalSeconds));
  const [sunAngle, setSunAngle] = useState<number>(calculateSunAngle(totalSeconds));
  const amplitude = Math.cos(toRadians(sunAngle));

  useEffect(() => {
    const minutes = getMinutes(totalSeconds);
    const hours = getHours(totalSeconds);
    const shouldUpdate = memoizedMinutes.current !== minutes || memoizedHours.current !== hours;

    if (shouldUpdate) {
      memoizedMinutes.current = minutes;
      memoizedHours.current = hours;
      const newAngle = calculateSunAngle(totalSeconds);

      setSunAngle(newAngle);
    }
  }, [totalSeconds]);

  return (
    <div
      className="sun-orbit"
      style={{ transform: `rotate(${sunAngle}deg)`, transition: getHours(totalSeconds) <= 1 || getHours(totalSeconds) >= 23 ? "unset" : "transform 1s" }}
    >
      <div className="sun-wrapper">
        <div className="sun" style={{ transform: `translateY(${amplitude * 30}VH)` }} />
      </div>
    </div>
  );
}
