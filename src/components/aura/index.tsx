import { motion, useAnimation } from "motion/react";
import { useEffect } from "react";
import useStore from "~/store/useStore.ts";
import { lighter } from "~/utils/colors/lighter.ts";
import { RGBColor } from "~/types.ts";
import "./aura.scss";
import { rgbToHsl } from "~/utils/colors/rgbToHsl.ts";

type AuraProps = {
  scaleUp?: number;
  texture?: string;
  rotation?: boolean;
  transparencyStart?: number;
};

type MakeRadialGradient = {
  color: RGBColor;
  transparencyStart: number;
  texture?: string;
};

function makeRadialGradient({ color, transparencyStart, texture }: MakeRadialGradient) {
  return `radial-gradient(rgb(${color.r}, ${color.g}, ${color.b}), transparent ${transparencyStart}%) ${texture ? `, url(${texture})` : ""}`;
}

export function Aura({ texture, scaleUp = 1, rotation = false, transparencyStart = 70 }: AuraProps) {
  const currentColors = useStore(store => store.currentColors);
  const hsl0 = rgbToHsl(currentColors[0]); // { l: 50 }
  const hsl1 = rgbToHsl(currentColors[1]);
  const lighterColor = hsl0.l >= hsl1.l ? currentColors[0] : currentColors[1];
  const auraColor = lighter(lighterColor, 30);
  const controls = useAnimation();

  useEffect(() => {
    const newBackground = makeRadialGradient({ color: auraColor, transparencyStart, texture });

    controls.start({
      backgroundImage: newBackground,
      ...(texture !== undefined
        ? {
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: `100%, ${Math.round((1 / scaleUp) * 100)}%`,
          }
        : {}),
    });
  }, [controls, auraColor, auraColor.b, auraColor.g, auraColor.r, scaleUp, texture, transparencyStart]);

  return (
    <motion.div
      animate={controls}
      className={`aura ${rotation ? "rotation" : ""}`}
      style={{
        transform: `scale(${scaleUp})`,
      }}
      transition={{ duration: 2 }}
    />
  );
}
