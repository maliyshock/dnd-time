import { getRandomNum } from "~/utils/getRandomNum.ts";
import { STAR_MAX_SIZE, STAR_MIN_SIZE, STAR_SOUNDS_MAP, STARS_DICTIONARY } from "~/constants.ts";
import { Star } from "~/components/stars";
import { buildProbabilityPool } from "~/components/stars/utils/buildProbabilityPool.ts";

const STARS_DICTIONARY_POOL = buildProbabilityPool(STARS_DICTIONARY);

// percent
const min = 0;
const max = 100;

export function createStar(): Star {
  const starVariation = STARS_DICTIONARY_POOL[getRandomNum({ min: 0, max: STARS_DICTIONARY_POOL.length - 1 })];
  const soundsBank = STAR_SOUNDS_MAP[starVariation];
  const soundIndex = getRandomNum({ min: 0, max: soundsBank.length - 1 });

  return {
    soundName: soundsBank[soundIndex],
    variation: starVariation,
    size: getRandomNum({ min: STAR_MIN_SIZE, max: STAR_MAX_SIZE }),
    positionX: getRandomNum({ min, max }),
    positionY: getRandomNum({ min, max }),
    id: globalThis.crypto.randomUUID(),
  };
}
