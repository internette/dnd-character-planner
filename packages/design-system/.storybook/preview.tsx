import { DocsContainer, type DocsContainerProps } from "@storybook/addon-docs/blocks";
import type { Decorator, Preview } from "@storybook/react-vite";
import { useEffect, useSyncExternalStore } from "react";
import { GLOBALS_UPDATED, SET_GLOBALS } from "storybook/internal/core-events";
import { addons } from "storybook/preview-api";
import "../src/styles/tokens/typography/fonts.css";
import "../src/styles/index.css";
import "./preview.css";
import { darkTheme, lightTheme } from "./theme";

type ThemeName = "light" | "dark";

// The current theme, shared by the story decorator and the docs container so stories and MDX
// pages switch together. MDX-only pages render no story, so the channel listener below keeps
// them in sync with the toolbar too.
let currentTheme: ThemeName = "light";
const listeners = new Set<() => void>();

function setTheme(theme: unknown) {
  const next: ThemeName = theme === "dark" ? "dark" : "light";
  if (typeof document !== "undefined") document.documentElement.dataset.theme = next;
  if (next === currentTheme) return;
  currentTheme = next;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

addons.ready().then((channel) => {
  const onGlobals = ({ globals }: { globals: Record<string, unknown> }) => setTheme(globals.theme);
  channel.on(SET_GLOBALS, onGlobals);
  channel.on(GLOBALS_UPDATED, onGlobals);
});

function ThemedDocsContainer(props: DocsContainerProps) {
  const theme = useSyncExternalStore(subscribe, () => currentTheme, () => currentTheme);
  return <DocsContainer {...props} theme={theme === "dark" ? darkTheme : lightTheme} />;
}

const withTheme: Decorator = (Story, context) => {
  const theme: ThemeName = context.globals.theme === "dark" ? "dark" : "light";
  useEffect(() => setTheme(theme), [theme]);
  return (
    <div data-theme={theme} className="cp-story-root">
      <Story />
    </div>
  );
};

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Color theme",
      toolbar: {
        title: "Theme",
        icon: "mirror",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: "light" },
  decorators: [withTheme],
  parameters: {
    backgrounds: { disable: true },
    layout: "padded",
    docs: {
      theme: lightTheme,
      container: ThemedDocsContainer,
    },
    options: {
      storySort: {
        order: [
          "Introduction",
          "Foundations",
          ["Voice", "Color", "Typography", "Spacing", "Layout", "Iconography"],
          "Components",
          "Patterns",
        ],
      },
    },
  },
};

export default preview;
