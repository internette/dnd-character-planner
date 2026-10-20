import { cx } from "../internal/cx";

export type Phase = "gather" | "hold" | "strike";

export interface ChipProps {
  /** Default "neutral". Use "dm" whenever the group must approve something; gather, hold and strike are the phase variants. */
  variant?: "neutral" | "instant" | "concentration" | "dm" | Phase;
  /** Default "sm" (square). Use "md" (pill) for phases on level cards. */
  size?: "sm" | "md";
  /** The chip's text, in sentence case; uppercase comes from CSS. Phase variants default to the phase word, and a custom value must still contain it. */
  value?: string;
  className?: string;
}

/** The default word for each phase, shared with SideNav, StepCards, GlanceList and LevelCard. */
export const PHASE_LABEL: Record<Phase, string> = {
  gather: "Gather",
  hold: "Hold",
  strike: "Strike",
};

function isPhase(variant: NonNullable<ChipProps["variant"]>): variant is Phase {
  return variant in PHASE_LABEL;
}

/** A small fact: a feature a level grants, a casting property of a spell, or the phase a pick serves. */
export function Chip({ variant = "neutral", size = "sm", value, className }: ChipProps) {
  return (
    <span className={cx("cp-chip", `cp-chip-${variant}`, `cp-chip-${size}`, className)}>
      {value ?? (isPhase(variant) ? PHASE_LABEL[variant] : null)}
    </span>
  );
}
