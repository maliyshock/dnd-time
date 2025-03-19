import { Stop } from "~/components/ui/icons/stop.tsx";
import { Play } from "~/components/ui/icons/play.tsx";
import useStore from "~/store/useStore.ts";

export function Player() {
  const play = useStore(store => store.play);
  const setTogglePlay = useStore(store => store.setTogglePlay);
  const cmdIsPressed = useStore(store => store.cmdIsPressed);

  return (
    <button className={`clocks__player clocks__clickable-item ${cmdIsPressed ? "fade-in" : ""}`} onClick={setTogglePlay}>
      {play ? <Stop /> : <Play />}
    </button>
  );
}
