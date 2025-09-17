import { Application } from "@pixi/react";
import { memo } from "react";
import { Stars } from "~/components/stars/Stars.tsx";
import { getScreenHypotenuse } from "~/utils/getHypotenuse.ts";
import { Scene } from "~/components/stars/Scene.tsx";
import { getResolution } from "~/components/stars/utils/getResolution.ts";

const screenSize = getScreenHypotenuse();

export function StarsContainer() {
  return (
    <div className="stars" style={{ left: (window.screen.width - screenSize) / 2, top: (window.screen.height - screenSize) / 2 }}>
      <Application
        autoDensity
        resolution={getResolution()}
        backgroundAlpha={0}
        antialias
        powerPreference="high-performance"
        width={screenSize}
        height={screenSize}
      >
        <Scene>
          <Stars />
        </Scene>
      </Application>
    </div>
  );
}

export const MemoizedStars = memo(StarsContainer);
