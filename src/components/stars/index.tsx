import { useMemo, useRef } from "react";
import { getRandomNum } from "~/utils/getRandomNum.ts";
import { v4 as uuidv4 } from "uuid";
import { STAR_MAX_SIZE, STAR_MIN_SIZE, STAR_SOUNDS_MAP, StarKind, STARS_PROBABILITY, StarVariation } from "~/constants.ts";
import { MemoizedStar } from "~/components/stars/Star.tsx";
import useStore from "~/store/useStore.ts";
import { toRadians } from "~/utils/toRadians.ts";
import "~/components/stars/stars.scss";
import { buildProbabilityPool } from "~/components/stars/utils/buildProbabilityPool.ts";

const STARS_PROBABILITY_POOL = buildProbabilityPool(STARS_PROBABILITY);

export type Star = {
  variation: StarVariation;
  size: number;
  positionX: number;
  positionY: number;
  soundName?: StarKind["name"];
  id: string;
};

// TODO: bug on mobile version
const reduceFactor = 70;
const starsAmount = Math.round((window.innerWidth / reduceFactor) * (window.innerHeight / reduceFactor));

function createStar(): Star {
  const starVariation = STARS_PROBABILITY_POOL[getRandomNum({ min: 0, max: STARS_PROBABILITY_POOL.length - 1 })];
  const soundsBank = STAR_SOUNDS_MAP[starVariation];
  const soundIndex = getRandomNum({ min: 0, max: soundsBank.length - 1 });

  return {
    soundName: soundsBank[soundIndex],
    variation: starVariation,
    size: getRandomNum({ min: STAR_MIN_SIZE, max: STAR_MAX_SIZE }),
    positionX: getRandomNum({ min: -30, max: 130 }),
    positionY: getRandomNum({ min: -30, max: 130 }),
    id: uuidv4(),
  };
}

let stars = Array.from({ length: starsAmount }, createStar);

export function Stars() {
  const sunAngle = useStore(store => store.sunAngle);
  const cosRad = Math.cos(toRadians(sunAngle));
  const regenerated = useRef(false);
  const memoStars = useMemo(() => {
    if (cosRad < 0 && !regenerated.current) {
      stars = Array.from({ length: starsAmount }, createStar);
      regenerated.current = true;
    }

    if (cosRad > 0.95) {
      regenerated.current = false;
    }

    return stars.map(star => {
      const { id, ...rest } = star;

      return <MemoizedStar key={id} {...rest} />;
    });
  }, [cosRad]);

  // TODO: think about this 0.3 treshold
  if (cosRad - 0.3 < 0.15) return;

  return (
    <div className="stars" style={{ opacity: cosRad < 0.85 ? cosRad - 0.3 : 1 }}>
      {memoStars}
    </div>
  );
}
