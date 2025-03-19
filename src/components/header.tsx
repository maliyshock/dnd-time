import { Button } from "~/components/ui/button";
import { Sound } from "~/components/ui/icons/sound.tsx";
import useStore from "~/store/useStore.ts";
import { useSoundControl } from "~/hooks/useSoundControl.ts";

export function Header({ className }: { className?: string }) {
  const setSoundToggle = useStore(store => store.setSoundToggle);
  const soundOn = useStore(store => store.soundOn);
  const { audioContextRef, isReady } = useSoundControl();

  // TODO: would jump on mobiles if static
  if (!isReady) return;

  return (
    <header className={className}>
      <Button active={soundOn} color="transparent" onClick={setSoundToggle}>
        <Sound />
      </Button>
    </header>
  );
}
