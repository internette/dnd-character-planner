import { create } from "storybook/theming";

// Storybook's theming needs literal colors. theme.test.ts checks every value below against
// the matching --color-* token in src/styles/tokens/color/color.css.

/** Maps each Storybook theme color to the color token it must match. */
export const THEME_TOKENS = {
  colorPrimary: "accent",
  colorSecondary: "accent",
  appBg: "ground",
  appContentBg: "surface",
  appBorderColor: "line",
  textColor: "ink",
  textMutedColor: "ink-muted",
  barSelectedColor: "accent",
} as const;

const fonts = {
  fontBase: '"Public Sans", system-ui, -apple-system, "Segoe UI", sans-serif',
  fontCode: 'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace',
};

const brand = {
  brandTitle: '<span style="font-family: Lora, Georgia, serif; font-weight: 600; font-size: 20px;">Bag of Holding</span>',
  brandUrl: "./",
  appBorderRadius: 12,
};

export const lightColors = {
  colorPrimary: "#2f6f5a",
  colorSecondary: "#2f6f5a",
  appBg: "#f4f6f4",
  appContentBg: "#ffffff",
  appBorderColor: "#d5e0db",
  textColor: "#1c2b26",
  textMutedColor: "#4f625b",
  barSelectedColor: "#2f6f5a",
};

export const darkColors = {
  colorPrimary: "#6fb79c",
  colorSecondary: "#6fb79c",
  appBg: "#121a17",
  appContentBg: "#1a2420",
  appBorderColor: "#2e3d37",
  textColor: "#e7efeb",
  textMutedColor: "#9db0a8",
  barSelectedColor: "#6fb79c",
};

export const lightTheme = create({ base: "light", ...brand, ...fonts, ...lightColors });
export const darkTheme = create({ base: "dark", ...brand, ...fonts, ...darkColors });
