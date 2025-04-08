import { motion, useAnimation } from "motion/react";
import { useEffect } from "react";
import useStore from "~/store/useStore.ts";
import { lighter } from "~/utils/colors/lighter.ts";
import { RGBColor } from "~/types.ts";
import "./aura.scss";
import { rgbToHsl } from "~/utils/colors/rgbToHsl.ts";

type AuraProps = {
  scaleUp?: number;
  texture?: URL;
  rotation?: boolean;
  transparencyStart?: number;
};

type MakeRadialGradient = {
  color: RGBColor;
  transparencyStart: number;
  texture?: URL;
};

function makeRadialGradient({ color, transparencyStart, texture }: MakeRadialGradient) {
  return `radial-gradient(rgb(${color.r}, ${color.g}, ${color.b}), transparent ${transparencyStart}%) ${texture ? `, url(${texture})` : ""}`;
}

export function Aura({ texture, scaleUp = 1, rotation = false, transparencyStart = 70 }: AuraProps) {
  const currentColors = useStore(store => store.currentColors);
  const hsl0 = rgbToHsl(currentColors[0]);
  const hsl1 = rgbToHsl(currentColors[1]);
  const lighterColor = hsl0.l >= hsl1.l ? currentColors[0] : currentColors[1];
  const auraColor = lighter(lighterColor, 30);
  const controls = useAnimation();

  useEffect(() => {
    const newBackground = makeRadialGradient({ color: auraColor, transparencyStart, texture });

    controls.start({
      transition: { duration: 2 },
      backgroundImage: newBackground,
      ...(texture !== undefined
        ? {
            backgroundSize: `100%, ${Math.round((1 / scaleUp) * 100)}%`,
          }
        : {}),
    });
  }, [auraColor, controls, scaleUp, texture, transparencyStart]);

  return (
    <motion.div
      animate={controls}
      className={`aura ${rotation ? "rotation" : ""}`}
      initial={{
        backgroundImage: makeRadialGradient({ color: auraColor, transparencyStart, texture }),
        transform: `scale(${scaleUp})`,
        backgroundSize: "100%, 0%",
        backgroundRepeat: "no-repeat, no-repeat",
        backgroundPosition: "center, center",
      }}
    />
  );
}
