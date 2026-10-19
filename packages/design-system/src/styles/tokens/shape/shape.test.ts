import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { parseTokens, px } from "../test-utils";

const tokens = parseTokens(readFileSync(new URL("./shape.css", import.meta.url), "utf8"));
const value = (name: string) => tokens.find((t) => t.name === name)?.value;

describe("shape tokens", () => {
  it.each(tokens.filter((t) => t.name.startsWith("--radius-") && t.name !== "--radius-full").map((t) => [t.name, t.value]))(
    "%s is a multiple of 4px",
    (_, v) => {
      expect(px(v)! % 4).toBe(0);
      expect(px(v)).toBeGreaterThan(0);
    },
  );

  it("has a full radius for discs", () => {
    expect(value("--radius-full")).toBe("50%");
  });

  it("has 1px and 2px strokes", () => {
    expect(value("--stroke-hairline")).toBe("1px");
    expect(value("--stroke-strong")).toBe("2px");
  });

  it.each(tokens.map((t) => [t.name, t]))("%s has a usage comment", (_, token) => {
    expect(token.comment).toBeTruthy();
  });
});
