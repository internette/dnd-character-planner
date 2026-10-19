import { CONTRAST_PAIRS, contrastRatio, parseTokenBlocks } from "../../styles/tokens/test-utils";

/** Every contrast pair from the color spec with its ratio in both themes, read from color.css. */
export function ContrastTable({ css }: { css: string }) {
  const [light, dark] = parseTokenBlocks(css).map((block) => new Map(block.tokens.map((t) => [t.name, t.value])));
  const ratio = (values: Map<string, string>, text: string, on: string) =>
    `${contrastRatio(values.get(`--color-${text}`)!, values.get(`--color-${on}`)!).toFixed(1)}:1`;

  return (
    <div className="sb-unstyled cp-doc-tokens">
      <table className="cp-doc-table">
        <thead>
          <tr>
            <th scope="col">Text</th>
            <th scope="col">Background</th>
            <th scope="col">Light</th>
            <th scope="col">Dark</th>
          </tr>
        </thead>
        <tbody>
          {CONTRAST_PAIRS.map(([text, on]) => (
            <tr key={`${text}-${on}`}>
              <td>
                <code className="cp-doc-name">{text}</code>
              </td>
              <td>
                <code className="cp-doc-name">{on}</code>
              </td>
              <td>{ratio(light, text, on)}</td>
              <td>{ratio(dark, text, on)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
