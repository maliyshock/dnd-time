import { useEffect, useState } from "react";

const getOrientation = () => window.screen.orientation.type;

export function useScreenOrientation() {
  const [orientation, setOrientation] = useState(getOrientation());

  const updateOrientation = () => {
    setOrientation(getOrientation());
  };

  useEffect(() => {
    window.addEventListener("orientationchange", updateOrientation);

    return () => {
      window.removeEventListener("orientationchange", updateOrientation);
    };
  }, []);

  return orientation;
}
