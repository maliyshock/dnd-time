import { Stop } from "~/components/ui/icons/Stop";
import { Play } from "~/components/ui/icons/Play";
import useStore from "~/store/useStore.ts";
import { Button } from "~/components/ui/button";
import { useGetPlaySample } from "~/hooks/useGetPlaySample.ts";

export function Player() {
  const play = useStore(store => store.play);
  const setTogglePlay = useStore(store => store.setTogglePlay);
  const cmdIsPressed = useStore(store => store.cmdIsPressed);
  const dropSample = useGetPlaySample({ name: "drop" });

  return (
    <Button
      className={`clocks__player clocks__clickable-item ${cmdIsPressed ? "fade-in" : ""}`}
      onMouseDown={() => {
        setTogglePlay();
        dropSample();
      }}
    >
      {play ? <Stop /> : <Play />}
    </Button>
  );
}
