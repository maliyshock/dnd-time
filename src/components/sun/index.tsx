import "./sun.scss";
import useStore from "~/store/useStore.ts";
import { toRadians } from "~/utils/toRadians.ts";
import { Aura } from "~/components/aura";
import { useScreenOrientation } from "~/hooks/useGetOrientation.ts";
import { CSSProperties, useEffect, useState } from "react";
import { Star } from "~/components/ui/icons/Star.tsx";
import { StarCrown } from "~/components/ui/icons/StarCrown.tsx";
import { useGetPlaySample } from "~/hooks/useGetPlaySample.ts";

const TIME_TO_SHOW_FACE = 6000;

export default function Sun() {
  const sunAngle = useStore(store => store.sunAngle);
  const orientation = useScreenOrientation();
  const amplitude = orientation === "landscape-primary" ? Math.cos(toRadians(sunAngle)) : Math.sin(toRadians(sunAngle));
  const cosRad = Math.cos(toRadians(sunAngle));
  const sinRad = Math.sin(toRadians(sunAngle));
  const [showFace, setShowFace] = useState(false);
  const [counter, setCounter] = useState(0);
  const fireSound = useGetPlaySample({ name: "fire", shift: true });
  const scream = useGetPlaySample({ name: "scream" });

  const sunOrbitStyle = {
    "--sun-angle": `${sunAngle}deg`,
    "transition": sunAngle <= 20 || sunAngle >= 330 ? "unset" : "transform 1s",
  } as CSSProperties;

  const sunElevatorStyle = {
    "--radiants": cosRad,
    "--amplitude": amplitude,
  } as CSSProperties;

  useEffect(() => {
    if (counter > 30) {
      setShowFace(true);
      scream();
    }
  }, [counter, scream]);

  // clear
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (showFace) {
      timer = setTimeout(() => {
        setShowFace(false);
        setCounter(0);
      }, TIME_TO_SHOW_FACE);
    }

    return () => clearTimeout(timer);
  }, [showFace]);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (counter > 0) {
      timer = setTimeout(() => {
        setCounter(0);
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [counter]);

  return (
    <div className="sun sun-orbit" style={sunOrbitStyle}>
      <div className="sun__container" style={{ transform: `translateX(${sinRad * 100}%)` }}>
        <div className="sun__elevator" style={sunElevatorStyle}>
          <div
            className="sun__body"
            onMouseDown={() => {
              fireSound();
              setCounter(prev => prev + 1);
            }}
          >
            <div className="sun__crown">
              <div className="sun__crown-container">
                <Star className="sun__crown-spikes" />
                <StarCrown className="sun__star-crown" />
              </div>
              <div className="sun__crown-container">
                <Star className="sun__crown-spikes" />
                <StarCrown className="sun__star-crown" />
              </div>
            </div>
            <div className={`sun__yolk ${showFace ? "face" : ""}`} />
          </div>
          <Aura scaleUp={10} />
        </div>
      </div>
    </div>
  );
}
