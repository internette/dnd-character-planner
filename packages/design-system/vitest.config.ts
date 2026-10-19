import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: [
      {
        // Token, CSS and theme tests read files from disk.
        test: { name: "tokens", environment: "node", include: ["src/**/*.test.ts", ".storybook/**/*.test.ts"] },
      },
      {
        test: {
          name: "components",
          environment: "jsdom",
          setupFiles: ["./vitest.setup.ts"],
          include: ["src/**/*.test.tsx"],
        },
      },
    ],
  },
});
