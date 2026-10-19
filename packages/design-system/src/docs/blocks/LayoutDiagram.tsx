/** A labelled diagram of the page container: gutter, SideNav range and main column. */
export function LayoutDiagram() {
  return (
    <figure className="sb-unstyled cp-doc-layout">
      <div className="cp-doc-layout-page" aria-hidden="true">
        <div className="cp-doc-layout-nav">
          <span className="cp-label">SideNav</span>
          <span className="cp-meta">layout-sidenav-min to layout-sidenav-max</span>
        </div>
        <div className="cp-doc-layout-main">
          <span className="cp-label">Main column</span>
          <span className="cp-meta">Fluid</span>
        </div>
      </div>
      <figcaption className="cp-meta">
        The page container is at most <code>layout-max-width</code> wide with <code>space-8</code> on each side. The SideNav sits
        beside a fluid main column and wraps above it on phones, below 480px.
      </figcaption>
    </figure>
  );
}
