import { Button } from "~/components/ui/button";
import { Swap } from "~/components/ui/icons/Swap.tsx";
import { AddNewWorld } from "~/components/header/worlds/AddNewWorld.tsx";
import { WorldsList } from "~/components/header/worlds/WorldsList.tsx";
import useStore from "~/store/useStore.ts";
import "./swap-world.scss";
import { ConfirmProvider } from "~/components/header/worlds/contexts/ConfirmProvider.tsx";
import { Dialog } from "~/components/ui/dialog";

export function SwapWorld() {
  const setPlay = useStore(store => store.setPlay);
  // TODO: add sounds later
  const handleSound = () => {};

  const handleSwap = () => {
    handleSound();
  };

  return (
    <Dialog
      title="Worlds"
      onOpenChange={isVisible => {
        setPlay(!isVisible);
      }}
      triggerElement={
        <Button aria-label="Swap world" color="white" isTransparent={true} variation="hollow" size="medium" onMouseDown={handleSwap}>
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
