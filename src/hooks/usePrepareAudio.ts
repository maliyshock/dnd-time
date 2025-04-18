import { useEffect } from "react";
import useStore from "~/store/useStore.ts";
import { AudioFile } from "~/types.ts";

export function usePrepareAudio(audioFiles: AudioFile[]) {
  const setAudioIsReady = useStore(store => store.setAudioIsReady);
  const audioContext = useStore(store => store.audioContext);
  const setAudioSource = useStore(store => store.setAudioSource);

  useEffect(() => {
    const loadAudio = async (audioFile: AudioFile) => {
      try {
        const response = await fetch(audioFile.filePath);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

        setAudioSource({ name: audioFile.name, audioBuffer });
      } catch (e) {
        console.log("error", e);
      }
    };

    const loadAllAudios = async () => {
      try {
        const loadPromises = audioFiles.map(file => loadAudio(file));

        await Promise.all(loadPromises);
        setAudioIsReady(true);
      } catch (e) {
        console.log("error", e);
        setAudioIsReady(false);
      }
    };

    loadAllAudios();
  }, [audioContext, audioFiles, setAudioIsReady, setAudioSource]);
}
