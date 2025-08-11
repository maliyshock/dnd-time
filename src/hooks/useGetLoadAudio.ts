import { useCallback } from "react";
import useStore from "~/store/useStore.ts";
import type { AudioFile } from "~/types.ts";

const BATCH_LIMIT = 3;

export function useGetLoadAudio() {
  const setAudioIsReady = useStore(s => s.setAudioIsReady);
  const audioContext = useStore(s => s.audioContext);
  const setAudioSource = useStore(s => s.setAudioSource);

  const loadAudio = useCallback(
    async (audioFile: AudioFile) => {
      if (!audioContext) return;
      const response = await fetch(audioFile.filePath);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      setAudioSource({ name: audioFile.name, audioBuffer });
    },
    [audioContext, setAudioSource],
  );

  return useCallback(
    async (files: AudioFile[]) => {
      try {
        for (let startIndex = 0; startIndex < files.length; startIndex += BATCH_LIMIT) {
          console.log("---start loading audios from", startIndex, " to ", startIndex + BATCH_LIMIT);
          const currentBatch = files.slice(startIndex, startIndex + BATCH_LIMIT);

          await Promise.all(currentBatch.map(loadAudio));
        }

        setAudioIsReady(true);
      } catch (e) {
        console.log("error", e);
        setAudioIsReady(false);
      }
    },
    [loadAudio, setAudioIsReady],
  );
}
