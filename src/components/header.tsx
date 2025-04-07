import { Button } from "~/components/ui/button";
import { Sound } from "~/components/ui/icons/sound.tsx";
import useStore from "~/store/useStore.ts";
import { usePrepareAudio } from "~/hooks/usePrepareAudio.ts";
import { AUDIO_FILES } from "~/constants.ts";
import { useRef } from "react";
import { useGetPlaySample } from "~/hooks/useGetPlaySample.ts";

export function Header({ className }: { className?: string }) {
  const setSoundToggle = useStore(store => store.setSoundToggle);
  const soundOn = useStore(store => store.soundOn);
  const audioIsReady = useStore(store => store.audioIsReady);
  const isPlayingRef = useRef(false);
  const playWetClick = useGetPlaySample({ name: "wetClickHigh" });
  const playMusic = useGetPlaySample({ name: "musicTheme", loop: true });

  usePrepareAudio(AUDIO_FILES);

  const handleOnClick = () => {
    if (!soundOn) {
      playWetClick();
    }

    // start to play music and never stop after
    if (isPlayingRef.current === false) {
      playMusic();
      isPlayingRef.current = true;
    }

    setSoundToggle();
  };

  // TODO: would jump on mobiles if static
  if (!audioIsReady) return;

  return (
    <header className={className}>
      <Button active={soundOn} color="white" isTransparent={!soundOn} variation="hollow" size="medium" onClick={handleOnClick}>
        <Sound />
      </Button>
    </header>
  );
}
