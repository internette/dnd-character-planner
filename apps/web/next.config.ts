import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

const storybookUrl = process.env.STORYBOOK_URL ?? "http://localhost:6006";

export default function config(phase: string): NextConfig {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  return {
    transpilePackages: ["@dnd/design-system"],
    // Storybook's static build uses relative URLs, so it must load from /design-system/ with
    // the trailing slash. proxy.ts adds that slash and handles slashes for every other route.
    skipTrailingSlashRedirect: true,
    async redirects() {
      // In development, /design-system goes to the live Storybook dev server.
      if (!isDev) return [];
      return [
        { source: "/design-system", destination: storybookUrl, permanent: false },
        { source: "/design-system/:path*", destination: `${storybookUrl}/:path*`, permanent: false },
      ];
    },
    async rewrites() {
      // In production, /design-system/ serves the Storybook static build in public/design-system.
      return [{ source: "/design-system/", destination: "/design-system/index.html" }];
    },
  };
}
