"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { completeLesson as completeLessonState, defaultProgress, sanitiseProgress, STORAGE_KEY } from "@/lib/progress";
import type { Preferences, SavedProgress } from "@/lib/types";

type ProgressContextValue = {
  progress: SavedProgress;
  ready: boolean;
  saveAvailable: boolean;
  beginLesson: (lessonId: string) => void;
  setStep: (lessonId: string, step: number) => void;
  completeLesson: (lessonId: string, rewardId: string) => void;
  updatePreferences: (preferences: Partial<Preferences>) => void;
  resetProgress: () => void;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<SavedProgress>(defaultProgress);
  const [ready, setReady] = useState(false);
  const [saveAvailable, setSaveAvailable] = useState(true);

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        setProgress(raw ? sanitiseProgress(JSON.parse(raw)) : defaultProgress());
      } catch {
        setProgress(defaultProgress());
        setSaveAvailable(false);
      } finally {
        setReady(true);
      }
    });
    return () => { cancelled = true; };
  }, []);

  const persist = useCallback((updater: (value: SavedProgress) => SavedProgress) => {
    setProgress((current) => {
      const next = updater(current);
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        setSaveAvailable(true);
      } catch {
        setSaveAvailable(false);
      }
      return next;
    });
  }, []);

  const beginLesson = useCallback((lessonId: string) => {
    persist((current) => ({ ...current, currentLessonId: lessonId, currentStep: 0, lastUpdated: new Date().toISOString() }));
  }, [persist]);

  const setStep = useCallback((lessonId: string, step: number) => {
    persist((current) => {
      if (current.currentLessonId === lessonId && current.currentStep === step) return current;
      return { ...current, currentLessonId: lessonId, currentStep: step, lastUpdated: new Date().toISOString() };
    });
  }, [persist]);

  const completeLesson = useCallback((lessonId: string, rewardId: string) => {
    persist((current) => completeLessonState(current, lessonId, rewardId));
  }, [persist]);

  const updatePreferences = useCallback((preferences: Partial<Preferences>) => {
    persist((current) => ({ ...current, preferences: { ...current.preferences, ...preferences }, lastUpdated: new Date().toISOString() }));
  }, [persist]);

  const resetProgress = useCallback(() => {
    const fresh = defaultProgress();
    try {
      window.localStorage.removeItem(STORAGE_KEY);
      setSaveAvailable(true);
    } catch {
      setSaveAvailable(false);
    }
    setProgress(fresh);
  }, []);

  const value: ProgressContextValue = {
    progress,
    ready,
    saveAvailable,
    beginLesson,
    setStep,
    completeLesson,
    updatePreferences,
    resetProgress,
  };

  if (!ready) return <div className="app-loading" role="status"><span>SKY BEATS</span><strong>Warming up the decks…</strong></div>;
  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) throw new Error("useProgress must be used inside ProgressProvider");
  return context;
}
