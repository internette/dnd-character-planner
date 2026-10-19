import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { parseTokens, px } from "../test-utils";

const tokens = parseTokens(readFileSync(new URL("./layout.css", import.meta.url), "utf8"));

describe("layout tokens", () => {
  it.each(tokens.map((t) => [t.name, t]))("%s is a multiple of 4px with a usage comment", (_, token) => {
    expect(px(token.value)! % 4).toBe(0);
    expect(token.comment).toBeTruthy();
  });
});
