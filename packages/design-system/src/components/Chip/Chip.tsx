import { cx } from "../internal/cx";

export type ChipVariant = "green" | "amber" | "purple" | "blue" | "red";
export type Phase = "gather" | "hold" | "strike";

export interface ChipProps {
  /** The color. */
  variant?: ChipVariant;
  /** Rectangle for lists and tables; pill for phases on level cards. */
  shape?: "rectangle" | "pill";
  /** The text, shown exactly as written. */
  value: string;
  className?: string;
}

/** The word for each phase, shared with SideNav, CardList, GlanceList and LevelCard. */
export const PHASE_LABEL: Record<Phase, string> = {
  gather: "Gather",
  hold: "Hold",
  strike: "Strike",
};

/** The chip variant for each phase. Always show the phase word with it. */
export const PHASE_VARIANT: Record<Phase, ChipVariant> = {
  gather: "blue",
  hold: "amber",
  strike: "red",
};

/** A small fact: a feature a level grants, a casting property of a spell, or the phase a pick serves. */
export function Chip({ variant = "green", shape = "rectangle", value, className }: ChipProps) {
  return <span className={cx("cp-chip", `cp-chip-${variant}`, `cp-chip-${shape}`, className)}>{value}</span>;
}
