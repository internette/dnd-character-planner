/** The same markup in the light and dark themes, side by side, for the Introduction page. */
export function ThemePair() {
  return (
    <div className="sb-unstyled cp-doc-themes">
      {(["light", "dark"] as const).map((theme) => (
        <div key={theme} data-theme={theme} className="cp-doc-theme">
          <span className="cp-label cp-doc-theme-label">{theme === "light" ? "Light" : "Dark"}</span>
          <div className="cp-panel">
            <h4 className="cp-panel-title">Synaptic Static</h4>
            <p className="cp-doc-theme-body">A 20 ft psychic burst that keeps dragging down enemies' attacks and checks afterward.</p>
            <span className="cp-meta">XGtE · 5th · Bard</span>
          </div>
        </div>
      ))}
    </div>
  );
}
