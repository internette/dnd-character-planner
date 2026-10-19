import type { ReactNode } from "react";
import { cx } from "../internal/cx";

export type Phase = "gather" | "hold" | "strike";

export interface PhaseTagProps {
  phase: Phase;
  /** Default "md" (pill). Use "sm" (square) in lists and tables. */
  size?: "md" | "sm";
  /** Overrides the default word. It must still contain the phase word. */
  children?: ReactNode;
  className?: string;
}

/** The default word for each phase, shared with SideNav and StepCards. */
export const PHASE_LABEL: Record<Phase, string> = {
  gather: "Gather",
  hold: "Hold",
  strike: "Strike",
};

/** Marks which step of the crowd-control loop a pick serves. Always shows the word. */
export function PhaseTag({ phase, size = "md", children, className }: PhaseTagProps) {
  return (
    <span className={cx("cp-phase", `cp-phase-${phase}`, `cp-phase-${size}`, className)}>
      {children ?? PHASE_LABEL[phase]}
    </span>
  );
}
