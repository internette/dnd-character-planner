import { useId, type ReactNode } from "react";
import { AltList, type AltItem } from "../AltList/AltList";
import { Chip, PHASE_LABEL, PHASE_VARIANT, type Phase } from "../Chip/Chip";
import { cx } from "../internal/cx";
import { LevelBadge } from "../LevelBadge/LevelBadge";
import { PickCard } from "../PickCard/PickCard";

export interface Pick {
  /** Default "Recommended". Use "Recommended · Secret N" when a level grants several picks. */
  label?: string;
  name: string;
  /** Source edition · spell level · class list. */
  meta?: string;
  description?: ReactNode;
}

export interface LevelCardProps {
  /** The anchor target for SideNav and GlanceList links, such as "lv9". */
  id?: string;
  level: number;
  /** An evocative name for the level. */
  title: string;
  /** One phase per level. */
  phase?: Phase;
  /** The level's class features, one chip each. */
  features?: string[];
  /** One pick, or two side by side on Magical Secrets levels. */
  picks?: Pick[];
  /** At most three. */
  alternatives?: AltItem[];
  className?: string;
}

/** The core unit of a roadmap: what a level grants, what to pick, and the alternatives. */
export function LevelCard({
  id,
  level,
  title,
  phase,
  features = [],
  picks = [],
  alternatives = [],
  className,
}: LevelCardProps) {
  const titleId = useId();
  const pickCards = picks.map(({ label, name, meta, description }) => (
    <PickCard key={name} label={label} name={name} meta={meta}>
      {description}
    </PickCard>
  ));

  return (
    <article id={id} className={cx("cp-levelcard", className)} aria-labelledby={titleId}>
      <LevelBadge level={level} />
      <div className="cp-card">
        <div className="cp-card-head">
          <div className="cp-card-titles">
            <h3 id={titleId} className="cp-card-title">
              {title}
            </h3>
            {features.length > 0 && (
              <div className="cp-row">
                {features.map((feature) => (
                  <Chip key={feature} value={feature} />
                ))}
              </div>
            )}
          </div>
          {phase && <Chip variant={PHASE_VARIANT[phase]} value={PHASE_LABEL[phase]} shape="pill" />}
        </div>
        {pickCards.length > 1 ? <div className="cp-picks">{pickCards}</div> : pickCards}
        {alternatives.length > 0 && <AltList items={alternatives} />}
      </div>
    </article>
  );
}
