import "./sun.scss";
import useStore from "~/store/useStore.ts";
import { toRadians } from "~/utils/toRadians.ts";
import { Aura } from "~/components/aura";
import { useScreenOrientation } from "~/hooks/useGetOrientation.ts";
import { CSSProperties } from "react";

export default function Sun() {
  const sunAngle = useStore(store => store.sunAngle);
  const orientation = useScreenOrientation();
  const amplitude = orientation === "landscape-primary" ? Math.cos(toRadians(sunAngle)) : Math.sin(toRadians(sunAngle));
  const radiants = Math.cos(toRadians(sunAngle));

  const sunOrbitStyle = {
    "--sun-angle": `${sunAngle}deg`,
    "transition": sunAngle <= 20 || sunAngle >= 330 ? "unset" : "transform 1s",
  } as CSSProperties;

  const sunBodyStyle = {
    "--radiants": radiants,
    "--amplitude": amplitude,
  } as CSSProperties;

  return (
    <div className="sun-orbit" style={sunOrbitStyle}>
      <div className="sun">
        <div className="sun__body" style={sunBodyStyle}>
          <Aura scaleUp={10} />
        </div>
      </div>
    </div>
  );
}
