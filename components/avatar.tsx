import Image from "next/image";
import { withBasePath } from "@/lib/site";

export function Avatar({ player, size = "medium" }: { player: "jess" | "grace"; size?: "small" | "medium" | "large" }) {
  return (
    <span className={`avatar avatar--${player} avatar--${size}`}>
      <Image
        src={withBasePath("/images/jess-and-grace-reference.png")}
        alt={player === "jess" ? "Jess" : "Grace"}
        fill
        sizes={size === "large" ? "512px" : size === "medium" ? "256px" : "128px"}
        className="avatar__image"
        priority={size === "large"}
      />
    </span>
  );
}
