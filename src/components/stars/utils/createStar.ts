import { getRandomNum } from "~/utils/getRandomNum.ts";
import { STAR_MAX_SIZE, STAR_MIN_SIZE, STAR_SOUNDS_MAP, STARS_PROBABILITY } from "~/constants.ts";
import { v4 as uuidv4 } from "uuid";
import { Star } from "~/components/stars";
import { buildProbabilityPool } from "~/components/stars/utils/buildProbabilityPool.ts";

const STARS_PROBABILITY_POOL = buildProbabilityPool(STARS_PROBABILITY);

const a = 100; // side in percent
// Pythagorean theorem
const result = Math.sqrt(Math.pow(a, 2) + Math.pow(a, 2));
const min = 50 - 0.5 * result;
const max = 50 + 0.5 * result;

export function createStar(): Star {
  const starVariation = STARS_PROBABILITY_POOL[getRandomNum({ min: 0, max: STARS_PROBABILITY_POOL.length - 1 })];
  const soundsBank = STAR_SOUNDS_MAP[starVariation];
  const soundIndex = getRandomNum({ min: 0, max: soundsBank.length - 1 });

  return {
    soundName: soundsBank[soundIndex],
    variation: starVariation,
    size: getRandomNum({ min: STAR_MIN_SIZE, max: STAR_MAX_SIZE }),
    positionX: getRandomNum({ min, max }),
    positionY: getRandomNum({ min, max }),
    id: uuidv4(),
  };
}
