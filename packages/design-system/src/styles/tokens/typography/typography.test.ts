import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { parseTokens, px } from "../test-utils";

const css = readFileSync(new URL("./typography.css", import.meta.url), "utf8");
const tokens = parseTokens(css);
const names = new Set(tokens.map((t) => t.name));

describe("typography tokens", () => {
  it.each(tokens.filter((t) => /^--(font-size|line-height)-\d+$/.test(t.name)).map((t) => [t.name, t.value]))(
    "%s is N x 4px",
    (name, value) => {
      const steps = Number(name.split("-").pop());
      expect(px(value)).toBe(steps * 4);
    },
  );

  it.each(tokens.filter((t) => t.name.startsWith("--type-")).map((t) => [t.name, t]))(
    "%s uses only tokens from this file and has a usage comment",
    (_, token) => {
      const refs = [...token.value.matchAll(/var\((--[\w-]+)\)/g)].map((m) => m[1]);
      expect(refs.length).toBeGreaterThan(0);
      for (const ref of refs) expect(names.has(ref), ref).toBe(true);
      expect(token.comment).toBeTruthy();
    },
  );

  it("defines the ten text styles", () => {
    expect(tokens.filter((t) => t.name.startsWith("--type-")).map((t) => t.name)).toEqual([
      "--type-display-xl",
      "--type-display-lg",
      "--type-heading-lg",
      "--type-heading-md",
      "--type-heading-sm",
      "--type-subtitle",
      "--type-body",
      "--type-body-strong",
      "--type-label",
      "--type-caption",
    ]);
  });
});
