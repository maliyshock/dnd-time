import { Stop } from "~/components/icons/stop.tsx";
import { Play } from "~/components/icons/play.tsx";
import useStore from "~/store/useStore.ts";
import { useState } from "react";

export function Player() {
  const play = useStore(store => store.play);
  const setPlay = useStore(store => store.setPlay);
  const cmdIsPressed = useStore(store => store.cmdIsPressed);
  const [localState, setLocalState] = useState<boolean>(play);

  return (
    <button
      className={`clocks__player ${cmdIsPressed ? "fade-in" : ""}`}
      onClick={() => {
        setPlay(!play);
        setLocalState(!play);
      }}
    >
      {localState ? <Stop /> : <Play />}
    </button>
  );
}
