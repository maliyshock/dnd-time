import { useContext } from "react";
import { ConfirmContext } from "~/components/header/worlds/contexts/ConfirmContext.ts";

export function useConfirm() {
  const context = useContext(ConfirmContext);

  if (context === null) {
    throw new Error("useConfirm must be used within a useConfirmProvider");
  }

  return context;
}
