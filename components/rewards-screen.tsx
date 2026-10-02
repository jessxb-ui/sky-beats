"use client";

import Link from "next/link";
import { ArrowLeft, Disc3, Gift, Headphones, LockKeyhole, Mic2, Plane, Radio, Repeat2, SlidersHorizontal, Sparkles, Star, Zap } from "lucide-react";
import { rewards } from "@/lib/data";
import { useProgress } from "./progress-provider";

const icons = { wave: Radio, plane: Plane, disc: Disc3, headphones: Headphones, sliders: SlidersHorizontal, speaker: Radio, loop: Repeat2, bolt: Zap, star: Star, mic: Mic2 } as const;

export function RewardsScreen() {
  const { progress } = useProgress();
  return (
    <div className="page rewards-page">
      <Link href="/" className="back-link"><ArrowLeft /> Home</Link>
      <header className="screen-intro rewards-intro"><div><span className="eyebrow">The crew collection</span><h1>Our flight jacket</h1><p>Every reward belongs to Jess and Grace together. Each one marks a crew mission they shared.</p></div><div className="reward-total"><Gift /><strong>{progress.unlockedRewardIds.length}</strong><span>of {rewards.length}<small>shared</small></span></div></header>
      {progress.unlockedRewardIds.length === 0 && <div className="empty-rewards"><Sparkles /><p><strong>The crew jacket has room to grow.</strong> Finish a mission together to reveal the first shared patch.</p></div>}
      {(["patch", "gear", "poster"] as const).map((kind) => (
        <section className="reward-section" key={kind} aria-labelledby={`${kind}-title`}>
          <div className="section-heading"><h2 id={`${kind}-title`}>{kind === "patch" ? "Patches" : kind === "gear" ? "Gear & stickers" : "Gig posters"}</h2><span>{rewards.filter((r) => r.kind === kind && progress.unlockedRewardIds.includes(r.id)).length} collected together</span></div>
          <div className="reward-grid">
            {rewards.filter((reward) => reward.kind === kind).map((reward) => { const unlocked = progress.unlockedRewardIds.includes(reward.id); const Icon = icons[reward.icon as keyof typeof icons]; return (
              <article className={unlocked ? "reward-card is-unlocked" : "reward-card is-locked"} key={reward.id}>
                <div className="reward-emblem" style={{ "--reward-color": reward.color } as React.CSSProperties}>{unlocked ? <Icon /> : <LockKeyhole />}</div>
                <div><strong>{reward.name}</strong><small>{unlocked ? "Collected together" : reward.requirement}</small></div>
                <span className="reward-status">{unlocked ? "Shared" : "Crew mission"}</span>
              </article>); })}
          </div>
        </section>
      ))}
    </div>
  );
}
