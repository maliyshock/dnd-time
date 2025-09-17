import { useMemo, useRef } from "react";
import { StarKind, StarVariation } from "~/constants.ts";
import { MemoizedStar } from "~/components/stars/Star.tsx";
import useStore from "~/store/useStore.ts";
import { toRadians } from "~/utils/toRadians.ts";
import "~/components/stars/stars.scss";
import { createStar } from "~/components/stars/utils/createStar.ts";
import { getStarsAmount } from "~/utils/getStarsAmount.ts";

export type Star = {
  variation: StarVariation;
  size: number;
  positionX: number;
  positionY: number;
  soundName?: StarKind["name"];
  id: string;
};

const starsAmount = getStarsAmount();

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
