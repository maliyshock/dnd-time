import useStore from "~/store/useStore.ts";
import { useEffect, useRef, useState } from "react";
import music from "~/assets/sound/music.mp3";

const MAX_VOLUME = 0.7;
const FADE_DURATION = 0.5;
const HIGHPASS_FREQ = 200;
const NORMAL_PLAYBACK_RATE = 1.0;
const SLOW_PLAYBACK_RATE = 0.5;

const COMPRESSOR_THRESHOLD = -50; // dB, порог срабатывания (от -100 до 0)
const COMPRESSOR_KNEE = 10; // dB, плавность перехода (от 0 до 40)
const COMPRESSOR_RATIO = 4; // соотношение компрессии (от 1 до 20)
const COMPRESSOR_ATTACK = 0.01; // секунды (от 0 до 1)
const COMPRESSOR_RELEASE = 0.25; // секунды (от 0 до 1)

type Fade = {
  from: number;
  to: number;
  gainNode: GainNode;
  audioContext: AudioContext;
};

type Filter = {
  from?: number;
  to: number;
  filterNode: BiquadFilterNode;
  audioContext: AudioContext;
};

type PlaybackRate = {
  from: number;
  to: number;
  sourceNode: AudioBufferSourceNode;
  audioContext: AudioContext;
};

function fade({ from, to, gainNode, audioContext }: Fade) {
  const { currentTime } = audioContext;

  gainNode.gain.value = MAX_VOLUME;
  gainNode.gain.setValueAtTime(from, currentTime);
  gainNode.gain.linearRampToValueAtTime(to, currentTime + FADE_DURATION);
}

function changePlaybackRate({ from, to, sourceNode, audioContext }: PlaybackRate) {
  const { currentTime } = audioContext;

  sourceNode.playbackRate.setValueAtTime(from, currentTime);
  sourceNode.playbackRate.linearRampToValueAtTime(to, currentTime + FADE_DURATION);
}

function filter({ from = 20000, to, filterNode, audioContext }: Filter) {
  const { currentTime } = audioContext;

  filterNode.frequency.setValueAtTime(from, currentTime);
  filterNode.frequency.exponentialRampToValueAtTime(Math.max(to, 0.1), currentTime + FADE_DURATION);
}

export function useSoundControl() {
  // TODO: use react 19 assets loader features
  const [isReady, setReady] = useState(false);
  const play = useStore(store => store.play);
  const soundOn = useStore(store => store.soundOn);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const isPlayingRef = useRef(false);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const compressorRef = useRef<DynamicsCompressorNode | null>(null);

  useEffect(() => {
    const initAudio = async () => {
      try {
        const audioContext = new AudioContext();
        const response = await fetch(music);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

        // nodes
        const sourceNode = audioContext.createBufferSource();
        const filterNode = audioContext.createBiquadFilter();
        const compressorNode = audioContext.createDynamicsCompressor();
        const gainNode = audioContext.createGain();

        // compressor
        compressorNode.threshold.value = COMPRESSOR_THRESHOLD;
        compressorNode.knee.value = COMPRESSOR_KNEE;
        compressorNode.ratio.value = COMPRESSOR_RATIO;
        compressorNode.attack.value = COMPRESSOR_ATTACK;
        compressorNode.release.value = COMPRESSOR_RELEASE;

        // filter
        filterNode.type = "lowpass";
        filterNode.frequency.value = 20000;

        // source
        sourceNode.buffer = audioBuffer;
        sourceNode.loop = true;
        sourceNode.playbackRate.value = NORMAL_PLAYBACK_RATE;

        // volume
        gainNode.gain.value = MAX_VOLUME;

        // connection: source -> filter -> compressor -> gain -> output
        sourceNode.connect(filterNode);
        filterNode.connect(compressorNode);
        compressorNode.connect(gainNode);
        gainNode.connect(audioContext.destination);

        // save links
        audioContextRef.current = audioContext;
        sourceRef.current = sourceNode;
        filterRef.current = filterNode;
        compressorRef.current = compressorNode;
        gainNodeRef.current = gainNode;

        setReady(true);
      } catch (error) {
        console.error("Error initializing audio:", error);
        setReady(false);
      }
    };

    initAudio();
  }, []);

  useEffect(() => {
    if (!filterRef.current || !audioContextRef.current || !sourceRef.current) return;

    if (play) {
      filter({ from: HIGHPASS_FREQ, to: 20000, audioContext: audioContextRef.current, filterNode: filterRef.current });
      changePlaybackRate({
        from: SLOW_PLAYBACK_RATE,
        to: NORMAL_PLAYBACK_RATE,
        sourceNode: sourceRef.current,
        audioContext: audioContextRef.current,
      });
    } else {
      filter({ to: HIGHPASS_FREQ, audioContext: audioContextRef.current, filterNode: filterRef.current });
      changePlaybackRate({
        from: NORMAL_PLAYBACK_RATE,
        to: SLOW_PLAYBACK_RATE,
        sourceNode: sourceRef.current,
        audioContext: audioContextRef.current,
      });
    }
  }, [play]);

  useEffect(() => {
    if (!audioContextRef.current || !gainNodeRef.current || !sourceRef.current) return;

    if (soundOn) {
      if (!isPlayingRef.current) {
        sourceRef.current.start(0);
        isPlayingRef.current = true;
      }

      fade({ from: 0, to: MAX_VOLUME, gainNode: gainNodeRef.current, audioContext: audioContextRef.current });
    } else {
      gainNodeRef.current.gain.value = 0;

      fade({ from: MAX_VOLUME, to: 0, gainNode: gainNodeRef.current, audioContext: audioContextRef.current });
    }
  }, [soundOn]);

  return { audioContextRef, isReady };
}
