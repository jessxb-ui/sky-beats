import { describe, expect, it } from "vitest";
import { completeLesson, defaultProgress, sanitiseProgress } from "./progress";

describe("saved progress", () => {
  it("recovers safely from corrupt input", () => {
    expect(sanitiseProgress("not progress")).toEqual(defaultProgress());
    expect(sanitiseProgress({ version: 99, completedLessonIds: ["beat-basics"] })).toEqual(defaultProgress());
  });

  it("filters unknown lessons and rewards", () => {
    const state = sanitiseProgress({
      ...defaultProgress(),
      completedLessonIds: ["beat-basics", "made-up"],
      unlockedRewardIds: ["beat-finder", "free-coins"],
    });
    expect(state.completedLessonIds).toEqual(["beat-basics"]);
    expect(state.unlockedRewardIds).toEqual(["beat-finder"]);
  });

  it("unlocks the reward and advances to the next playable lesson", () => {
    const state = completeLesson(defaultProgress(), "beat-basics", "beat-finder");
    expect(state.completedLessonIds).toEqual(["beat-basics"]);
    expect(state.unlockedRewardIds).toEqual(["beat-finder"]);
    expect(state.currentLessonId).toBe("bars-phrases");
    expect(state.currentStep).toBe(0);
  });

  it("does not duplicate completion or reward entries", () => {
    const once = completeLesson(defaultProgress(), "beat-basics", "beat-finder");
    const twice = completeLesson(once, "beat-basics", "beat-finder");
    expect(twice.completedLessonIds).toHaveLength(1);
    expect(twice.unlockedRewardIds).toHaveLength(1);
  });
});
