import { SHDButton } from "~/components/ui/shd-button.tsx";
import { Check, XIcon } from "lucide-react";
import { Separator } from "~/components/ui/separator.tsx";
import { ConfirmMode } from "~/components/header/worlds/world-item/WorldItem.tsx";

type ConfirmActionsProps = {
  confirmMode: ConfirmMode;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmActions({ confirmMode, onConfirm, onCancel }: ConfirmActionsProps) {
  const title = (confirmMode: ConfirmMode) => {
    if (confirmMode === "select") return "Select?";
    if (confirmMode === "delete") return "Delete?";
  };

  return (
    <>
      <div className="flex gap-2 shrink-0 items-center">
        <span>{title(confirmMode)}</span>
        <SHDButton
          variant="outline"
          onClick={e => {
            e.stopPropagation();
            onConfirm();
          }}
        >
          <Check />
        </SHDButton>
        <SHDButton
          variant="outline"
          onClick={e => {
            e.stopPropagation();
            onCancel();
          }}
        >
          <XIcon />
        </SHDButton>
      </div>
      <Separator orientation="vertical" className="min-h-8" />
    </>
  );
}
