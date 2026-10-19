import type { ButtonHTMLAttributes } from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

// Placeholder component so Storybook has something to render. Replace once
// the design system tokens and components are ported.
export function Button({ type = "button", ...props }: ButtonProps) {
  return <button type={type} {...props} />;
}
