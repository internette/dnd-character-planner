import type { ReactNode } from "react";
import { cx } from "../internal/cx";

export interface PickCardProps {
  /** Shown exactly as written. Use "Recommended · Secret N" when a level grants several picks. */
  label?: string;
  /** The spell or feat name, as printed in its source book. */
  name: string;
  /** Source edition · spell level · class list, for example "PHB 2014 · 3rd · Bard · Concentration". For a feat, "PHB 2014 · Feat". */
  meta?: string;
  /** The description: what the pick does at the table, then why it fits. */
  children?: ReactNode;
  className?: string;
}

/** A recommended spell or feat inside a LevelCard. */
export function PickCard({ label = "Recommended", name, meta, children, className }: PickCardProps) {
  return (
    <div className={cx("cp-pick", className)}>
      <span className="cp-pick-label">{label}</span>
      <div className="cp-pick-head">
        <h4 className="cp-pick-name">{name}</h4>
        {meta && <span className="cp-meta">{meta}</span>}
      </div>
      {children && <p className="cp-pick-body">{children}</p>}
    </div>
  );
}
