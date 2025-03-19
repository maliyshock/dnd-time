import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import "./button.scss";

type ButtonColors = "white" | "transparent";

type ColorsModifiers = {
  [key in ButtonColors]: string;
};

type ButtonSizes = "small" | "large";

type SizesModifiers = {
  [key in ButtonSizes]: string;
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  color?: ButtonColors;
  size?: ButtonSizes;
  active?: boolean;
};

const colorsModifiers: ColorsModifiers = {
  transparent: "button--color-transparent",
  white: "button--color-white",
};

const sizesModifiers: SizesModifiers = {
  small: "buttons--size-small",
  large: "buttons--size-large",
};

export function Button({ children, color, active, size, className, ...props }: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className={`button ${active ? "active" : ""} ${color ? colorsModifiers[color] : ""} ${size ? sizesModifiers[size] : ""} ${className || ""}`}
      {...props}
    >
      {children}
    </button>
  );
}
