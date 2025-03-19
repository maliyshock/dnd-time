import { useEffect } from "react";
import useStore from "~/store/useStore.ts";

export function useKeyListener() {
  const setCmdIsPressed = useStore(store => store.setCmdIsPressed);
  const setTogglePlay = useStore(store => store.setTogglePlay);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Meta") {
        setCmdIsPressed(true); // TODO: just show tips, we do not need cmd is pressed
      }

      if (e.code === "Space") {
        setTogglePlay();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Meta") {
        setCmdIsPressed(false);
      }
    };

    // Add event listeners for keydown and keyup
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [setCmdIsPressed, setTogglePlay]);

  return;
}
