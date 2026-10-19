import { NextResponse, type NextRequest } from "next/server";

// next.config.ts turns off Next's own trailing-slash redirect so this can make one exception:
// the Storybook build at /design-system/ needs its trailing slash for its relative URLs.
export function proxy(request: NextRequest) {
  // A plain URL: NextURL would drop the trailing slash again when it's serialized.
  const url = new URL(request.url);
  const { pathname } = url;

  if (pathname === "/design-system") {
    url.pathname = "/design-system/";
    return NextResponse.redirect(url, 308);
  }

  // Every other route keeps Next's default: no trailing slash.
  if (pathname.length > 1 && pathname.endsWith("/") && !pathname.startsWith("/design-system/")) {
    url.pathname = pathname.replace(/\/+$/, "");
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/|design-system/.).*)"],
};
