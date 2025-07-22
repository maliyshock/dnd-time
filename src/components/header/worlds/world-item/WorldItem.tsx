import { memo, useEffect, useState } from "react";
import useStore from "~/store/useStore.ts";
import { Marker } from "~/components/header/worlds/Marker.tsx";
import { getTotalSeconds } from "~/utils/time/getTotalSeconds.ts";
import { WorldForm } from "~/components/header/worlds/WorldForm.tsx";
import { WorldInfo } from "~/components/header/worlds/world-item/WorldInfo.tsx";
import { ConfirmActions } from "~/components/header/worlds/world-item/ConfirmActions.tsx";
import { ItemActions } from "~/components/header/worlds/world-item/ItemActions.tsx";
import { useConfirm } from "~/components/header/worlds/hooks/useConfirm.ts";

type WorldItemProps = {
  hours: number;
  minutes: number;
  name: string;
  id: string;
  order: number;
  isActive?: boolean;
  isLast?: boolean;
  showConfirm?: boolean;
};

export type ConfirmMode = null | "select" | "delete";

// TODO fix UI later
function WorldItem({ hours, minutes, name, id, order, isActive = false, isLast = false, showConfirm = false }: WorldItemProps) {
  const { setShowConfirmId } = useConfirm();
  const addWorld = useStore(store => store.addWorld);
  const selectWorld = useStore(store => store.selectWorld);
  const deleteWorld = useStore(store => store.deleteWorld);
  const setTime = useStore(store => store.setTime);
  const [confirmMode, setConfirmMode] = useState<ConfirmMode>(null);
  const [isEdit, setIsEdit] = useState(false);

  const handleItemClick = () => {
    if (!isActive && confirmMode === null && !isEdit) {
      setShowConfirmId(id);
      setConfirmMode("select");
    }
  };

  const handleDelete = () => {
    setShowConfirmId(id);
    setConfirmMode("delete");
  };

  const handleHideConfirm = () => {
    setConfirmMode(null);
    setShowConfirmId(null);
  };

  const handleConfirmAction = () => {
    if (confirmMode === "select") selectWorld(id);
    if (confirmMode === "delete") deleteWorld(id);
    handleHideConfirm();
  };

  useEffect(() => {
    if (showConfirm === false) {
      setConfirmMode(null);
      setIsEdit(false);
    }
  }, [showConfirm]);

  return (
    <li
      onClick={handleItemClick}
      title={isActive ? `This is your current world` : undefined}
      className={`min-h-14 gap-4 px-6 flex items-center worlds-list__item py-2 full-width ${isActive ? "active" : "cursor-pointer hover:bg-[var(--accent)]"} ${showConfirm || isEdit ? "bg-[var(--accent)]" : ""}`}
    >
      <Marker isActive={isActive} />
      {isEdit ? (
        <WorldForm
          className="px-0"
          initHours={hours}
          initMinutes={minutes}
          initName={name}
          onSubmit={({ hours, minutes, name }) => {
            const totalSeconds = getTotalSeconds({ hours, minutes, seconds: 0 });

            addWorld({ id, order, name, initialTime: { hours, minutes, seconds: 0, totalSeconds } });

            if (isActive) {
              setTime(totalSeconds);
            }

            setIsEdit(false);
          }}
          onCancel={() => setIsEdit(false)}
        />
      ) : (
        <>
          {confirmMode && !isLast && showConfirm && <ConfirmActions confirmMode={confirmMode} onConfirm={handleConfirmAction} onCancel={handleHideConfirm} />}

          <WorldInfo hours={hours} minutes={minutes} name={name} isActive={isActive} />

          {!confirmMode && <ItemActions isLast={isLast} onEdit={() => setIsEdit(true)} onDelete={handleDelete} />}
        </>
      )}
    </li>
  );
}

export const MemoizedWorldItem = memo(WorldItem);
