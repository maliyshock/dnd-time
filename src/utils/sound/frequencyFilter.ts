import { FADE_DURATION } from "~/constants.ts";

type Filter = {
  from?: number;
  to: number;
  filterNode: BiquadFilterNode;
  audioContext: AudioContext;
};

export function frequencyFilter({ from = 20000, to, filterNode, audioContext }: Filter) {
  const { currentTime } = audioContext;

  filterNode.frequency.setValueAtTime(from, currentTime);
  filterNode.frequency.exponentialRampToValueAtTime(Math.max(to, 0.1), currentTime + FADE_DURATION);
}
