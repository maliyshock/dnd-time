import { useState } from "react";
import { ConfirmContext } from "./ConfirmContext";

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [showConfirmId, setShowConfirmId] = useState<string | null>(null);

  return <ConfirmContext.Provider value={{ showConfirmId, setShowConfirmId }}>{children}</ConfirmContext.Provider>;
}
