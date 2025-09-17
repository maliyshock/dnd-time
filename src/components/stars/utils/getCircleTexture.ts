import { Application as AppType, Container, Graphics } from "pixi.js";
import { STAR_MAX_SIZE } from "~/constants.ts";

export function getCircleTexture(app: AppType) {
  const graphics = new Graphics();
  const container = new Container();

  // graphics.circle uses radius instead of diameter, means we have to divide by 2
  container.addChild(graphics.circle(0, 0, STAR_MAX_SIZE / 2).fill(0xffffff));

  // order matters this constant should go after container.addChild
  const texture = app.renderer.generateTexture(container);

  graphics.destroy();
  container.destroy({ children: true });

  return texture;
}
