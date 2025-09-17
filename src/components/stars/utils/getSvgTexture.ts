import { Application as AppType, Container, Sprite, Texture } from "pixi.js";
import { STAR_MAX_SIZE } from "~/constants.ts";

export function getNormalizedSvgTexture(app: AppType, svgTexture: Texture) {
  const container = new Container();
  const sprite = new Sprite(svgTexture);

  sprite.anchor.set(0.5);

  const originalWidth = svgTexture.width || 1;
  const originalHeight = svgTexture.height || 1;
  const maxSide = Math.max(originalWidth, originalHeight);
  const uniformScale = STAR_MAX_SIZE / maxSide;

  sprite.scale.set(uniformScale);

  container.addChild(sprite);

  const normalizedTexture = app.renderer.generateTexture(container);

  sprite.destroy();
  container.destroy({ children: true });

  return normalizedTexture;
}
