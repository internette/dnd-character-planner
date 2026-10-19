import type { ReactNode } from "react";
import "./blocks.css";

/** Wraps an MDX page in the Character Planner ground, body font and page width. */
export function DocPage({ children }: { children: ReactNode }) {
  return <div className="cp-doc">{children}</div>;
}
