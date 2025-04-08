import { FADE_DURATION } from "~/constants.ts";

type PlaybackRate = {
  from: number;
  to: number;
  sourceNode: AudioBufferSourceNode;
  audioContext: AudioContext;
};

export function changePlaybackRate({ from, to, sourceNode, audioContext }: PlaybackRate) {
  const { currentTime } = audioContext;

  sourceNode.playbackRate.setValueAtTime(from, currentTime);
  sourceNode.playbackRate.linearRampToValueAtTime(to, currentTime + FADE_DURATION);
}
