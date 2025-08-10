import { useCallback, useEffect } from "react";
import useStore from "~/store/useStore.ts";
import type { AudioFile } from "~/types.ts";

export function usePrepareAudio(audioFiles: AudioFile[]) {
  const setAudioIsReady = useStore(s => s.setAudioIsReady);
  const audioContext = useStore(s => s.audioContext);
  const setAudioSource = useStore(s => s.setAudioSource);

  const loadAudio = useCallback(
    async (audioFile: AudioFile, signal?: AbortSignal) => {
      if (!audioContext) return;
      const response = await fetch(audioFile.filePath, { signal });
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      setAudioSource({ name: audioFile.name, audioBuffer });
    },
    [audioContext, setAudioSource],
  );

  const loadAllAudios = useCallback(
    async (files: AudioFile[], signal?: AbortSignal) => {
      try {
        await Promise.all(files.map(f => loadAudio(f, signal)));
        setAudioIsReady(true);
      } catch (e) {
        console.log("error", e);
        setAudioIsReady(false);
      }
    },
    [loadAudio, setAudioIsReady],
  );

  useEffect(() => {
    if (!audioContext) return;

    const abortController = new AbortController();
    const start = () => void loadAllAudios(audioFiles, abortController.signal);

    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });

    return () => {
      abortController.abort();
      window.removeEventListener("load", start);
    };
  }, [audioContext, audioFiles, loadAllAudios]);
}
