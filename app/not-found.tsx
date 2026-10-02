import { Plane } from "lucide-react";
import { PrimaryAction } from "@/components/primary-action";

export default function NotFound() { return <div className="page compact-page"><section className="coming-card"><span className="large-icon"><Plane /></span><span className="eyebrow">Flight path lost</span><h1>That mission flew away.</h1><p>Let’s head back to mission control and choose a new route.</p><PrimaryAction href="/" icon="plane">Back home</PrimaryAction></section></div>; }
