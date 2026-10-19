import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const componentsDir = fileURLToPath(new URL("../components", import.meta.url));
const cssFiles = readdirSync(componentsDir, { recursive: true, encoding: "utf8" })
  .filter((file) => file.endsWith(".css"))
  .map((file) => [file, readFileSync(join(componentsDir, file), "utf8")] as const);

/** Strips comments and @media preludes, where raw 480px is allowed. */
function declarations(css: string): string {
  return css.replace(/\/\*[\s\S]*?\*\//g, "").replace(/@media[^{]*\{/g, "{");
}

describe("component CSS uses tokens only", () => {
  it("finds component stylesheets", () => {
    expect(cssFiles.length).toBeGreaterThan(0);
  });

  it.each(cssFiles)("%s has no hex colors", (_, css) => {
    expect(declarations(css)).not.toMatch(/#[0-9a-f]{3,8}\b/i);
  });

  it.each(cssFiles)("%s has no px values outside @media queries", (_, css) => {
    expect(declarations(css)).not.toMatch(/\d+(\.\d+)?px/);
  });

  it.each(cssFiles)("%s sets font-size, line-height and font-family from tokens", (_, css) => {
    for (const [, prop, value] of declarations(css).matchAll(/(font-size|line-height|font-family)\s*:\s*([^;]+);/g)) {
      expect(value.trim(), prop).toMatch(/^var\(--(font|line-height)-[\w-]+\)$/);
    }
  });
});
