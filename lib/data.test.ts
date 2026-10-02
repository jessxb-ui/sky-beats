import { describe, expect, it } from "vitest";
import { getHelper, lessons, practiceSkills, rewards } from "./data";

describe("lesson progression", () => {
  it("shows all ten missions and makes the first five playable", () => {
    expect(lessons).toHaveLength(10);
    expect(lessons.filter((lesson) => lesson.playable).map((lesson) => lesson.order)).toEqual([1, 2, 3, 4, 5]);
  });

  it("gives every playable mission a complete beginner briefing", () => {
    for (const lesson of lessons.filter((item) => item.playable)) {
      expect(lesson.briefing.what.trim().length).toBeGreaterThan(0);
      expect(lesson.briefing.why.trim().length).toBeGreaterThan(0);
      expect(lesson.briefing.together.trim().length).toBeGreaterThan(0);
    }
  });

  it("keeps the required briefing fields ready for every future mission", () => {
    for (const lesson of lessons) {
      expect(lesson.briefing).toMatchObject({
        what: expect.any(String),
        why: expect.any(String),
        together: expect.any(String),
      });
      expect(Object.values(lesson.briefing).filter((value) => typeof value === "string").every((value) => value.trim().length > 0)).toBe(true);
    }
  });

  it("uses the first role, role swap, and crew moment pattern in every playable mission", () => {
    for (const lesson of lessons.filter((item) => item.playable)) {
      expect(lesson.steps.map((step) => step.phase)).toEqual(["first-role", "role-swap", "crew-moment"]);
      const [first, swapped, together] = lesson.steps;
      expect(first.player).not.toBe("duo");
      expect(swapped.player).not.toBe("duo");
      expect(together.player).toBe("duo");
      if (first.player !== "duo" && swapped.player !== "duo") {
        expect(swapped.player).toBe(getHelper(first.player));
        expect(first.helperInstruction.trim().length).toBeGreaterThan(0);
        expect(swapped.helperInstruction.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it("gives the partner a visible helper job in every solo controller step", () => {
    const soloSteps = lessons.filter((lesson) => lesson.playable).flatMap((lesson) => lesson.steps).filter((step) => step.player !== "duo");
    expect(soloSteps.length).toBeGreaterThan(0);
    for (const step of soloSteps) {
      expect(step.helperInstruction).toMatch(/count|listen|point|ready|signal|describe|say/i);
    }
  });

  it("frames both players as beginners rather than making one the teacher", () => {
    const playableCopy = lessons.filter((lesson) => lesson.playable).flatMap((lesson) => lesson.steps).map((step) => `${step.instruction} ${"helperInstruction" in step ? step.helperInstruction : ""}`).join(" ");
    expect(playableCopy).not.toMatch(/teach|teacher|expert|correct grace|correct jess|show grace|show jess/i);
  });

  it("assigns one unique reward to every mission", () => {
    const rewardIds = lessons.map((lesson) => lesson.rewardId);
    expect(new Set(rewardIds).size).toBe(lessons.length);
  });

  it("makes every reward a shared crew reward", () => {
    expect(rewards).toHaveLength(lessons.length);
    expect(rewards.every((reward) => reward.owner === "crew")).toBe(true);
    expect(rewards.every((reward) => reward.requirement.includes("crew mission"))).toBe(true);
  });

  it("gives both players a meaningful role in every practice skill", () => {
    for (const skill of practiceSkills) {
      expect(skill.controllerInstruction.trim().length).toBeGreaterThan(0);
      expect(skill.helperInstruction).toMatch(/count|listen|point|ready|signal|describe|say|name/i);
    }
  });
});
