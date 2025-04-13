import { Star as StarType } from "~/components/stars/index.tsx";
import "~/components/stars/star.scss";
import { memo } from "react";
import { getRandomNum } from "~/utils/getRandomNum.ts";
import { useGetPlaySample } from "~/hooks/useGetPlaySample.ts";

type StarProps = Omit<StarType, "id">;

const SIZE_TRESHOLD = 6;

function Star({ size, variation, soundName, positionX, positionY }: StarProps) {
  const playSample = useGetPlaySample({ name: soundName || "" });

  return (
    <div
      onClick={playSample}
      className={`star-wrapper`}
      style={{
        top: `${positionY}%`,
        left: `${positionX}%`,
        transform: `rotate(${getRandomNum({ min: 0, max: 359 })}deg)`,
        opacity: size > SIZE_TRESHOLD ? getRandomNum({ min: 25, max: 85 }) / 100 : 1,
      }}
    >
      {size > SIZE_TRESHOLD && <div className={`star-shadow star-shadow--variation-${variation}`} />}
      <div
        style={{
          width: `${size}px`,
          height: `${size}px`,
          animationDuration: `${getRandomNum({ min: 25, max: 40 }) / 10}s`,
          animationDelay: `${getRandomNum({ min: 0, max: 1 })}s`,
        }}
        className={`star star--variation-${variation}`}
      />
    </div>
  );
}

export const MemoizedStar = memo(Star);
