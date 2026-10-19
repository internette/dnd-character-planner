import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { parseTokens, px } from "../test-utils";

const tokens = parseTokens(readFileSync(new URL("./spacing.css", import.meta.url), "utf8"));

describe("spacing tokens", () => {
  it.each(tokens.map((t) => [t.name, t]))("%s is N x 4px with a usage comment", (name, token) => {
    const steps = Number(/^--space-(\d+)$/.exec(name)?.[1]);
    expect(px(token.value)).toBe(steps * 4);
    expect(token.comment).toBeTruthy();
  });
});
