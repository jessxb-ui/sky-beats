"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock3, Gift, Headphones, Plane, SlidersHorizontal, Sparkles } from "lucide-react";
import { getNextLesson } from "@/lib/data";
import { withBasePath } from "@/lib/site";
import { Avatar } from "./avatar";
import { FlightPath } from "./flight-path";
import { PrimaryAction } from "./primary-action";
import { useProgress } from "./progress-provider";

export function HomeScreen() {
  const { progress, ready, saveAvailable, beginLesson } = useProgress();
  const lesson = getNextLesson(progress.completedLessonIds);
  const hasStarted = ready && progress.currentStep > 0 && !progress.completedLessonIds.includes(progress.currentLessonId);
  return (
    <div className="page home-page">
      <section className="hero">
        <div className="hero__copy">
          <span className="eyebrow"><Sparkles size={16} /> Jess + Grace mission control</span>
          <h1>Ready to make<br />some <em>noise?</em></h1>
          <p>Two DJs. One mission. Let’s learn together.</p>
          <div className="duo-chip" aria-label="Jess and Grace are learning together">
            <Avatar player="jess" size="small" /><Avatar player="grace" size="small" />
            <span><strong>Sky Beats crew</strong><small>Learning together</small></span>
          </div>
        </div>
        <div className="hero__art">
          <div className="hero__halo" aria-hidden="true" />
          <Image src={withBasePath("/images/jess-and-grace-white-background.png")} alt="Jess and Grace standing together beside their DJ controller" fill priority unoptimized sizes="(max-width: 700px) 92vw, 52vw" />
          <span className="floating-note note-one" aria-hidden="true">♪</span><span className="floating-note note-two" aria-hidden="true">♫</span>
        </div>
        <article className="mission-card">
          <div className="mission-card__top">
            <span className="mission-number">Mission {lesson.order}</span>
            <span className="duration"><Clock3 size={16} /> {lesson.durationMinutes} min</span>
          </div>
          <span className="eyebrow">Current mission</span>
          <h2>{lesson.missionName}</h2>
          <p>{lesson.goal}</p>
          <div className="mission-reward"><span><Gift size={18} /></span><p><small>Shared crew reward</small><strong>{lesson.rewardName}</strong></p></div>
          <PrimaryAction href={`/lessons/${lesson.id}`} onClick={() => beginLesson(lesson.id)} icon="plane">
            {hasStarted ? "Keep flying together" : "Take off together"}
          </PrimaryAction>
        </article>
      </section>

      {!saveAvailable && <p className="status-message" role="status">Progress couldn’t be saved. You can keep practising.</p>}
      <FlightPath />
      <section className="quick-actions" aria-labelledby="quick-title">
        <div className="section-heading"><div><span className="eyebrow">Choose your route</span><h2 id="quick-title">What next?</h2></div></div>
        <Link href="/practice" className="quick-card quick-card--practice">
          <span className="quick-card__icon"><SlidersHorizontal /></span><span><strong>Free Practice</strong><small>Repeat any skill. No pressure.</small></span><Plane aria-hidden="true" />
        </Link>
        <Link href="/rewards" className="quick-card quick-card--rewards">
          <span className="quick-card__icon"><Headphones /></span><span><strong>Crew rewards</strong><small>{progress.unlockedRewardIds.length ? `${progress.unlockedRewardIds.length} collected together` : "The crew jacket has room to grow"}</small></span><Gift aria-hidden="true" />
        </Link>
      </section>
      <p className="safety-note"><Headphones size={17} /> Keep the volume comfy and take a break when your ears need one.</p>
    </div>
  );
}
