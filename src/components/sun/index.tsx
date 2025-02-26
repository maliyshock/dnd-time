import "./sun.scss";
import useStore from "~/store/useStore.ts";
import { toRadians } from "~/utils/toRadians.ts";
import { Aura } from "~/components/aura";

export default function Sun() {
  const sunAngle = useStore(store => store.sunAngle);
  const amplitude = Math.cos(toRadians(sunAngle));

  return (
    <div className="sun-orbit" style={{ transform: `rotate(${sunAngle}deg)`, transition: sunAngle <= 20 || sunAngle >= 330 ? "unset" : "transform 1s" }}>
      <div className="sun">
        <div className="sun__body" style={{ transform: `translateY(${amplitude * 30}VH)` }}>
          <Aura scaleUp={10} />
        </div>
      </div>
    </div>
  );
}
