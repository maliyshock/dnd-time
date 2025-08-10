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
  const activeSource = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    // since we have a lot of elements having subscription for the sounds, using zustand store state here triggers re-renders in many places
    // this allows to subscribe for play without having multiple re-renders
    return useStore.subscribe(
      s => s.play,
      play => {
        const { audioContext, filterNode } = useStore.getState();

        if (!activeSource.current) return;

        frequencyFilter({ from: HIGHPASS_FREQ, to: 20000, audioContext, filterNode });

        changePlaybackRate({
          from: play ? SLOW_PLAYBACK_RATE : NORMAL_PLAYBACK_RATE,
          to: play ? NORMAL_PLAYBACK_RATE : SLOW_PLAYBACK_RATE,
          sourceNode: activeSource.current,
          audioContext,
        });
      },
    );
  }, []);

  return useCallback(() => {
    const { audioIsReady, audioBuffers, audioContext, filterNode, play } = useStore.getState();

    if (!audioIsReady || !audioBuffers.has(name)) return;
    const audioBuffer = audioBuffers.get(name);

    if (!audioBuffer) return;

    stopActiveSource({ audioSource: activeSource.current, audioContext, filterNode });

    const currentPlaybackRate = play ? NORMAL_PLAYBACK_RATE : SLOW_PLAYBACK_RATE;
    const newSource = setupAudioSource({
      audioBuffer,
      audioContext,
      filterNode,
      playbackRate: currentPlaybackRate,
      shift,
      loop,
    });

    activeSource.current = newSource;
    newSource.start(0);
  }, [name, loop, shift]);
}
