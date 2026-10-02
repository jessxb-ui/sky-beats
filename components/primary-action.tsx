import Link from "next/link";
import { ArrowRight, Check, Plane } from "lucide-react";

type Props = {
  href?: string;
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "sky" | "red" | "navy";
  icon?: "plane" | "check" | "arrow";
  disabled?: boolean;
  type?: "button" | "submit";
};

export function PrimaryAction({ href, children, onClick, variant = "sky", icon = "arrow", disabled, type = "button" }: Props) {
  const Icon = icon === "plane" ? Plane : icon === "check" ? Check : ArrowRight;
  const content = <>{children}<Icon size={20} aria-hidden="true" /></>;
  if (href) return <Link href={href} className={`primary-action primary-action--${variant}`}>{content}</Link>;
  return <button type={type} onClick={onClick} disabled={disabled} className={`primary-action primary-action--${variant}`}>{content}</button>;
}
