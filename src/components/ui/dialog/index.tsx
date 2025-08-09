import * as DialogPrimitive from "@radix-ui/react-dialog";
import { DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, SHDDialog } from "~/components/ui/shadcn/shd-dialog.tsx";
import { PropsWithChildren, ReactNode } from "react";
import { XIcon } from "lucide-react";

type DialogProps = {
  triggerElement: ReactNode;
  footer: ReactNode;
  title: ReactNode;
  onOpenChange?: (isOpen: boolean) => void;
};

export function Dialog({ triggerElement, footer, title, children, onOpenChange }: PropsWithChildren<DialogProps>) {
  return (
    <SHDDialog onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{triggerElement}</DialogTrigger>
      <DialogContent className="sm:max-w-xl ">
        <DialogHeader className="p-6 sticky top-0 bg-white border-b-1">
          <DialogTitle>
            <div className="mt-4 text-3xl leading-none font-semibold">{title}</div>
          </DialogTitle>
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="z-10 ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-8 right-8 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-8"
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogHeader>
        <section className="dialog__content bg-white">{children}</section>
        <DialogFooter className="sticky bottom-0">{footer}</DialogFooter>
      </DialogContent>
    </SHDDialog>
  );
}
