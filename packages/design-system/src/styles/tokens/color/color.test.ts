import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { CONTRAST_PAIRS, contrastRatio, parseTokenBlocks } from "../test-utils";

const css = readFileSync(new URL("./color.css", import.meta.url), "utf8");
const [light, dark] = parseTokenBlocks(css);
const themes = { light, dark };

describe("color tokens", () => {
  it("has a light block and a dark block", () => {
    expect(light.selector).toBe(':root, [data-theme="light"]');
    expect(dark.selector).toBe('[data-theme="dark"]');
  });

  it("declares the same names in both themes", () => {
    const names = (block: typeof light) => block.tokens.map((t) => t.name).sort();
    expect(names(dark)).toEqual(names(light));
  });

  it("uses only --color-* names and 6-digit hex values", () => {
    for (const token of [...light.tokens, ...dark.tokens]) {
      expect(token.name).toMatch(/^--color-[a-z-]+$/);
      expect(token.value, token.name).toMatch(/^#[0-9a-f]{6}$/);
    }
  });

  it("documents every light variable with a usage comment", () => {
    for (const token of light.tokens) expect(token.comment, token.name).toBeTruthy();
  });

  for (const [theme, block] of Object.entries(themes)) {
    const value = (role: string) => block.tokens.find((t) => t.name === `--color-${role}`)!.value;
    it.each(CONTRAST_PAIRS)(`${theme}: %s on %s passes 4.5:1`, (text, on) => {
      expect(contrastRatio(value(text), value(on))).toBeGreaterThanOrEqual(4.5);
    });
  }
});
