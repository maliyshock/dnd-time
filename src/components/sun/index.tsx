import "./sun.scss";
import useStore from "~/store/useStore.ts";
import { getHours } from "~/utils/getHours.ts";
import { toRadians } from "~/utils/toRadians.ts";

export default function Sun() {
  const time = useStore(store => store.time);
  const sunAngle = useStore(store => store.sunAngle);
  const amplitude = Math.cos(toRadians(sunAngle));

  return (
    <div
      className="sun-orbit"
      style={{ transform: `rotate(${sunAngle}deg)`, transition: getHours(time) <= 1 || getHours(time) >= 23 ? "unset" : "transform 1s" }}
    >
      <div className="sun-wrapper">
        <div className="sun" style={{ transform: `translateY(${amplitude * 30}VH)` }} />
      </div>
    </div>
  );
}
