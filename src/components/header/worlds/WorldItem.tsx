import { formatTime } from "~/utils/time/formatTime.ts";
import { memo, useState } from "react";
import { Check, XIcon, Trash2, Pencil } from "lucide-react";
import { SHDButton } from "~/components/ui/shd-button.tsx";
import useStore from "~/store/useStore.ts";

type WorldItemProps = {
  hours: number;
  minutes: number;
  name: string;
  isActive?: boolean;
  isLast?: boolean;
};

// TODO fix UI later
function WorldItem({ hours, minutes, name, isActive = false, isLast = false }: WorldItemProps) {
  const selectWorld = useStore(store => store.selectWorld);
  const deleteWorld = useStore(store => store.deleteWorld);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [confirmMode, setConfirmMode] = useState<null | "select" | "delete">(null);

  const handleConfirm = () => {
    if (confirmMode === "select") selectWorld(name);
    if (confirmMode === "delete") deleteWorld(name);
    setConfirmMode(null);
    setShowConfirm(false);
  };

  const title = () => {
    if (confirmMode === "select") return "Select?";
    if (confirmMode === "delete") return "Delete?";
  };

  return (
    <li
      onClick={() => {
        if (!isActive) {
          setShowConfirm(true);
          if (confirmMode === null) setConfirmMode("select");
        }
      }}
      className="flex group gap-4 cursor-pointer world-item items-center hover:bg-[var(--accent)]"
    >
      {showConfirm && !isActive && (
        <div className="flex gap-2 shrink-0 items-center ">
          <span>{title()}</span>
          <SHDButton variant="secondary" className="" onClick={handleConfirm}>
            <Check />
          </SHDButton>
          <SHDButton
            variant="secondary"
            className=""
            onClick={e => {
              e.stopPropagation();
              setShowConfirm(false);
              setConfirmMode(null);
            }}
          >
            <XIcon />
          </SHDButton>
        </div>
      )}

      <div className="flex gap-2 items-center">
        <time className="text-muted-foreground">{`${formatTime(hours)}:${formatTime(minutes)}`}</time>
        <span>{name}</span>
      </div>

      <div className="flex shrink-0 gap-2 ml-auto items-center invisible group-hover:visible">
        <SHDButton variant="secondary" className="" onClick={() => {}}>
          <Pencil />
        </SHDButton>
        {!isLast && (
          <SHDButton
            variant="secondary"
            onClick={e => {
              e.stopPropagation();
              setShowConfirm(true);
              if (confirmMode === null) setConfirmMode("delete");
            }}
          >
            <Trash2 />
          </SHDButton>
        )}
      </div>
    </li>
  );
}

export const MemoizedWorldItem = memo(WorldItem);
