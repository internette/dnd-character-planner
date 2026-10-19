import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { tokenValues } from "../src/styles/tokens/test-utils";
import { darkColors, lightColors, THEME_TOKENS } from "./theme";

const css = readFileSync(new URL("../src/styles/tokens/color/color.css", import.meta.url), "utf8");
const themes = {
  light: { colors: lightColors, tokens: tokenValues(css, ":root") },
  dark: { colors: darkColors, tokens: tokenValues(css, '[data-theme="dark"]') },
};

describe("Storybook theme", () => {
  for (const [name, { colors, tokens }] of Object.entries(themes)) {
    it.each(Object.entries(THEME_TOKENS))(`${name}: %s matches --color-%s`, (key, token) => {
      expect(colors[key as keyof typeof colors]).toBe(tokens.get(`--color-${token}`));
    });
  }
});
