import useStore from "~/store/useStore.ts";
import { useCallback, useEffect, useRef } from "react";
import { frequencyFilter } from "~/utils/sound/frequencyFilter.ts";
import { HIGHPASS_FREQ, NORMAL_PLAYBACK_RATE, SLOW_PLAYBACK_RATE } from "~/constants.ts";
import { changePlaybackRate } from "~/utils/sound/changePlaybackRate.ts";
import { getRandomNum } from "~/utils/getRandomNum.ts";
import { fade } from "~/utils/sound/fade.ts";

const QUICK_FADE = 0.05;

type UseGetPlaySample = {
  name: string;
  loop?: boolean;
  shift?: boolean;
};

type StopActiveSource = {
  audioSource: AudioBufferSourceNode | null;
  audioContext: AudioContext;
  filterNode: BiquadFilterNode;
};

type SetupAudioSource = {
  audioBuffer: AudioBuffer;
  audioContext: AudioContext;
  filterNode: BiquadFilterNode;
  playbackRate: number;
  shift?: boolean;
  loop?: boolean;
};

function stopActiveSource({ audioSource, audioContext, filterNode }: StopActiveSource) {
  if (!audioSource) return;

  const gainNode = audioContext.createGain();

  audioSource.disconnect();
  audioSource.connect(gainNode);
  gainNode.connect(filterNode);

  fade({ from: 1, to: 0, audioContext, gainNode, fadeDuration: QUICK_FADE });

  audioSource.stop(audioContext.currentTime + QUICK_FADE);
  audioSource.onended = () => gainNode.disconnect();
}

function setupAudioSource({ audioBuffer, audioContext, filterNode, playbackRate, shift, loop }: SetupAudioSource): AudioBufferSourceNode {
  const newSource = audioContext.createBufferSource();

  newSource.buffer = audioBuffer;
  newSource.playbackRate.value = playbackRate;

  // pitch shift
  if (shift) {
    const shiftValue = getRandomNum({ min: 0, max: 2 }) - 1;
    const shiftRate = Math.pow(2, shiftValue / 12);

    newSource.playbackRate.value *= shiftRate;
  }

  newSource.connect(filterNode);

  newSource.onended = () => {
    newSource.disconnect();
  };

  newSource.loop = !!loop;

  return newSource;
}

export function useGetPlaySample({ name, loop, shift }: UseGetPlaySample) {
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

    if (!audioBuffer) return;

    // if we already have current sound currently playing
    stopActiveSource({
      audioSource: activeSource.current,
      audioContext,
      filterNode,
    });

    const currentPlaybackRate = play ? NORMAL_PLAYBACK_RATE : SLOW_PLAYBACK_RATE;

    const newSource = setupAudioSource({
      audioBuffer,
      audioContext,
      filterNode,
      playbackRate: currentPlaybackRate,
      shift,
      loop,
    });

    // save reference and trigger play
    activeSource.current = newSource;
    newSource.start(0);
  }, [audioBuffers, audioContext, audioIsReady, filterNode, loop, name, play, shift]);
}
