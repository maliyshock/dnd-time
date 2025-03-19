import { PropsWithChildren } from "react";

export function Button({ children, ...props }: PropsWithChildren) {
  return <button {...props}>{children}</button>;
}
