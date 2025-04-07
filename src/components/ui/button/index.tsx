import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import "./button.scss";

type ButtonColors = "white";

type ColorsModifiers = {
  [key in ButtonColors]: string;
};

type ButtonSizes = "small" | "medium" | "large";

type SizesModifiers = {
  [key in ButtonSizes]: string;
};

type Variations = "hollow";

type VariationModifiers = {
  [key in Variations]: string;
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  color?: ButtonColors;
  size?: ButtonSizes;
  active?: boolean;
  variation?: Variations;
  isTransparent?: boolean;
};

const colorsModifiers: ColorsModifiers = {
  white: "button--color-white",
};

const sizesModifiers: SizesModifiers = {
  small: "button--size-small",
  medium: "button--size-medium",
  large: "button--size-large",
};

const variationModifiers: VariationModifiers = {
  hollow: "button--variation-hollow",
};

export function Button({ children, color, active, size, isTransparent, variation, className, ...props }: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className={`button ${isTransparent ? "button--transparent" : ""} ${variation ? variationModifiers[variation] : ""} ${active ? "active" : ""} ${color ? colorsModifiers[color] : ""} ${size ? sizesModifiers[size] : ""} ${className || ""}`}
      {...props}
    >
      {children}
    </button>
  );
}
