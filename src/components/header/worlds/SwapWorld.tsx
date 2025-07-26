import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/shadcn/dialog.tsx";
import { Button } from "~/components/ui/button";
import { Swap } from "~/components/ui/icons/Swap.tsx";
import { AddNewWorld } from "~/components/header/worlds/AddNewWorld.tsx";
import { WorldsList } from "~/components/header/worlds/WorldsList.tsx";
import useStore from "~/store/useStore.ts";
import "./swap-world.scss";
import { ConfirmProvider } from "~/components/header/worlds/contexts/ConfirmProvider.tsx";

export function SwapWorld() {
  const setPlay = useStore(store => store.setPlay);
  // TODO: add sounds later
  const handleSound = () => {};

  const handleSwap = () => {
    handleSound();
  };

  return (
    <Dialog
      onOpenChange={isVisible => {
        setPlay(!isVisible);
      }}
    >
      <DialogTrigger asChild>
        <Button aria-label="Swap world" color="white" isTransparent={true} variation="hollow" size="medium" onMouseDown={handleSwap}>
          <Swap />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl ">
        <section className="bg-background">
          <DialogHeader className="p-6 border-b-[1px] relative z-1 bg-background">
            <DialogTitle>
              <h2 className="mt-4 text-3xl leading-none font-semibold">Worlds</h2>
            </DialogTitle>
          </DialogHeader>
          <section className="py-4">
            <ConfirmProvider>
              <WorldsList />
            </ConfirmProvider>
          </section>
        </section>
        <DialogFooter className="swap-world__footer sm:justify-start sticky bottom-0 bg-white border-t border-t-[1px] bg-transparent h-24">
          <AddNewWorld />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
