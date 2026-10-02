"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gift, Home, Plane, Settings, SlidersHorizontal } from "lucide-react";
import { Logo } from "./logo";
import { useProgress } from "./progress-provider";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/practice", label: "Practice", icon: SlidersHorizontal },
  { href: "/rewards", label: "Rewards", icon: Gift },
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { progress } = useProgress();
  return (
    <div className={progress.preferences.reducedMotion ? "app reduce-motion" : "app"}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="sky-motifs" aria-hidden="true"><span>♪</span><span>✦</span><Plane /></div>
      <header className="topbar">
        <Logo />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className={pathname === href ? "nav-link is-active" : "nav-link"}>
              <Icon size={19} aria-hidden="true" /><span>{label}</span>
            </Link>
          ))}
        </nav>
        <Link href="/settings" className={pathname === "/settings" ? "icon-button is-active" : "icon-button"} aria-label="Settings">
          <Settings size={22} aria-hidden="true" />
        </Link>
      </header>
      <main id="main-content">{children}</main>
      <nav className="mobile-nav" aria-label="Main navigation">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} className={pathname === href ? "mobile-nav__item is-active" : "mobile-nav__item"}>
            <Icon size={21} aria-hidden="true" /><span>{label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
