import { Button } from "~/components/ui/button/index.tsx";
import { Sound } from "~/components/ui/icons/Sound.tsx";
import useStore from "~/store/useStore.ts";
import { usePrepareAudio } from "~/hooks/usePrepareAudio.ts";
import { AUDIO_FILES } from "~/constants.ts";
import { useRef } from "react";
import { useGetPlaySample } from "~/hooks/useGetPlaySample.ts";
import "./header.scss";
import { cn } from "~/utils/cn.ts";
import { SwapWorld } from "~/components/header/worlds/SwapWorld.tsx";
import { AboutProject } from "~/components/header/AboutProject.tsx";

export function Header({ className }: { className?: string }) {
  const activeWorldName = useStore(store => store.worlds[store.activeWorldId].name);
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

  // TODO: would jump on mobiles if static
  if (!audioIsReady) return;

  return (
    <header className={`header flex flex-wrap gap-4 items-center ${className}`}>
      <h2 className="md:order-1 order-2 worldName shrink-0">{activeWorldName}</h2>
      <div
        role="toolbar"
        aria-label="Main actions"
        className={cn(
          "md:order-2 order-1 flex shrink-0 border rounded-4xl border-[var(--toolbar-border)] px-6 py-3 md:p-6 gap-3 md:gap-6 justify-between md:justify-normal w-full md:w-auto",
        )}
      >
        <AboutProject />

        <SwapWorld />

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
