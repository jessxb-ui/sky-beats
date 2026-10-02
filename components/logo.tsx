import Link from "next/link";
import { Headphones } from "lucide-react";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className={`logo ${compact ? "logo--compact" : ""}`} aria-label="Sky Beats home">
      <span className="logo__cloud" aria-hidden="true">
        <Headphones size={compact ? 20 : 24} strokeWidth={2.6} />
        <span>SKY</span><span>BEATS</span>
      </span>
      {!compact && <small>Learn. Mix. Soar.</small>}
    </Link>
  );
}
