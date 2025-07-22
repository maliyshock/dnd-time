import { createContext } from "react";

export type ConfirmContext = {
  showConfirmId: string | null;
  setShowConfirmId: (id: string | null) => void;
};

export const ConfirmContext = createContext<ConfirmContext | null>(null);
