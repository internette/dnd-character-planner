import type { ReactNode } from "react";
import { cx } from "../internal/cx";

export interface ChipProps {
  /** Default "neutral". Use "dm" whenever the group must approve something. */
  tone?: "neutral" | "instant" | "concentration" | "dm";
  /** Write in sentence case; the uppercase tones come from CSS. */
  children?: ReactNode;
  className?: string;
}

/** A small fact: a feature a level grants, or a casting property of a spell. */
export function Chip({ tone = "neutral", children, className }: ChipProps) {
  return <span className={cx("cp-chip", `cp-chip-${tone}`, className)}>{children}</span>;
}
