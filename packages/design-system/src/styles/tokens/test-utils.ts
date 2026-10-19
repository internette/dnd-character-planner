// Reads the hand-written token CSS files. Used by the token tests, the Storybook theme test
// and the docs TokenTable block, so it must stay free of Node-only imports.

export interface Token {
  /** Variable name including the leading dashes, e.g. "--color-ink". */
  name: string;
  value: string;
  /** The usage comment directly above the variable, if any. */
  comment?: string;
  /** The most recent group heading comment in the block, e.g. "Ground and surfaces". */
  group?: string;
}

export interface TokenBlock {
  /** The block's selector list, e.g. ':root, [data-theme="light"]'. */
  selector: string;
  tokens: Token[];
}

const COMMENT = /^\/\*\s*(.*?)\s*\*\/$/;
const DECLARATION = /^(--[\w-]+)\s*:\s*(.+?);$/;

/**
 * Splits a token file into its rule blocks and lists each block's variables.
 *
 * A one-line comment directly above a variable is that variable's usage comment when it ends
 * with a period; any other comment inside a block (such as "Weights") is a group heading.
 */
export function parseTokenBlocks(css: string): TokenBlock[] {
  const blocks: TokenBlock[] = [];
  let current: TokenBlock | undefined;
  let selector: string[] = [];
  let pendingComment: string | undefined;
  let group: string | undefined;

  for (const raw of css.split("\n")) {
    const line = raw.trim();

    if (!current) {
      if (line.startsWith("@") || COMMENT.test(line) || line === "") continue;
      if (line.endsWith("{")) {
        selector.push(line.slice(0, -1).trim());
        current = { selector: selector.join(" ").replace(/,\s*/g, ", "), tokens: [] };
        selector = [];
        pendingComment = undefined;
        group = undefined;
      } else {
        selector.push(line);
      }
      continue;
    }

    if (line === "}") {
      blocks.push(current);
      current = undefined;
      continue;
    }

    const comment = COMMENT.exec(line);
    if (comment) {
      if (comment[1].endsWith(".")) {
        pendingComment = comment[1];
      } else {
        group = comment[1];
        pendingComment = undefined;
      }
      continue;
    }

    const declaration = DECLARATION.exec(line);
    if (declaration) {
      current.tokens.push({ name: declaration[1], value: declaration[2], comment: pendingComment, group });
    }
    pendingComment = undefined;
  }

  return blocks;
}

/** Every variable in a token file's first block, which holds the light (default) values. */
export function parseTokens(css: string): Token[] {
  return parseTokenBlocks(css)[0]?.tokens ?? [];
}

/** Maps variable names to values for the block whose selector includes `selector`. */
export function tokenValues(css: string, selector: string): Map<string, string> {
  const block = parseTokenBlocks(css).find((b) => b.selector.includes(selector));
  return new Map(block?.tokens.map((t) => [t.name, t.value]));
}

function channel(value: number): number {
  const c = value / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

/** WCAG 2.x relative luminance of a 6-digit hex color. */
export function relativeLuminance(hex: string): number {
  const match = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex);
  if (!match) throw new Error(`Not a 6-digit hex color: ${hex}`);
  const [r, g, b] = match.slice(1).map((h) => channel(parseInt(h, 16)));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG 2.x contrast ratio between two 6-digit hex colors, from 1 to 21. */
export function contrastRatio(a: string, b: string): number {
  const [hi, lo] = [relativeLuminance(a), relativeLuminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/** Text/background pairs from the color spec that must pass 4.5:1 in both themes. */
export const CONTRAST_PAIRS: ReadonlyArray<readonly [text: string, on: string]> = [
  ...["ink", "ink-body", "ink-muted"].flatMap((text) =>
    ["ground", "surface", "surface-sunken"].map((on) => [text, on] as const),
  ),
  ["on-forest", "forest"],
  ["on-forest-muted", "forest"],
  ["accent-ink", "surface"],
  ["accent-ink", "surface-sunken"],
  ["gold", "gold-tint"],
  ["gather", "gather-tint"],
  ["hold", "hold-tint"],
  ["strike", "strike-tint"],
  ["arcane", "arcane-tint"],
];

/** Converts a px length such as "16px" to a number, or undefined if it isn't one. */
export function px(value: string): number | undefined {
  const match = /^(-?\d+(?:\.\d+)?)px$/.exec(value.trim());
  return match ? Number(match[1]) : undefined;
}
