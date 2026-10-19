import type { ReactNode } from "react";

interface DoDontProps {
  do: ReactNode;
  dont: ReactNode;
}

/** Two panels side by side for a usage rule. */
export function DoDont({ do: doContent, dont }: DoDontProps) {
  return (
    <div className="sb-unstyled cp-doc-dodont">
      <section className="cp-panel cp-doc-do">
        <h4 className="cp-label cp-doc-do-label">Do</h4>
        <div>{doContent}</div>
      </section>
      <section className="cp-panel cp-doc-dont">
        <h4 className="cp-label cp-doc-dont-label">Don't</h4>
        <div>{dont}</div>
      </section>
    </div>
  );
}
