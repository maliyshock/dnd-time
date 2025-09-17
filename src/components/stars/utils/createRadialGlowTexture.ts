import { Application as AppType, Container, Graphics, Texture, FillGradient } from "pixi.js";
import { STAR_MAX_SIZE } from "~/constants.ts";

// const graphics = new Graphics();
// const container = new Container();
//
// // graphics.circle uses radius instead of diameter, means we have to divide by 2
// container.addChild(graphics.circle(0, 0, STAR_MAX_SIZE / 2).fill(0xffffff));
//
// // order matters this constant should go after container.addChild
// const texture = app.renderer.generateTexture(container);
//
// graphics.destroy(true);
// container.destroy(true);
//
// return texture;

export function createRadialGlowTexture(app: AppType): Texture {
  const graphics = new Graphics();
  const container = new Container();
  const radiusPx = STAR_MAX_SIZE / 2;
  const coreRatio = 0.25;
  const edgeFeather = 0.998;

  const gradient = new FillGradient({
    type: "radial",
    textureSpace: "local",
    center: { x: 0.5, y: 0.5 },
    innerRadius: Math.max(0, Math.min(1, coreRatio)),
    outerCenter: { x: 0.5, y: 0.5 },
    outerRadius: 0.5,
    colorStops: [
      { offset: 0, color: "rgba(255,255,255,1)" },
      { offset: Math.max(0, Math.min(1, edgeFeather)), color: "rgba(255,255,255,0)" },
    ],
  });

  graphics.position.set(radiusPx, radiusPx);
  graphics.circle(0, 0, radiusPx).fill(gradient);
  container.addChild(graphics);
  const texture = app.renderer.generateTexture(container);

  graphics.destroy(true);
  container.destroy(true);

  return texture;
}
