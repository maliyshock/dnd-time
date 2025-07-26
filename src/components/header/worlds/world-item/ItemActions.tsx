import { SHDButton } from "~/components/ui/shadcn/shd-button.tsx";
import { Pencil, Trash2 } from "lucide-react";

type ItemActionsProps = {
  isLast: boolean;
  onEdit: () => void;
  onDelete: () => void;
};

export function ItemActions({ isLast, onEdit, onDelete }: ItemActionsProps) {
  return (
    <div className="worlds-list__item-actions flex shrink-0 gap-2 ml-auto items-center">
      <SHDButton
        variant="outline"
        onClick={e => {
          e.stopPropagation();
          onEdit();
        }}
      >
        <Pencil />
      </SHDButton>
      {!isLast && (
        <SHDButton
          variant="outline"
          onClick={e => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <Trash2 />
        </SHDButton>
      )}
    </div>
  );
}
