import { addons } from "storybook/manager-api";
import { darkTheme, lightTheme } from "./theme";

// The Storybook UI follows the OS setting at load; the toolbar switch themes the canvas.
const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;

addons.setConfig({ theme: prefersDark ? darkTheme : lightTheme });
