import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "D&D Character Planner",
  description: "Plan your D&D character level by level.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      {/* Browser extensions such as Grammarly add attributes to <body> before React hydrates. */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
