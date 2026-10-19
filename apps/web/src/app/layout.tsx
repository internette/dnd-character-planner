import "@dnd/design-system/styles.css";
import type { Metadata } from "next";
import { Lora, Public_Sans } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

// Lora and Public Sans load through next/font, so the app doesn't import the design system's
// fonts.css. globals.css points --font-display and --font-body at these variables.
const lora = Lora({ subsets: ["latin"], weight: ["500", "600", "700"], style: ["normal", "italic"], variable: "--next-font-lora" });
const publicSans = Public_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--next-font-public-sans" });

export const metadata: Metadata = {
  title: "D&D Character Planner",
  description: "Plan your D&D character level by level.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${lora.variable} ${publicSans.variable}`}>
      {/* Browser extensions such as Grammarly add attributes to <body> before React hydrates. */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
