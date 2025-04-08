import { StateCreator } from "zustand";
import { fade } from "~/utils/sound/fade.ts";
import { MAX_VOLUME } from "~/constants.ts";

type AudioSource = {
  name: string;
  audioBuffer: AudioBuffer;
};

export type SoundSlice = {
  audioIsReady: boolean;
  soundOn: boolean;
  audioContext: AudioContext;
  filterNode: BiquadFilterNode; // we are going to use only 1 filter for now
  gainNode: GainNode;
  audioBuffers: Map<string, AudioBuffer>;
  setAudioSource: (payload: AudioSource) => void;
  setSoundOn: (isOn: boolean) => void;
  setSoundToggle: () => void;
  setAudioIsReady: (payload: boolean) => void;
};

const audioContext = new AudioContext();
const filterNode = audioContext.createBiquadFilter();
const gainNode = audioContext.createGain();

filterNode.type = "lowpass";
filterNode.frequency.value = 20000;

gainNode.gain.value = 0;

// connection: source -> filter -> compressor -> gain -> output
filterNode.connect(gainNode);
gainNode.connect(audioContext.destination);

const initialState = {
  audioIsReady: false,
  soundOn: false,
  audioContext,
  filterNode,
  gainNode,
  audioBuffers: new Map(),
};

export const soundSlice: StateCreator<SoundSlice, [], [], SoundSlice> = set => ({
  ...initialState,
  setAudioSource: ({ name, audioBuffer }: AudioSource) =>
    set(store => {
      if (store.audioBuffers.get(name)) {
        return {};
      }

      const newMap = new Map(store.audioBuffers);

      newMap.set(name, audioBuffer);

      return { audioBuffers: newMap };
    }),
  setSoundToggle: () =>
    set(store => {
      fade({
        from: store.soundOn === false ? 0 : MAX_VOLUME,
        to: store.soundOn === false ? MAX_VOLUME : 0,
        gainNode: store.gainNode,
        audioContext: store.audioContext,
      });

      return { soundOn: !store.soundOn };
    }),
  setSoundOn: (payload: boolean) =>
    set(store => {
      fade({ from: 0, to: MAX_VOLUME, gainNode: store.gainNode, audioContext: store.audioContext });

      return {
        soundOn: payload,
      };
    }),
  setAudioIsReady: (payload: boolean) => set(() => ({ audioIsReady: payload })),
});
