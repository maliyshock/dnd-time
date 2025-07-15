import { WorldStorage } from "~/types.ts";

export function getWorlds(): WorldStorage | undefined {
  const raw = localStorage.getItem("worldStorage");

  if (raw) {
    return JSON.parse(raw);
  }
}
