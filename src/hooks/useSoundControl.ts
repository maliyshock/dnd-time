import { useEffect, useRef } from "react";
import useStore from "~/store/useStore.ts";
import { AUDIO_FILES } from "~/constants.ts";
import { useGetLoadAudio } from "~/hooks/useGetLoadAudio.ts";
import { useGetPlaySample } from "~/hooks/useGetPlaySample.ts";

export function useSoundControl() {
  const loadAudio = useGetLoadAudio();
  const loadHasBeenTriggered = useRef(false);
  const isPlayingRef = useRef(false);
  const playMusic = useGetPlaySample({ name: "musicTheme", loop: true });

  useEffect(() => {
    return useStore.subscribe(
      store => store.soundOn,
      soundOn => {
        // on first soundOn trigger the load of all audios
        if (!soundOn || loadHasBeenTriggered.current) return;
        loadHasBeenTriggered.current = true;
        loadAudio(AUDIO_FILES);
      },
    );
  }, [loadAudio]);

  useEffect(() => {
    return useStore.subscribe(
      store => [store.audioIsReady, store.soundOn], // селектор сразу двух полей
      ([audioIsReady, soundOn]) => {
        // if sound is off or audio is not ready - return
        if (!audioIsReady || !soundOn) return;

        // if audio is ready and sound is on and we not playing music yet - invoke playMusic()
        if (!isPlayingRef.current) {
          playMusic();
          isPlayingRef.current = true;
        }
      },
    );
  }, [playMusic]);
}
