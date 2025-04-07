import { FADE_DURATION, MAX_VOLUME } from "~/constants.ts";

type Fade = {
  from: number;
  to: number;
  gainNode: GainNode;
  audioContext: AudioContext;
};

export function fade({ from, to, gainNode, audioContext }: Fade) {
  const { currentTime } = audioContext;

  gainNode.gain.value = MAX_VOLUME;
  gainNode.gain.setValueAtTime(from, currentTime);
  gainNode.gain.linearRampToValueAtTime(to, currentTime + FADE_DURATION);
}
