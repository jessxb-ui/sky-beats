"use client";

import { ArrowLeft, Repeat2, RotateCcw, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { getHelper, practiceSkills } from "@/lib/data";
import type { CrewMember } from "@/lib/types";
import { Avatar } from "./avatar";
import { PrimaryAction } from "./primary-action";

const memberNames: Record<CrewMember, "Jess" | "Grace"> = { jess: "Jess", grace: "Grace" };

export function PracticeScreen() {
  const [selected, setSelected] = useState<(typeof practiceSkills)[number] | null>(null);
  const [round, setRound] = useState(0);
  const [complete, setComplete] = useState(false);
  const controllerPlayer: CrewMember = round % 2 ? "grace" : "jess";
  const helper = getHelper(controllerPlayer);

  function close() { setSelected(null); setRound(0); setComplete(false); }

  return (
    <div className="page practice-page">
      <Link href="/" className="back-link"><ArrowLeft /> Home</Link>
      <header className="screen-intro practice-intro"><div><span className="eyebrow">Free crew practice</span><h1>Pick one skill together</h1><p>Repeat anything you like. Swap controller and helper jobs; practice never changes the crew’s mission order.</p></div><span className="practice-orbit"><RotateCcw /></span></header>
      <section className="skill-grid" aria-label="Practice skills">
        {practiceSkills.map((skill) => <button type="button" className={`skill-card skill-card--${skill.color}`} key={skill.id} onClick={() => { setSelected(skill); setRound(0); setComplete(false); }}><span>{skill.icon}</span><strong>{skill.name}</strong><small>Short crew practice</small></button>)}
      </section>
      <div className="practice-tip"><Sparkles /><p><strong>Keep it playful.</strong> One person uses the controls, the other helps, then the next round swaps the jobs.</p></div>
      {selected && <div className="modal-backdrop" role="presentation"><section className="practice-modal" role="dialog" aria-modal="true" aria-labelledby="practice-title">
        <button type="button" className="modal-close" onClick={close} aria-label="Close practice"><X /></button>
        <span className={`skill-card__mini skill-card--${selected.color}`}>{selected.icon}</span><span className="eyebrow">Crew practice · round {round + 1}</span><h2 id="practice-title">{complete ? "Nice work, crew." : selected.name}</h2>
        {complete ? <><p>Both jobs mattered. Another round swaps who starts on the controls, or the crew can choose a new skill.</p><div className="practice-finish"><span className="duo-avatars"><Avatar player="jess" /><Avatar player="grace" /></span><strong>Practised together</strong></div><PrimaryAction onClick={() => { setComplete(false); setRound((value) => value + 1); }} icon="arrow">Swap jobs for another round</PrimaryAction><button className="secondary-action" onClick={close}>Choose a skill</button></> : <><p className="practice-prompt">{selected.prompt}</p><div className="practice-role-board" aria-label={`${memberNames[controllerPlayer]} on the controls and ${memberNames[helper]} helping`}>
          <article><Avatar player={controllerPlayer} /><span><small>{memberNames[controllerPlayer]} on the controls</small><strong>{selected.controllerInstruction}</strong></span></article>
          <Repeat2 aria-hidden="true" />
          <article><Avatar player={helper} /><span><small>{memberNames[helper]} helps</small><strong>{selected.helperInstruction}</strong></span></article>
        </div><p className="manual-note">Use the DDJ-FLX4 with rekordbox, then confirm the try here yourselves.</p><PrimaryAction onClick={() => setComplete(true)} icon="check">Done together</PrimaryAction></>}
      </section></div>}
    </div>
  );
}
