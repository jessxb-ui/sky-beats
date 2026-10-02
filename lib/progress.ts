import { lessons } from "./data";
import type { SavedProgress } from "./types";

export const STORAGE_KEY = "sky-beats-progress";

export function defaultProgress(): SavedProgress {
  return {
    version: 1,
    completedLessonIds: [],
    currentLessonId: lessons[0].id,
    currentStep: 0,
    unlockedRewardIds: [],
    preferences: { sound: true, reducedMotion: false },
    lastUpdated: new Date(0).toISOString(),
  };
}

export function sanitiseProgress(input: unknown): SavedProgress {
  const fallback = defaultProgress();
  if (!input || typeof input !== "object") return fallback;
  const value = input as Partial<SavedProgress>;
  if (value.version !== 1) return fallback;

  const validLessonIds = new Set(lessons.map((lesson) => lesson.id));
  const validRewardIds = new Set(lessons.map((lesson) => lesson.rewardId));
  const completedLessonIds = Array.isArray(value.completedLessonIds)
    ? value.completedLessonIds.filter((id): id is string => typeof id === "string" && validLessonIds.has(id))
    : [];
  const unlockedRewardIds = Array.isArray(value.unlockedRewardIds)
    ? value.unlockedRewardIds.filter((id): id is string => typeof id === "string" && validRewardIds.has(id))
    : [];

  return {
    version: 1,
    completedLessonIds: [...new Set(completedLessonIds)],
    currentLessonId: typeof value.currentLessonId === "string" && validLessonIds.has(value.currentLessonId)
      ? value.currentLessonId : fallback.currentLessonId,
    currentStep: typeof value.currentStep === "number" && Number.isInteger(value.currentStep) && value.currentStep >= 0
      ? value.currentStep : 0,
    unlockedRewardIds: [...new Set(unlockedRewardIds)],
    preferences: {
      sound: typeof value.preferences?.sound === "boolean" ? value.preferences.sound : true,
      reducedMotion: typeof value.preferences?.reducedMotion === "boolean" ? value.preferences.reducedMotion : false,
    },
    lastUpdated: typeof value.lastUpdated === "string" ? value.lastUpdated : fallback.lastUpdated,
  };
}

export function completeLesson(progress: SavedProgress, lessonId: string, rewardId: string): SavedProgress {
  const completedLessonIds = [...new Set([...progress.completedLessonIds, lessonId])];
  const current = lessons.find((lesson) => lesson.id === lessonId);
  const next = lessons.find((lesson) => lesson.playable && lesson.order === (current?.order ?? 0) + 1);
  return {
    ...progress,
    completedLessonIds,
    unlockedRewardIds: [...new Set([...progress.unlockedRewardIds, rewardId])],
    currentLessonId: next?.id ?? lessonId,
    currentStep: 0,
    lastUpdated: new Date().toISOString(),
  };
}
