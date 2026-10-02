import type { Metadata, Viewport } from "next";
import "@fontsource-variable/baloo-2";
import "@fontsource-variable/nunito";
import "./globals.css";
import { AppShell } from "@/components/app-shell";
import { ProgressProvider } from "@/components/progress-provider";

export const metadata: Metadata = {
  title: { default: "Sky Beats", template: "%s · Sky Beats" },
  description: "A playful learn-to-DJ adventure for Jess and Grace.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#46B6E6" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-scroll-behavior="smooth"><body><ProgressProvider><AppShell>{children}</AppShell></ProgressProvider></body></html>;
}
