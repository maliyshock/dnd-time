import { getRandomNum } from "~/utils/getRandomNum.ts";
import {
  STAR_MAX_SIZE,
  STAR_MIN_SIZE,
  STAR_SCALE_MAX,
  STAR_SCALE_MIN,
  STAR_SOUNDS_MAP,
  STAR_TRANSFORM_THRESHOLD,
  StarKind,
  STARS_PROBABILITY,
  StarVariation,
} from "~/constants.ts";
import { buildProbabilityPool } from "~/components/stars/utils/buildProbabilityPool.ts";
import { getScreenHypotenuse } from "~/utils/getHypotenuse.ts";
import { computeBaseSpeedForHalfPeriod } from "~/utils/oscilation/computeBaseSpeedForHalfPeriod.ts";
import { OscillationProfile } from "~/types.ts";
import { clamp } from "~/utils/clamp.ts";

export type ScaleAnimation = {
  size: number;
  profile: OscillationProfile;
  direction: -1 | 1;
  value: number;
  duration: number;
  delay: number;
  speedPerSecond: number;
};

type RotateAnimation = {
  value: number;
  time: number;
};

export type Star = {
  id: string;
  variation: StarVariation;
  soundName?: StarKind["name"];
  color: string;
  positionX: number;
  positionY: number;
  size: number;
  randomAlpha: number;
  animation: {
    main: { scale: ScaleAnimation; rotate?: RotateAnimation };
    dot: { scale: ScaleAnimation; rotate?: RotateAnimation };
  };
};

type CreateStarArgs = {
  size?: number;
  positionX?: number;
  positionY?: number;
};

const STARS_PROBABILITY_POOL = buildProbabilityPool(STARS_PROBABILITY);
const sideSize = getScreenHypotenuse();

const baseProfile = {
  xMin: STAR_SCALE_MIN,
  xMax: STAR_SCALE_MAX,
  sharpnessAlpha: 1,
  epsilonMinSpeed: 0.05,
};

type GetScaleAnimation = {
  size: number;
};

function getScaleAnimation({ size }: GetScaleAnimation): ScaleAnimation {
  const mainDuration = getRandomNum({ min: 35, max: 65 }) / 10;
  const targetHalfPeriodSeconds = mainDuration / 2;

  const baseSpeedPerSecond = computeBaseSpeedForHalfPeriod({ ...baseProfile, targetHalfPeriodSeconds });
  const profile = {
    ...baseProfile,
    baseSpeedPerSecond,
  };

  return {
    size,
    profile,
    direction: -1, // from value to STAR_SCALE_MIN
    value: STAR_SCALE_MAX,
    duration: mainDuration,
    delay: getRandomNum({ min: 0, max: 1 }),
    speedPerSecond: computeBaseSpeedForHalfPeriod({ ...profile, targetHalfPeriodSeconds }),
  };
}

function getSizeDot(starSize: number) {
  const offset = getRandomNum({ min: 1, max: 6 });
  const direction = getRandomNum({ min: 0, max: 1 }) ? -1 : 1;
  const center = starSize / 2;

  return clamp(center + direction * offset, STAR_MIN_SIZE, starSize - 2);
}

// TODO: create star tests
export function createStar({ size, positionX, positionY }: CreateStarArgs): Star {
  const starVariation = STARS_PROBABILITY_POOL[getRandomNum({ min: 0, max: STARS_PROBABILITY_POOL.length - 1 })];
  const soundsBank = STAR_SOUNDS_MAP[starVariation.name]; // TODO: looks weird, we might keep sounds in variation description
  const soundIndex = getRandomNum({ min: 0, max: soundsBank.length - 1 });
  const starSize = size ?? getRandomNum({ min: STAR_MIN_SIZE, max: STAR_MAX_SIZE });
  const sizeDot = getSizeDot(starSize);

  return {
    id: globalThis.crypto.randomUUID(),
    variation: starVariation.name,
    soundName: soundsBank[soundIndex],
    color: starVariation.color,
    positionX: positionX ?? getRandomNum({ min: 0, max: sideSize }),
    positionY: positionY ?? getRandomNum({ min: 0, max: sideSize }),
    size: starSize,
    // increase or decrease original alpha by this value
    randomAlpha: getRandomNum({ min: 0.5, max: 1.5, round: false }),

    animation: {
      main: {
        scale: getScaleAnimation({ size: starSize }),
        rotate: {
          value: getRandomNum({ min: 0, max: 360 }),
          time: getRandomNum({ min: 5, max: 10 }),
        },
      },
      dot: { scale: getScaleAnimation({ size: sizeDot }) },
    },
  };
}
