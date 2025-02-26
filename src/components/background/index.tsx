import "./background.scss";
import useStore from "~/store/useStore.ts";
import { motion, useAnimation } from "motion/react";
import { useEffect } from "react";

export function Background() {
  const currentColors = useStore(store => store.currentColors);
  const firstColor = currentColors[0];
  const secondColor = currentColors[1];
  const controls = useAnimation();

  useEffect(() => {
    const newBackground = `linear-gradient(${currentColors[2] || 45}deg, rgb(${firstColor.r}, ${firstColor.g}, ${firstColor.b}), rgb(${secondColor.r}, ${secondColor.g}, ${secondColor.b}) 100%`;

    controls.start({ background: newBackground });
  }, [controls, currentColors, firstColor.b, firstColor.g, firstColor.r, secondColor.b, secondColor.g, secondColor.r]);

  return <motion.div animate={controls} className="background" transition={{ duration: 2 }} />;
}
