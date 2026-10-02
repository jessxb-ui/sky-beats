"use client";

import Link from "next/link";
import { ArrowLeft, Database, Headphones, Info, Laptop, RotateCcw, Volume2 } from "lucide-react";
import { useState } from "react";
import { useProgress } from "./progress-provider";

export function SettingsScreen() {
  const { progress, updatePreferences, resetProgress, saveAvailable } = useProgress();
  const [confirmReset, setConfirmReset] = useState(false);
  return (
    <div className="page settings-page">
      <Link href="/" className="back-link"><ArrowLeft /> Home</Link><header className="simple-header"><span className="eyebrow">Flight controls</span><h1>Settings</h1><p>Make Sky Beats comfortable for your crew.</p></header>
      <section className="settings-card" aria-labelledby="comfort-title"><h2 id="comfort-title">Comfort & access</h2>
        <label className="setting-row"><span className="setting-icon"><Volume2 /></span><span><strong>Sound cues</strong><small>Use spoken count-ins and demo sounds.</small></span><input type="checkbox" checked={progress.preferences.sound} onChange={(event) => updatePreferences({ sound: event.target.checked })} /><i aria-hidden="true" /></label>
        <label className="setting-row"><span className="setting-icon"><RotateCcw /></span><span><strong>Reduce motion</strong><small>Keep celebrations calm and still.</small></span><input type="checkbox" checked={progress.preferences.reducedMotion} onChange={(event) => updatePreferences({ reducedMotion: event.target.checked })} /><i aria-hidden="true" /></label>
      </section>
      <section className="settings-card" aria-labelledby="device-title"><h2 id="device-title">Controller & Mac</h2><div className="info-row"><Headphones /><span><strong>DDJ-FLX4 + rekordbox</strong><small>Connect the controller to the Mac. Rekordbox handles the music and controller input.</small></span><span className="status-dot">Companion mode</span></div><div className="info-row"><Laptop /><span><strong>Manual confirmation</strong><small>Sky Beats shows each move; the crew tries it and taps Done. Version 1 does not connect directly to the controller.</small></span></div><div className="info-row"><Database /><span><strong>Local crew progress</strong><small>{saveAvailable ? "Saved only on this device" : "Storage unavailable — practice still works"}</small></span></div></section>
      <section className="settings-card danger-zone" aria-labelledby="reset-title"><h2 id="reset-title">Start fresh</h2><p>Remove completed missions, unlocked rewards and saved preferences from this device.</p>{confirmReset ? <div className="confirm-reset"><p><strong>Reset everything?</strong> This cannot be undone.</p><button type="button" className="danger-button" onClick={() => { resetProgress(); setConfirmReset(false); }}>Yes, reset progress</button><button type="button" className="secondary-action" onClick={() => setConfirmReset(false)}>Keep progress</button></div> : <button type="button" className="secondary-action" onClick={() => setConfirmReset(true)}><RotateCcw /> Reset progress</button>}</section>
      <p className="privacy-note"><Info /> Sky Beats does not use accounts or send personal data anywhere.</p>
    </div>
  );
}
