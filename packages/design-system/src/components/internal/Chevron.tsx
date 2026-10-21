import { cx } from "./cx";

/** The right-pointing chevron used as a list marker. Decorative, so it's hidden from assistive tech. */
export function Chevron({ className }: { className?: string }) {
  return (
    <svg
      className={cx("cp-chev", className)}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M6 4l4 4-4 4" />
    </svg>
  );
}
