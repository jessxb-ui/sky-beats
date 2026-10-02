"use client";

import Link from "next/link";
import { ArrowLeft, Check, CircleHelp, Disc3, Hand, Plane, RotateCcw, SlidersHorizontal, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { manualController } from "@/lib/controller";
import { getHelper } from "@/lib/data";
import type { CrewMember, Lesson, Player } from "@/lib/types";
import { Avatar } from "./avatar";
import { PrimaryAction } from "./primary-action";
import { useProgress } from "./progress-provider";

const actionLabels = {
  play: "Play", cue: "Cue", crossfader: "Crossfader", channelVolume: "Channel fader", lowEq: "Low EQ",
  loop: "Loop", effect: "Effect", tap: "Tap the beat", choose: "Make your choice",
} as const;

const memberNames: Record<CrewMember, "Jess" | "Grace"> = { jess: "Jess", grace: "Grace" };
const phaseLabels = { "first-role": "First crew role", "role-swap": "Roles swapped", "crew-moment": "Crew moment" } as const;

function TurnVisual({ player }: { player: Player }) {
  if (player === "duo") {
    return <span className="duo-avatars" aria-label="Jess and Grace together"><Avatar player="jess" /><Avatar player="grace" /></span>;
  }
  const helper = getHelper(player);
  return (
    <div className="turn-pair" aria-label={`${memberNames[player]} on the controls and ${memberNames[helper]} helping`}>
      <span className="turn-pair__member is-controls"><Avatar player={player} size="large" /><strong>{memberNames[player]}</strong><small>Controls</small></span>
      <span className="turn-pair__member is-helper"><Avatar player={helper} /><strong>{memberNames[helper]}</strong><small>Helper</small></span>
    </div>
  );
}

export function ChallengeScreen({ lesson }: { lesson: Lesson }) {
  const { progress, setStep, completeLesson, saveAvailable } = useProgress();
  const initialStep = progress.currentLessonId === lesson.id ? Math.min(progress.currentStep, lesson.steps.length - 1) : 0;
  const [stepIndex, setStepIndex] = useState(Math.max(initialStep, 0));
  const [done, setDone] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [retryPrompt, setRetryPrompt] = useState(false);
  const step = lesson.steps[stepIndex];

  useEffect(() => {
    if (!done) setStep(lesson.id, stepIndex);
  }, [done, lesson.id, setStep, stepIndex]);

  async function confirmStep() {
    setConfirming(true);
    setRetryPrompt(false);
    await manualController.confirm(step.action);
    if (stepIndex < lesson.steps.length - 1) setStepIndex((value) => value + 1);
    else { completeLesson(lesson.id, lesson.rewardId); setDone(true); }
    setConfirming(false);
  }

  if (done) {
    return (
      <div className="page compact-page celebration-page">
        <div className="confetti" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
        <section className="celebration-card" aria-live="polite">
          <span className="celebration-card__plane"><Plane /></span><span className="eyebrow">Mission complete · one crew</span>
          <h1>{lesson.successMessage}</h1><p>Jess and Grace both tried the roles and finished this mission together.</p>
          <div className="unlocked-patch" style={{ "--reward-color": lesson.accent } as React.CSSProperties}><span><Disc3 /></span><div><small>Shared crew reward</small><strong>{lesson.rewardName}</strong><em>We earned this together.</em></div></div>
          <div className="celebration-actions"><PrimaryAction href="/" icon="plane">Next crew mission</PrimaryAction><Link className="secondary-action" href="/rewards">See crew rewards</Link></div>
          <small className="saved-note"><Check /> {saveAvailable ? "Crew progress saved on this device." : "Keep practising — saving is unavailable."}</small>
        </section>
      </div>
    );
  }

  const helper = step.player === "duo" ? null : getHelper(step.player);
  const helperInstruction = step.player === "duo" ? null : step.helperInstruction;
  const playerLabel = step.player === "duo" ? "Jess + Grace together" : `${memberNames[step.player]} on the controls`;
  const ActionIcon = step.action === "tap" ? Hand : step.action === "crossfader" || step.action === "channelVolume" ? SlidersHorizontal : Disc3;
  const nextLabel = stepIndex === lesson.steps.length - 1 ? "Land the mix together" : lesson.steps[stepIndex + 1].player === "duo" ? "Done — crew moment" : "Done — swap roles";

  return (
    <div className={`challenge-page challenge-page--${step.player}`}>
      <header className="challenge-topbar">
        <Link href={`/lessons/${lesson.id}`} className="back-link"><ArrowLeft /> Briefing</Link>
        <div className="challenge-progress" aria-label={`Step ${stepIndex + 1} of ${lesson.steps.length}`}>
          {lesson.steps.map((item, index) => <span key={item.id} className={index <= stepIndex ? "is-filled" : ""} />)}
        </div>
        <span className="manual-pill">Manual mode · rekordbox plays</span>
      </header>
      <main className="challenge-stage" id="challenge-content">
        <div className="turn-visual"><TurnVisual player={step.player} /><span className="turn-orbit" aria-hidden="true" /></div>
        <section className="instruction-card" aria-live="polite">
          <span className={`turn-label turn-label--${step.player}`}>{step.player === "duo" && <Users size={18} />}{playerLabel}</span>
          <small>{phaseLabels[step.phase]} · step {stepIndex + 1} of {lesson.steps.length}</small>
          <h1>{step.instruction}</h1>
          {helper && helperInstruction ? (
            <div className="helper-prompt">
              <Avatar player={helper} size="small" />
              <div><small>{memberNames[helper]} helps</small><strong>{helperInstruction}</strong></div>
            </div>
          ) : (
            <div className="helper-prompt helper-prompt--duo"><span className="duo-avatars"><Avatar player="jess" size="small" /><Avatar player="grace" size="small" /></span><div><small>One crew</small><strong>Choose the jobs together. Both voices count.</strong></div></div>
          )}
          <div className="controller-prompt"><span><ActionIcon /></span><div><small>{step.action === "choose" ? "Beside rekordbox" : "On your DDJ-FLX4"}</small><strong>{actionLabels[step.action]}</strong></div><Check aria-hidden="true" /></div>
          <p className="manual-note">Try it with the controller and rekordbox, then tap Done here. Sky Beats trusts your crew—it does not check the controller in version 1.</p>
          <PrimaryAction onClick={confirmStep} disabled={confirming} variant={stepIndex === lesson.steps.length - 1 ? "red" : "sky"} icon="check">{nextLabel}</PrimaryAction>
          <details className="crew-help">
            <summary><CircleHelp /> Help each other</summary>
            <p>{step.hint ?? "Repeat the same small move together."}</p>
            <ul><li>Point to <strong>{actionLabels[step.action]}</strong> before anyone moves it.</li><li>Take as many goes as you like, or do the move together.</li></ul>
            <Link href="/">Park this mission for later</Link>
          </details>
          <button className="retry-link" type="button" onClick={() => setRetryPrompt(true)}><RotateCcw /> Take another go</button>
          {retryPrompt && <p className="retry-note" role="status">Same jobs, same step. Nothing is lost—try it when you’re ready.</p>}
        </section>
      </main>
    </div>
  );
}
