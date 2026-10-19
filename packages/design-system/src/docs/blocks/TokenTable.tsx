import { parseTokenBlocks, type Token } from "../../styles/tokens/test-utils";

type Variant = "plain" | "color" | "type" | "space" | "radius" | "stroke";

interface TokenTableProps {
  /** A token file's raw text, imported with Vite's `?raw` suffix. */
  css: string;
  variant?: Variant;
  /** Only list variables whose name starts with this, e.g. "--radius-". */
  prefix?: string;
  /** Specimen text for the type variant, keyed by variable name. */
  samples?: Record<string, string>;
}

function groupBy(tokens: Token[]): Array<[string, Token[]]> {
  const groups = new Map<string, Token[]>();
  for (const token of tokens) {
    const key = token.group ?? "";
    groups.set(key, [...(groups.get(key) ?? []), token]);
  }
  return [...groups];
}

function Preview({ token, variant }: { token: Token; variant: Variant }) {
  const value = `var(${token.name})`;
  switch (variant) {
    case "space":
      return <span className="cp-doc-bar" style={{ width: value }} />;
    case "radius":
      return <span className="cp-doc-radius" style={{ borderRadius: value }} />;
    case "stroke":
      return <span className="cp-doc-stroke" style={{ borderTopWidth: value }} />;
    default:
      return null;
  }
}

/** Lists every variable in a token file with its value, usage comment and a visual preview. */
export function TokenTable({ css, variant = "plain", prefix, samples }: TokenTableProps) {
  const blocks = parseTokenBlocks(css);
  const tokens = blocks[0].tokens.filter((t) => !prefix || t.name.startsWith(prefix));

  if (variant === "type") {
    // Resolves a text style's var() references to plain numbers, e.g. "600 · 64/72".
    const values = new Map(blocks[0].tokens.map((t) => [t.name, t.value]));
    const resolve = (style: string) =>
      style.replace(/var\((--[\w-]+)\)/g, (_, name: string) => (name === "--font-display" ? "Lora" : name === "--font-body" ? "Public Sans" : values.get(name) ?? name)).replace(/px/g, "");
    return (
      <div className="sb-unstyled cp-doc-tokens">
        {tokens.map((token) => (
          <div key={token.name} className="cp-doc-type">
            <p className={token.name === "--type-label" ? "cp-doc-specimen cp-label" : "cp-doc-specimen"} style={{ font: `var(${token.name})` }}>
              {samples?.[token.name] ?? "The quick brown fox"}
            </p>
            <span className="cp-meta">
              <code className="cp-doc-name">{token.name}</code> · {resolve(token.value)}
            </span>
            {token.comment && <p className="cp-doc-comment">{token.comment}</p>}
          </div>
        ))}
      </div>
    );
  }

  if (variant === "color") {
    const light = new Map(blocks[0].tokens.map((t) => [t.name, t.value]));
    const dark = new Map(blocks.find((b) => b.selector.includes("dark"))?.tokens.map((t) => [t.name, t.value]));
    return (
      <div className="sb-unstyled cp-doc-tokens">
        {groupBy(tokens).map(([group, items]) => (
          <section key={group} className="cp-doc-group">
            {group && <h3 className="cp-doc-group-title">{group}</h3>}
            {items.map((token) => (
              <div key={token.name} className="cp-doc-color">
                <div className="cp-doc-swatches">
                  <span className="cp-doc-swatch" style={{ background: light.get(token.name) }} />
                  <span className="cp-doc-swatch" style={{ background: dark.get(token.name) }} />
                </div>
                <div className="cp-doc-token-text">
                  <code className="cp-doc-name">{token.name}</code>
                  <span className="cp-meta">
                    Light {light.get(token.name)} · Dark {dark.get(token.name)}
                  </span>
                  {token.comment && <p className="cp-doc-comment">{token.comment}</p>}
                </div>
              </div>
            ))}
          </section>
        ))}
      </div>
    );
  }

  return (
    <div className="sb-unstyled cp-doc-tokens">
      {groupBy(tokens).map(([group, items]) => (
        <section key={group} className="cp-doc-group">
          {group && <h3 className="cp-doc-group-title">{group}</h3>}
          <table className="cp-doc-table">
            <thead>
              <tr>
                <th scope="col">Token</th>
                <th scope="col">Value</th>
                <th scope="col">Usage</th>
                {variant !== "plain" && <th scope="col">Preview</th>}
              </tr>
            </thead>
            <tbody>
              {items.map((token) => (
                <tr key={token.name}>
                  <td>
                    <code className="cp-doc-name">{token.name}</code>
                  </td>
                  <td>
                    <code className="cp-doc-value">{token.value}</code>
                  </td>
                  <td>{token.comment}</td>
                  {variant !== "plain" && (
                    <td>
                      <Preview token={token} variant={variant} />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ))}
    </div>
  );
}
