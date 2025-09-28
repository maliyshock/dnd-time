import { Star as StarType } from "~/components/stars/index.tsx";
import "~/components/stars/star.scss";
import { memo } from "react";
import { getRandomNum } from "~/utils/getRandomNum.ts";
import { useGetPlaySample } from "~/hooks/useGetPlaySample.ts";
import { SIZE_TRESHOLD, STARS_DICTIONARY } from "~/constants.ts";
import { hexToRgb } from "~/utils/colors/hexToRgb.ts";

type StarProps = Omit<StarType, "id">;

function getGradient(color: string) {
  const { r, g, b } = hexToRgb(color);

  return `radial-gradient(
    circle at center,
    rgba(${r}, ${g}, ${b}, 0.15) 0,
    rgba(${r}, ${g}, ${b}, 0) 75%
  )`;
}

function Star({ size, variation, soundName, positionX, positionY }: StarProps) {
  const playSample = useGetPlaySample({ name: soundName || "" });
  const starVariation = STARS_DICTIONARY.find(item => item.name === variation);
  const isSpike = size > SIZE_TRESHOLD;

  return (
    <div
      onClick={playSample}
      className="star-wrapper"
      style={{
        transform: `rotate(${getRandomNum({ min: 0, max: 359 })}deg)`,
        top: `${positionY}%`,
        left: `${positionX}%`,
        // filter: `blur(${getRandomNum({ min: 0, max: 1 })}px)`, // drastically affects the performance

        opacity: size > SIZE_TRESHOLD ? getRandomNum({ min: 0.25, max: 0.85, round: false }) : 1,
        background: starVariation ? getGradient(starVariation.color) : "unset",
        padding: `${size}px`,
      }}
    >
      <div
        className="star"
        style={{
          backgroundColor: starVariation ? starVariation.color : "unset",
          width: `${isSpike ? size / 2 : size}px`,
          height: `${isSpike ? size / 2 : size}px`,
          animationDuration: `${getRandomNum({ min: 2.5, max: 4, round: false })}s`,
          animationDelay: `${getRandomNum({ min: 0, max: 1 })}s`,
        }}
      />
      {isSpike && (
        <svg
          className="spike-star"
          width={size * 1.5}
          height={size * 1.5}
          style={{
            color: starVariation ? starVariation.color : "unset",
            animationDuration: `${getRandomNum({ min: 2.5, max: 4, round: false })}s`,
            animationDelay: `${getRandomNum({ min: 0, max: 1 })}s`,
          }}
        >
          <use href="#star-spikes" />
        </svg>
      )}
    </div>
  );
}

export const MemoizedStar = memo(Star);
