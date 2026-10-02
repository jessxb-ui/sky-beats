"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, BookOpenText, Disc3, Ear, Eye, Gift, Hand, Headphones, Laptop, Lightbulb, ListMusic, LockKeyhole, Play, RotateCcw, SlidersHorizontal, Users, Volume2 } from "lucide-react";
import type { Lesson } from "@/lib/types";
import { Avatar } from "./avatar";
import { PrimaryAction } from "./primary-action";
import { useProgress } from "./progress-provider";

const learnIcons = { Listen: Ear, Look: Eye, Do: Hand } as const;

const controlIcons = {
  play: Play,
  cue: Disc3,
  crossfader: SlidersHorizontal,
  channelVolume: SlidersHorizontal,
  lowEq: SlidersHorizontal,
  loop: RotateCcw,
  effect: Lightbulb,
  tap: Hand,
  choose: ListMusic,
} as const;

export function LessonScreen({ lesson }: { lesson: Lesson }) {
  const { beginLesson, progress } = useProgress();
  const [briefingComplete, setBriefingComplete] = useState(false);
  const [showControl, setShowControl] = useState(false);
  if (!lesson.playable) {
    return (
      <div className="page compact-page"><Link href="/" className="back-link"><ArrowLeft /> Back home</Link>
        <section className="coming-card"><span className="large-icon"><LockKeyhole /></span><span className="eyebrow">Mission {lesson.order}</span><h1>{lesson.missionName}</h1><p>This crew mission is being prepared. Explore the first five together while we tune the next controls.</p><PrimaryAction href="/" variant="navy">Back to crew flight path</PrimaryAction></section>
      </div>
    );
  }
  const completed = progress.completedLessonIds.includes(lesson.id);
  const ShowMeIcon = lesson.briefing.showMe ? controlIcons[lesson.briefing.showMe.action] : Eye;
  return (
    <div className="page lesson-page">
      <Link href="/" className="back-link"><ArrowLeft /> Flight path</Link>
      <header className="screen-intro">
        <div><span className="eyebrow">Mission {lesson.order} · {lesson.title}</span><h1>{lesson.missionName}</h1><p>{lesson.goal}</p></div>
        <div className="lesson-badge" style={{ "--badge-color": lesson.accent } as React.CSSProperties}><Headphones /><span>{lesson.durationMinutes}<small>min</small></span></div>
      </header>
      {!briefingComplete ? (
        <section className="beginner-briefing" aria-labelledby="briefing-title">
          <div className="beginner-briefing__heading">
            <span className="briefing-icon" aria-hidden="true"><BookOpenText /></span>
            <div><span className="eyebrow">Quick crew briefing · about 25 seconds</span><h2 id="briefing-title">Before you touch the controls</h2><p>No DJ knowledge needed. Sky Beats explains the idea, then you both try it.</p></div>
          </div>
          <div className="briefing-grid">
            <article className="briefing-part"><span className="briefing-part__number">1</span><div><h3>What it is</h3><p>{lesson.briefing.what}</p></div></article>
            <article className="briefing-part"><span className="briefing-part__number">2</span><div><h3>Why DJs use it</h3><p>{lesson.briefing.why}</p></div></article>
            <article className="briefing-part"><span className="briefing-part__number">3</span><div><h3>What we’ll try together</h3><p>{lesson.briefing.together}</p></div></article>
          </div>
          {showControl && lesson.briefing.showMe && (
            <aside className="control-spotlight" aria-live="polite">
              <div className={`control-spotlight__visual control-spotlight__visual--${lesson.briefing.showMe.action}`} aria-hidden="true">
                <span className="control-spotlight__control"><ShowMeIcon /></span>
                <i /><i /><i />
              </div>
              <div><span className="eyebrow">{lesson.briefing.showMe.action === "choose" ? "Beside rekordbox" : "Find this on the DDJ-FLX4"}</span><h3>{lesson.briefing.showMe.label}</h3><p>{lesson.briefing.showMe.text}</p></div>
            </aside>
          )}
          <div className="briefing-actions">
            {lesson.briefing.showMe && <button className="secondary-action" type="button" aria-expanded={showControl} onClick={() => setShowControl((visible) => !visible)}><Eye />{showControl ? "Hide the example" : "Show me"}</button>}
            <PrimaryAction onClick={() => setBriefingComplete(true)} icon="arrow">Got it — let’s try</PrimaryAction>
          </div>
        </section>
      ) : (
        <>
      <section className="crew-briefing" aria-label="How this crew mission works">
        <span className="duo-avatars"><Avatar player="jess" /><Avatar player="grace" /></span>
        <div><span className="eyebrow"><Users size={16} /> One crew</span><h2>Learn it, swap jobs, finish together</h2><p>Sky Beats shows the move. Jess and Grace are both beginners: one uses the controller while the other counts, listens, points, or gives the ready signal.</p></div>
        <div className="setup-note"><Laptop /><span><strong>Companion mode</strong><small>The DDJ-FLX4 connects to the Mac and rekordbox plays the music. Confirm each try here yourself.</small></span></div>
      </section>
      <section className="learn-grid" aria-label="Mission briefing">
        {lesson.learn.map((item, index) => {
          const Icon = learnIcons[item.label];
          return <article className="learn-card" key={item.label}><span className="learn-card__number">0{index + 1}</span><span className={`learn-card__icon learn-card__icon--${item.label.toLowerCase()}`}><Icon /></span><h2>{item.label}</h2><p>{item.text}</p></article>;
        })}
      </section>
      <div className="count-panel" aria-label="Count four beats"><span>1</span><i /><span>2</span><i /><span>3</span><i /><span>4</span></div>
      <section className="lesson-footer">
        <div className="reward-preview"><Gift /><span><small>Shared crew reward</small><strong>{lesson.rewardName}</strong></span></div>
        <div className="lesson-actions">
          <button className="secondary-action" type="button" disabled={!progress.preferences.sound} aria-describedby={!progress.preferences.sound ? "sound-off-note" : undefined} onClick={() => window.speechSynthesis?.speak(new SpeechSynthesisUtterance("One, two, three, four"))}><Volume2 /> Hear the count</button>
          <PrimaryAction href={`/lessons/${lesson.id}/challenge`} onClick={() => beginLesson(lesson.id)} icon="arrow">{completed ? "Practice together" : "Take off together"}</PrimaryAction>
        </div>
      </section>
      {!progress.preferences.sound && <p id="sound-off-note" className="safety-note">Sound is off. Turn it on in Settings when you’re ready to listen.</p>}
      <button className="briefing-return" type="button" onClick={() => setBriefingComplete(false)}><BookOpenText /> Read the beginner briefing again</button>
        </>
      )}
    </div>
  );
}
