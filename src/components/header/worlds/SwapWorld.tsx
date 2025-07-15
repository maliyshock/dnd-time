import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog.tsx";
import { Button } from "~/components/ui/button";
import { Swap } from "~/components/ui/icons/Swap.tsx";
import { AddNewWorld } from "~/components/header/worlds/AddNewWorld.tsx";
import { WorldsList } from "~/components/header/worlds/WorldsList.tsx";
import useStore from "~/store/useStore.ts";

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
        <DialogHeader className="pt-6 px-6 pb-0">
          <DialogTitle>
            <h2 className="mt-4 text-3xl leading-none font-semibold">Your worlds:</h2>
          </DialogTitle>
        </DialogHeader>
        <section className="p-6">
          <WorldsList />
        </section>
        <DialogFooter className="p-6 sm:justify-start sticky bottom-0 bg-white border-t border-t-[1px]">
          <AddNewWorld />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
