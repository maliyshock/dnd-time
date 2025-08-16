import { SHDButton } from "~/components/ui/shadcn/shd-button.tsx";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Separator } from "~/components/ui/shadcn/separator.tsx";

type ItemActionsProps = {
  isLast: boolean;
  onEdit: () => void;
  onDelete: () => void;
};

export function ItemActions({ isLast, onEdit, onDelete }: ItemActionsProps) {
  return (
    <div className="worlds-list__item-actions overflow-hidden flex shrink-0 gap-2 ml-auto items-center">
      <div className="hidden md:flex items-center gap-2">
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

      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SHDButton
              onClick={e => {
                e.stopPropagation();
              }}
              variant="outline"
              size="icon"
              aria-label="Open actions menu"
              className=""
            >
              <MoreVertical className="h-5 w-5" aria-hidden="true" />
            </SHDButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="flex items-center gap-2 z-10 rounded-md bg-[var(--popover)]" sideOffset={8} align="center" side="left">
            <SHDButton
              variant="ghost"
              onClick={e => {
                e.stopPropagation();
                onEdit();
              }}
            >
              <Pencil />
            </SHDButton>
            {!isLast && (
              <>
                <Separator color="white" orientation="vertical" className="min-h-8" />
                <SHDButton
                  variant="ghost"
                  onClick={e => {
                    e.stopPropagation();
                    onDelete();
                  }}
                >
                  <Trash2 />
                </SHDButton>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
