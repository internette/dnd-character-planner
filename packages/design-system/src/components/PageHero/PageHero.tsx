import { cx } from "../internal/cx";

export interface PageHeroProps {
  id?: string;
  /** Default "xl". Use "lg" for supplements and docs pages. */
  size?: "xl" | "lg";
  eyebrow?: string;
  title: string;
  subtitle?: string;
  tags?: string[];
  /** Wind swirl decoration for Aero-themed characters. Default true. */
  swirl?: boolean;
  className?: string;
}

function Swirl() {
  const line = { fill: "none", stroke: "currentColor", strokeWidth: 4, strokeLinecap: "round" } as const;
  return (
    <svg className="cp-hero-swirl" width="480" height="200" viewBox="0 0 480 200" aria-hidden="true" focusable="false">
      <path d="M0 92c120 0 200-4 280-12s120-40 92-64-60 4-40 28 72 8 108-20" {...line} />
      <path d="M60 140c140-8 240-4 320-24 48-12 72-40 48-56s-48 8-28 28 48 12 76-4" {...line} />
      <path d="M120 184c120-4 220-4 320-12" {...line} />
    </svg>
  );
}

/** The forest band that opens a character page, a supplement or a docs page. */
export function PageHero({ id, size = "xl", eyebrow, title, subtitle, tags, swirl = true, className }: PageHeroProps) {
  const Title = size === "xl" ? "h1" : "h2";
  return (
    <section id={id} className={cx("cp-hero", className)}>
      {swirl && <Swirl />}
      {eyebrow && <span className="cp-hero-eyebrow">{eyebrow}</span>}
      <Title className={cx("cp-hero-title", `cp-hero-${size}`)}>{title}</Title>
      {subtitle && <p className="cp-hero-sub">{subtitle}</p>}
      {tags && tags.length > 0 && (
        <ul className="cp-hero-tags">
          {tags.map((tag) => (
            <li key={tag} className="cp-hero-tag">
              {tag}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
