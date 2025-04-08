import { Star as StarType } from "~/components/stars/index.tsx";
import "~/components/stars/star.scss";
import { memo } from "react";
import { getRandomNum } from "~/utils/getRandomNum.ts";

type StarProps = Omit<StarType, "id">;

function Star({ size, variation, positionX, positionY }: StarProps) {
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        top: `${positionY}%`,
        left: `${positionX}%`,
        animationDuration: `${getRandomNum({ min: 25, max: 40 }) / 10}s`,
        animationDelay: `${getRandomNum({ min: 0, max: 5 })}s`,
      }}
      className={`star star--variation-${variation}`}
    />
  );
}

export const MemoizedStar = memo(Star);
