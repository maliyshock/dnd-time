import { Type } from "~/types.ts";

export function getAnimationKey(isComposite: boolean, type: Type) {
  if (type === "dot") {
    return "dot";
  }

  if (isComposite && type === "star") {
    return "main";
  }

  return "main";
}
