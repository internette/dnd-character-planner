import { cx } from "../internal/cx";

export interface LevelBadgeProps {
  /** The character level, 1 to 20. */
  level: number;
  className?: string;
}

/** The level disc that anchors each LevelCard. */
export function LevelBadge({ level, className }: LevelBadgeProps) {
  return (
    <div className={cx("cp-level", className)} role="img" aria-label={`Level ${level}`}>
      <span className="cp-level-label" aria-hidden="true">
        LEVEL
      </span>
      <span className="cp-level-num" aria-hidden="true">
        {level}
      </span>
    </div>
  );
}
