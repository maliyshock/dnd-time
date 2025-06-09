import { Button } from "~/components/ui/button/index.tsx";
import { Sound } from "~/components/ui/icons/Sound.tsx";
import { Swap } from "~/components/ui/icons/Swap.tsx";
import useStore from "~/store/useStore.ts";
import { usePrepareAudio } from "~/hooks/usePrepareAudio.ts";
import { AUDIO_FILES } from "~/constants.ts";
import { useRef } from "react";
import { useGetPlaySample } from "~/hooks/useGetPlaySample.ts";
import "./header.scss";
import { cn } from "~/utils/cn.ts";
import { AboutProject } from "~/components/header/AboutProject.tsx";

export function Header({ className }: { className?: string }) {
  const setSoundToggle = useStore(store => store.setSoundToggle);
  const soundOn = useStore(store => store.soundOn);
  const audioIsReady = useStore(store => store.audioIsReady);
  const isPlayingRef = useRef(false);
  const playWetClick = useGetPlaySample({ name: "wetClickHigh" });
  const playMusic = useGetPlaySample({ name: "musicTheme", loop: true });

  usePrepareAudio(AUDIO_FILES);

  const handleSound = () => {
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

  const handleSwap = () => {};

  // TODO: would jump on mobiles if static
  if (!audioIsReady) return;

  return (
    <header className={`header ${className}`}>
      <div role="toolbar" aria-label="Main actions" className={cn("flex gap-6 justify-between md:justify-normal w-full md:w-auto")}>
        <AboutProject />

        <Button aria-label="Swap world" color="white" isTransparent={!soundOn} variation="hollow" size="medium" onMouseDown={handleSwap}>
          <Swap />
        </Button>

        <Button
          aria-label={`turn sound ${soundOn ? "off" : "on"}`}
          active={soundOn}
          color="white"
          isTransparent={!soundOn}
          variation="hollow"
          size="medium"
          onMouseDown={handleSound}
        >
          <Sound />
        </Button>
      </div>
    </header>
  );
}
