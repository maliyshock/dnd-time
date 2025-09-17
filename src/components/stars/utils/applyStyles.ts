import { stepOscillation } from "~/utils/oscilation/stepOscillation.ts";
import { Star } from "~/components/stars/utils/createStar.ts";
import { Sprite, AlphaFilter, Container } from "pixi.js";
import { getStarScale } from "~/components/stars/utils/getStarScale.ts";
import { getStarAlpha } from "~/components/stars/utils/getStarAlpha.ts";
import { isComposite } from "~/components/stars/utils/isComposite.ts";
import { HALO_ALPHA_BASE, HALO_SCALE } from "~/constants.ts";
import { Type } from "~/types.ts";
import { getAnimationKey } from "~/components/stars/utils/getAnimationKey.ts";

type StarsMap = Map<string, { node: Sprite | Container; star: Star }>;

type StarRef = {
  type: Type;
  map: StarsMap;
};

type ApplyStyles = {
  spriteRefs: StarRef[];
  delta: number;
  star: Star;
};

// TODO:
// baseScale 0.5 - 1
// in case of star - dot stays with fixed opacity, but star shape oscilates
// in case of dot - alpha 0.3 - 1

// dot should be only for dot shapes, right now dot it is also core of star

/**
 *  scale - fluctuates between 0.5 and 1 (between STAR_SCALE_MIN and STAR_SCALE_MAX parameters)
 *  size – current size from 1 to STAR_MAX_SIZE
 */
export function applyStyles({ spriteRefs, delta, star }: ApplyStyles) {
  for (let i = 0; i < spriteRefs.length; i++) {
    const currentRef = spriteRefs[i];
    const entry = currentRef.map.get(star.id);

    if (entry === undefined) continue;

    const animationKey = currentRef.type === "star" ? "main" : "dot";
    const { scale, rotate } = star.animation[animationKey];
    const starScale = getStarScale({ scale: scale.value, size: scale.size });

    // there is a delay - just decrease and set the current scale
    if (scale.delay > 0) {
      scale.delay = Math.max(0, scale.delay - delta);
      continue;
    } else {
      // scale value oscillates between min (0.5) and max (1) values
      const next = stepOscillation({
        direction: scale.direction,
        value: scale.value,
        deltaTimeSeconds: delta,
        profile: scale.profile,
      });

      scale.direction = next.direction;
      scale.value = next.value;
    }

    if (currentRef.type === "halo") {
      const { dot } = star.animation;
      const dotScale = getStarScale({ scale: dot.scale.value, size: dot.scale.size });

      entry.node.scale.set(dotScale * HALO_SCALE);
      // console.log("getStarAlpha({ scale: scale.value, multiplier: HALO_ALPHA_BASE });", getStarAlpha({ scale: scale.value, multiplier: HALO_ALPHA_BASE }));
      entry.node.alpha = getStarAlpha({ scale: dotScale, multiplier: HALO_ALPHA_BASE });

      continue;
    }

    entry.node.scale.set(starScale);
    if (rotate?.value) {
      entry.node.rotation = rotate?.value;
    }
  }
}
