import { getRandomNum } from "~/utils/getRandomNum.ts";
import { memo, useEffect, useRef, useState } from "react";
import "./cloud.scss";
import { getStartPoint } from "~/components/world/components/cloud/utils/getStartingPoint.ts";
import useStore from "~/store/useStore.ts";
import { Cloud as CloudType } from "~/store/slices/cloudsSlice";
import { useTimer } from "~/hooks/useTimer.ts";
import { getImageDimensions } from "~/components/world/components/cloud/utils/getImageDimensions.ts";
import { useGetPlaySample } from "~/hooks/useGetPlaySample.ts";

type CloudProps = {
  cloud: CloudType;
};

export function Cloud({ cloud }: CloudProps) {
  // const currentColors = useStore(store => store.currentColors);
  const lifeTimeTimer = useTimer();
  const scheduleRecreation = useStore(store => store.scheduleRecreation);
  const isPlay = useStore(store => store.play);
  // const [isRain, setIsRain] = useState<boolean>(false);
  const startAngle = useRef<number>(getStartPoint());
  const isBefore = useRef<boolean>(!!getRandomNum({ max: 1 }));
  const rotationSpeed = useRef<number>(getRandomNum({ min: 90, max: 200 }));
  const path = new URL(`/src/assets/clouds/cloud_${cloud.cloudVariation}/default.png`, import.meta.url).href;
  const playSample = useGetPlaySample({ name: "wetClick", shift: true });

  // const conuterThreshold = useRef<number>(getRandomNum({ min: 10, max: 30 }));
  // const [counter, setCounter] = useState<number>(0);
  // const rainPath = `src/assets/clouds/cloud_${cloud.cloudVariation}/rain.png`;
  const [width, setWidth] = useState<number | undefined>(undefined);
  const [fadeIn, setFadeIn] = useState(false);
  const [isDying, setIsDying] = useState(false);
  const transitionTime = getRandomNum({ min: 2000, max: 5000 });

  // cloud color?
  // cloud rain

  // const handleClick = () => {
  //   setCounter(prev => prev + 1);
  // };

  // useEffect(() => {
  //   const handler = setTimeout(() => {
  //     setCounter(0);
  //   }, 10000);
  //
  //   return () => clearTimeout(handler);
  // }, [counter]);

  useEffect(() => {
    // we need concrete dimensions in PX since width '%'  intrinsic size messes up with parent size, and we need to stack images
    // upon each other in the very same way
    const getDimensions = async () => {
      const result = await getImageDimensions(path);
      const baseWidth = result.width / 2;
      const minWith = Math.round(baseWidth - 0.15 * baseWidth);
      const maxWith = Math.round(baseWidth + 0.15 * baseWidth);
      const randWidth = getRandomNum({ min: minWith, max: maxWith });

      setWidth(randWidth);
    };

    getDimensions();
  }, [path]);

  // useEffect(() => {
  //   if (counter >= counterThreshold.current) {
  //     setIsRain(true);
  //   }
  // }, [counter]);

  useEffect(() => {
    const timeToDie = getRandomNum({ min: 20000, max: 90000 });

    if (lifeTimeTimer.state === "idle") {
      lifeTimeTimer.start({
        delay: timeToDie,
        callback: () => {
          setFadeIn(false);
          setIsDying(true);
        },
      });
    }
  }, [lifeTimeTimer]);

  useEffect(() => {
    if (isPlay) lifeTimeTimer.resume();
    if (!isPlay) lifeTimeTimer.pause();
  }, [isPlay, lifeTimeTimer]);

  useEffect(() => {
    const delayToAppear = 100;
    const timerToAppear = setTimeout(() => setFadeIn(true), delayToAppear);

    return () => {
      clearTimeout(timerToAppear);
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    let timeoutId: NodeJS.Timeout | undefined;

    if (isDying && isPlay) {
      timeoutId = setTimeout(async () => {
        if (mounted) {
          await scheduleRecreation(cloud.id);
        }
      }, transitionTime);
    }

    return () => {
      mounted = false;
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, [cloud.id, isDying, isPlay, scheduleRecreation, transitionTime]);

  // useEffect(() => {
  //   if (isRain) {
  //     const rainLifeTime = getRandomNum({ min: 10, max: 60 });
  //     const timer = setTimeout(() => setIsRain(false), rainLifeTime * 1000);
  //
  //     return () => clearTimeout(timer);
  //   }
  // }, [isRain]);

  if (width === undefined) return null;

  return (
    <div
      onMouseDown={() => playSample()}
      className={`world-orbit world-orbit--start-${startAngle.current} ${isBefore.current ? "before" : "after"}`}
      style={{ animationDuration: `${rotationSpeed.current}s` }}
    >
      <div
        className={`cloud ${fadeIn ? "fadeIn" : ""}`}
        style={{
          animationName: "lift",
          transition: `opacity ${transitionTime}ms`,
          animationDuration: `${rotationSpeed.current / 2}s`,
        }}
      >
        {/*{isRain && (*/}
        {/*  <div className="cloud__rain">*/}
        {/*    <div className="cloud__rain-body">*/}
        {/*      <img alt="cloud 8" className="cloud__rain-img" draggable="false" src={rainPath} width={width} />*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*)}*/}

        {/*<div className="cloud__img" style={{ ...(!isRain ? { backgroundImage: `url(${path})` } : {}) }}>*/}
        <div className="cloud__img">
          <img alt="cloud 8" draggable="false" src={path} width={width} />
        </div>
      </div>
    </div>
  );
}

export const MemoCloud = memo(Cloud);
