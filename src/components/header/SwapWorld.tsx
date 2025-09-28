import { Button } from "~/components/ui/button";
import { Swap } from "~/components/ui/icons/Swap.tsx";
import { AddNewWorld } from "~/components/header/worlds/AddNewWorld.tsx";
import { WorldsList } from "~/components/header/worlds/WorldsList.tsx";
import useStore from "~/store/useStore.ts";
import "./swap-world.scss";
import { ConfirmProvider } from "~/components/header/worlds/contexts/ConfirmProvider.tsx";
import { Dialog } from "~/components/ui/dialog";
import { useCallback, useRef } from "react";

export function SwapWorld() {
  const prevPlay = useRef<boolean | null>(null);
  const play = useStore(store => store.play);
  const setPlay = useStore(store => store.setPlay);
  // TODO: add sounds later
  const handleSound = () => {};

  const handleShowSwap = () => {
    handleSound();
  };

  // TODO: write tests for this thing
  const handleOnOpenChange = useCallback(
    (isVisible: boolean) => {
      if (isVisible) {
        prevPlay.current = play;
        setPlay(false);
      } else {
        if (prevPlay.current) {
          setPlay(true);
        }
      }
    },
    [play, setPlay],
  );

  return (
    <Dialog
      title="Worlds"
      onOpenChange={handleOnOpenChange}
      triggerElement={
        <Button aria-label="Swap world" color="white" isTransparent={true} variation="hollow" size="medium" onMouseDown={handleShowSwap}>
          <Swap />
        </Button>
      }
      footer={
        <section className="swap-world__footer border-t bg-transparent min-h-24 md:h-24 w-full">
          <AddNewWorld />
        </section>
      }
    >
      <section className="bg-background">
        <section className="py-4">
          <ConfirmProvider>
            <WorldsList />
          </ConfirmProvider>
        </section>
      </section>
    </Dialog>
  );
}
