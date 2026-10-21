import { cx } from "../internal/cx";
import { Chevron } from "../internal/Chevron";

export interface AltItem {
  /** The alternative's name, shown bold. */
  name: string;
  /** The short reason: what makes it a different choice. */
  text: string;
  /** Sits between the name and the text. Default ": ". Use ", " or " " when the text reads on from the name. */
  joiner?: string;
}

export interface AltListProps {
  /** At most three alternatives. */
  items: AltItem[];
  className?: string;
}

/** Alternatives under a pick, each behind an accent chevron. */
export function AltList({ items, className }: AltListProps) {
  return (
    <ul className={cx("cp-alts", className)}>
      {items.map(({ name, text, joiner = ": " }) => (
        <li key={name}>
          <Chevron />
          <span>
            <strong>{name}</strong>
            {joiner}
            {text}
          </span>
        </li>
      ))}
    </ul>
  );
}
