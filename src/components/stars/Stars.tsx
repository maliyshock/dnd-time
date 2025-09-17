import { RefObject, useEffect, useMemo, useRef } from "react";
import { HALO_ALPHA_BASE, HALO_SCALE } from "~/constants.ts";
import "~/components/stars/stars.scss";
import { createStar, Star } from "~/components/stars/utils/createStar.ts";
import "pixi.js/unsafe-eval";
import { extend, useApplication } from "@pixi/react";
import { AlphaFilter, Assets, Container, Graphics, Sprite, Texture, Ticker } from "pixi.js";
import { getNormalizedSvgTexture } from "~/components/stars/utils/getSvgTexture.ts";
import { getCircleTexture } from "~/components/stars/utils/getCircleTexture.ts";
import { applyStyles } from "~/components/stars/utils/applyStyles.ts";
import { createRadialGlowTexture } from "~/components/stars/utils/createRadialGlowTexture.ts";
import starPath from "/src/assets/svg/star.svg";
import { isComposite } from "~/components/stars/utils/isComposite.ts";
import { getStarScale } from "~/components/stars/utils/getStarScale.ts";
import { getStarAlpha } from "~/components/stars/utils/getStarAlpha.ts";
import { getResolution } from "~/components/stars/utils/getResolution.ts";
import { getStarsAmount } from "~/utils/getStarsAmount.ts";

extend({ Container, Graphics, Sprite });

const svgTexture = await Assets.load<Texture>(starPath);
const stars = Array.from({ length: getStarsAmount() }, () => createStar({}));
// const stars = [createStar({ size: 19, positionX: 900, positionY: 900 })];
// const stars = [createStar({ size: 9, positionX: 900, positionY: 900 })];

function createRefBinder<TNode>(mapRef: RefObject<Map<string, { node: TNode; star: Star }>>, star: Star) {
  return (node: TNode | null) => {
    if (node) {
      mapRef.current.set(star.id, { node, star });
    } else {
      mapRef.current.delete(star.id);
    }
  };
}

type EnsureAlphaFilterArgs = {
  star: Star;
  refs: Map<string, AlphaFilter>;
};

function ensureAlphaFilter({ star, refs }: EnsureAlphaFilterArgs): AlphaFilter {
  let filter = refs.get(star.id);
  const key = isComposite(star.size) ? "main" : "dot";
  const { scale } = star.animation[key];
  const alpha = getStarAlpha({ scale: scale.value, multiplier: star.randomAlpha });

  if (!filter) {
    filter = new AlphaFilter({ alpha, blendMode: "add", resolution: getResolution() });
    refs.set(star.id, filter);
  }

  return filter;
}

export function Stars() {
  const { app } = useApplication();
  const starSpriteRefs = useRef(new Map<string, { node: Sprite; star: Star }>());
  const dotSpriteRefs = useRef(new Map<string, { node: Sprite; star: Star }>());
  const haloSpriteRefs = useRef(new Map<string, { node: Sprite; star: Star }>());
  const starWrapperRefs = useRef(new Map<string, { node: Container; star: Star }>());
  const alphaFiltersRef = useRef(new Map<string, AlphaFilter>());

  console.log("starSpriteRefs", starSpriteRefs.current);
  console.log("dotSpriteRefs", dotSpriteRefs.current);
  console.log("starWrapperRefs", starWrapperRefs.current);

  /**
   * We create a biggest possible texture STAR_MAX_SIZE * 2 for high density monitors
   * to rescale it by the scale factor
   */
  const circleTexture = useMemo(() => getCircleTexture(app), [app]);
  const starShapeTexture = useMemo(() => getNormalizedSvgTexture(app, svgTexture), [app]);
  const glowTexture = useMemo(() => createRadialGlowTexture(app), [app]);

  useEffect(() => {
    const tick = (ticker: Ticker) => {
      const deltaSeconds = Math.min(0.05, ticker.deltaMS / 1000);

      for (const star of stars) {
        applyStyles({
          spriteRefs: [
            { type: "star", map: starSpriteRefs.current },
            { type: "dot", map: dotSpriteRefs.current },
            { type: "halo", map: haloSpriteRefs.current },
          ],
          star,
          delta: deltaSeconds,
        });
      }
    };

    app.ticker.add(tick);

    return () => {
      app.ticker.remove(tick);
    };
  }, [app]);

  if (!app?.renderer) return null;

  return stars.map(star => {
    // TODO: it almost double from apply styles.
    const wrapperBinder = createRefBinder(starWrapperRefs, star);
    const starBinder = createRefBinder(starSpriteRefs, star);
    const dotBinder = createRefBinder(dotSpriteRefs, star);
    const haloBinder = createRefBinder(haloSpriteRefs, star);

    // set initial styles
    const anchor = 0.5;
    const { main, dot } = star.animation;
    const starScale = getStarScale({ scale: main.scale.value, size: main.scale.size });
    const dotScale = getStarScale({ scale: dot.scale.value, size: dot.scale.size });
    const haloAlpha = getStarAlpha({ scale: dotScale, multiplier: HALO_ALPHA_BASE });
    const haloScale = dotScale * HALO_SCALE;

    return (
      <pixiContainer key={star.id} x={star.positionX} y={star.positionY}>
        <pixiContainer filters={alphaFilter} ref={wrapperBinder}>
          <pixiSprite scale={dotScale} ref={dotBinder} texture={circleTexture} anchor={anchor} tint={star.color} />
          {isComposite(star.size) && (
            <pixiSprite scale={starScale} rotation={main.rotate?.value || 0} ref={starBinder} texture={starShapeTexture} anchor={anchor} tint={star.color} />
          )}
        </pixiContainer>
        <pixiSprite scale={haloScale} alpha={haloAlpha} ref={haloBinder} texture={glowTexture} anchor={anchor} tint={star.color} />
      </pixiContainer>
    );
  });
}
