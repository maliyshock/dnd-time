import { ReactNode, useEffect, useRef } from "react";
import { useApplication } from "@pixi/react";
import { Container, Ticker } from "pixi.js";
import { SCENE_RPM } from "~/constants.ts";

export function Scene({ children }: { children: ReactNode }) {
  const { app } = useApplication();
  const sceneRef = useRef<Container | null>(null);

  useEffect(() => {
    const scene = sceneRef.current;

    if (!scene) return;

    const radiansPerSecond = (SCENE_RPM * Math.PI * 2) / 60;
    const tick = (ticker: Ticker) => {
      scene.rotation -= radiansPerSecond * (ticker.deltaTime / 60);
    };

    app.ticker.add(tick);

    return () => {
      app.ticker.remove(tick);
    };
  }, [app]);

  if (!app?.renderer) return null;

  const cx = app.screen.width / 2;
  const cy = app.screen.height / 2;

  return (
    <pixiContainer ref={sceneRef} pivot={{ x: cx, y: cy }} position={{ x: cx, y: cy }}>
      {children}
    </pixiContainer>
  );
}
