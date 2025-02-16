import "./sun.scss";
import useStore from "~/store/useStore.ts";
import { getHours } from "~/utils/time/getHours.ts";
import { toRadians } from "~/utils/toRadians.ts";
import { Aura } from "~/components/aura";

export default function Sun() {
  const time = useStore(store => store.time);
  const sunAngle = useStore(store => store.sunAngle);
  const amplitude = Math.cos(toRadians(sunAngle));

  return (
    <div
      className="sun-orbit"
      style={{ transform: `rotate(${sunAngle}deg)`, transition: getHours(time) <= 1 || getHours(time) >= 23 ? "unset" : "transform 1s" }}
    >
      <div className="sun">
        <div className="sun__body" style={{ transform: `translateY(${amplitude * 30}VH)` }}>
          <Aura scaleUp={10} />
        </div>
      </div>
    </div>
  );
}
