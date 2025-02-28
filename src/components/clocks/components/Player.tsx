import { Stop } from "~/components/icons/stop.tsx";
import { Play } from "~/components/icons/play.tsx";
import useStore from "~/store/useStore.ts";
import { useAnimationControl } from "~/hooks/useAnimationControl.ts";

export function Player() {
  const play = useStore(store => store.play);
  const setPlay = useStore(store => store.setPlay);
  const cmdIsPressed = useStore(store => store.cmdIsPressed);
  const [, setState] = useAnimationControl();

  return (
    <button
      className={`clocks__player clocks__clickable-item ${cmdIsPressed ? "fade-in" : ""}`}
      onClick={() => {
        const nextState = !play;

        setPlay(nextState);
        setState(nextState ? "running" : "paused");
      }}
    >
      {play ? <Stop /> : <Play />}
    </button>
  );
}
