"use client";

import Link from "next/link";
import { Check, Flag, LockKeyhole } from "lucide-react";
import { lessons } from "@/lib/data";
import { useProgress } from "./progress-provider";

export function FlightPath() {
  const { progress } = useProgress();
  const activeIndex = lessons.findIndex((lesson) => lesson.id === progress.currentLessonId);
  return (
    <section className="journey" aria-labelledby="journey-title">
      <div className="section-heading">
        <div><span className="eyebrow">Crew flight path</span><h2 id="journey-title">Ten missions. One first gig.</h2></div>
        <span className="journey__count">{progress.completedLessonIds.length} of 10 complete together</span>
      </div>
      <ol className="flight-path">
        {lessons.map((lesson, index) => {
          const done = progress.completedLessonIds.includes(lesson.id);
          const active = index === activeIndex;
          const status = done ? "Complete" : active ? "Up next" : lesson.playable ? "Ready later" : "Coming soon";
          return (
            <li key={lesson.id} className={`flight-stop ${done ? "is-done" : ""} ${active ? "is-active" : ""}`}>
              {lesson.playable ? (
                <Link href={`/lessons/${lesson.id}`} className="flight-stop__link" aria-label={`Mission ${lesson.order}: ${lesson.missionName}. ${status}`}>
                  <span className="flight-stop__number">{done ? <Check size={17} /> : lesson.order}</span>
                  <span className="flight-stop__copy"><small>{status}</small><strong>{lesson.missionName}</strong></span>
                </Link>
              ) : (
                <div className="flight-stop__link" aria-label={`Mission ${lesson.order}: ${lesson.missionName}. Coming soon`}>
                  <span className="flight-stop__number">{lesson.order === 10 ? <Flag size={17} /> : <LockKeyhole size={15} />}</span>
                  <span className="flight-stop__copy"><small>Coming soon</small><strong>{lesson.missionName}</strong></span>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
