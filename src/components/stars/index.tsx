import { useMemo, useRef } from "react";
import { getRandomNum } from "~/utils/getRandomNum.ts";
import { v4 as uuidv4 } from "uuid";
import { STAR_MAX_SIZE, STAR_MIN_SIZE } from "~/constants.ts";
import { MemoizedStar } from "~/components/stars/Star.tsx";
import useStore from "~/store/useStore.ts";
import { toRadians } from "~/utils/toRadians.ts";
import "~/components/stars/stars.scss";

export type StarVariation = "default" | "broken" | "blue" | "green" | "yellow" | "orange";

type StarDictionaryItem = { name: StarVariation; chance: number };

// set chances in percents
export const STARS_DICTIONARY: StarDictionaryItem[] = [
  { name: "broken", chance: 3 },
  { name: "blue", chance: 3 },
  { name: "orange", chance: 5 },
  { name: "yellow", chance: 5 },
  { name: "green", chance: 5 },
];

function buildProbabilityPool(items: StarDictionaryItem[], scale: number = 100) {
  const newItems = [...items];
  const itemsWeight = newItems.reduce((sum, item) => sum + item.chance, 0);
  let totalWeight: number = itemsWeight;

  if (itemsWeight < 100) {
    totalWeight = 100;
    newItems.push({ name: "default", chance: 100 - itemsWeight });
  }

  return newItems.flatMap(({ name, chance }) => {
    const count = Math.round((chance / totalWeight) * scale);

    return Array(count).fill(name);
  });
}

const STARS_PROBABILITY_POOL = buildProbabilityPool(STARS_DICTIONARY);

export type Star = {
  variation: StarVariation;
  size: number;
  positionX: number;
  positionY: number;
  id: string;
};

const reduceFactor = 80;
const starsAmount = Math.round((window.innerWidth / reduceFactor) * (window.innerHeight / reduceFactor));

function createStar(): Star {
  return {
    variation: STARS_PROBABILITY_POOL[getRandomNum({ min: 0, max: STARS_PROBABILITY_POOL.length - 1 })],
    size: getRandomNum({ min: STAR_MIN_SIZE, max: STAR_MAX_SIZE }),
    positionX: getRandomNum({ min: 0, max: 100 }),
    positionY: getRandomNum({ min: 0, max: 100 }),
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

  return (
    <div className="stars" style={{ opacity: cosRad < 0.85 ? cosRad - 0.3 : 1 }}>
      {memoStars}
    </div>
  );
}
