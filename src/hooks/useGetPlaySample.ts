import useStore from "~/store/useStore.ts";
import { useCallback, useEffect, useRef } from "react";
import { frequencyFilter } from "~/utils/sound/frequencyFilter.ts";
import { HIGHPASS_FREQ, NORMAL_PLAYBACK_RATE, SLOW_PLAYBACK_RATE } from "~/constants.ts";
import { changePlaybackRate } from "~/utils/sound/changePlaybackRate.ts";
import { getRandomNum } from "~/utils/getRandomNum.ts";

export function useGetPlaySample({ name, loop, shift }: { name: string; loop?: boolean; shift?: boolean }) {
  const play = useStore(store => store.play);
  const audioBuffers = useStore(store => store.audioBuffers);
  const audioContext = useStore(store => store.audioContext);
  const filterNode = useStore(store => store.filterNode);
  const audioIsReady = useStore(store => store.audioIsReady);
  const activeSource = useRef<AudioBufferSourceNode | null>(null);

  //TODO: this will work only for continuing play, we might need a separation
  useEffect(() => {
    if (!activeSource.current) return;
    frequencyFilter({ from: HIGHPASS_FREQ, to: 20000, audioContext, filterNode });
    changePlaybackRate({
      from: play ? SLOW_PLAYBACK_RATE : NORMAL_PLAYBACK_RATE,
      to: play ? NORMAL_PLAYBACK_RATE : SLOW_PLAYBACK_RATE,
      sourceNode: activeSource.current,
      audioContext,
    });
  }, [audioContext, filterNode, play]);

  return useCallback(() => {
    if (!audioIsReady || !audioBuffers.has(name)) return;
    const audioBuffer = audioBuffers.get(name);
    const newSource = audioContext.createBufferSource();

    if (activeSource.current) {
      activeSource.current.stop();
      activeSource.current.disconnect();
    }

    if (audioBuffer) {
      newSource.buffer = audioBuffer;
      newSource.connect(filterNode);
      activeSource.current = newSource;
      activeSource.current.playbackRate.value = play ? NORMAL_PLAYBACK_RATE : SLOW_PLAYBACK_RATE;

      if (shift) {
        const shift = getRandomNum({ min: 0, max: 2 }) - 1;
        const shiftRate = Math.pow(2, shift / 12);

        activeSource.current.playbackRate.value = activeSource.current.playbackRate.value * shiftRate;
      }

      if (loop) {
        newSource.loop = loop;
      }

      newSource?.start(0);
    }

    newSource.onended = () => {
      newSource.disconnect();
    };
  }, [audioBuffers, audioContext, audioIsReady, filterNode, loop, name, play, shift]);
}
