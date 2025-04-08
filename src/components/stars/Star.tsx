import { Star as StarType } from "~/components/stars/index.tsx";
import "~/components/stars/star.scss";
import { memo } from "react";
import { getRandomNum } from "~/utils/getRandomNum.ts";

type StarProps = Omit<StarType, "id">;

const TRESHOLD = 4;

function Star({ size, variation, positionX, positionY }: StarProps) {
  console.log("Math.max(size / TRESHOLD - 1, 0.5)", Math.max(size / TRESHOLD - 1, 0.5));

  return (
    <div
      className={`star-wrapper`}
      style={{
        top: `${positionY}%`,
        left: `${positionX}%`,
        filter: size > TRESHOLD + 1 ? `blur(${Math.max(size / TRESHOLD - 1, 0.5)}px)` : undefined,
        transform: `rotate(${getRandomNum({ min: 0, max: 359 })}deg)`,
        opacity: size > TRESHOLD ? 0.85 : 1,
      }}
    >
      <div
        style={{
          width: `${size}px`,
          height: `${size}px`,
          animationDuration: `${getRandomNum({ min: 25, max: 40 }) / 10}s`,
          animationDelay: `${getRandomNum({ min: 0, max: 1 })}s`,
        }}
        className={`star star--variation-${variation}`}
      >
        {size > TRESHOLD && (
          <>
            <div className="star__line-h" />
            <div className="star__line-v" />
          </>
        )}
      </div>
    </div>
  );
}

export const MemoizedStar = memo(Star);
