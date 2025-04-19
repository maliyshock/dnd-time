import { FADE_DURATION } from "~/constants.ts";

type Fade = {
  from: number;
  to: number;
  gainNode: GainNode;
  audioContext: AudioContext;
  startTime?: number;
  fadeDuration?: number;
};

export function fade({ from, to, gainNode, audioContext, startTime, fadeDuration = FADE_DURATION }: Fade) {
  const start = startTime ?? audioContext.currentTime;

  gainNode.gain.setValueAtTime(from, start);
  gainNode.gain.linearRampToValueAtTime(to, start + fadeDuration);
}
