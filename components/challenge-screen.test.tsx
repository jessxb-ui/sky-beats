import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { lessons } from "@/lib/data";
import { STORAGE_KEY } from "@/lib/progress";
import { ChallengeScreen } from "./challenge-screen";
import { ProgressProvider } from "./progress-provider";

const storedValues = new Map<string, string>();
const localStorageMock: Storage = {
  get length() { return storedValues.size; },
  clear: () => storedValues.clear(),
  getItem: (key) => storedValues.get(key) ?? null,
  key: (index) => [...storedValues.keys()][index] ?? null,
  removeItem: (key) => { storedValues.delete(key); },
  setItem: (key, value) => { storedValues.set(key, value); },
};

describe("cooperative challenge flow", () => {
  beforeEach(() => {
    storedValues.clear();
    Object.defineProperty(window, "localStorage", { configurable: true, value: localStorageMock });
  });

  it("shows both roles, swaps the controls, and unlocks one shared reward", async () => {
    const lesson = lessons[0];
    render(<ProgressProvider><ChallengeScreen lesson={lesson} /></ProgressProvider>);

    expect(await screen.findByText("Jess on the controls")).toBeTruthy();
    expect(screen.getByText(/Grace, count 1–2–3–4 aloud/i)).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: /Done — swap roles/i }));
    expect(await screen.findByText("Grace on the controls")).toBeTruthy();
    expect(screen.getByText(/Jess, keep the count going/i)).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: /Done — crew moment/i }));
    expect(await screen.findByText("Jess + Grace together")).toBeTruthy();
    expect(screen.getByText("Choose the jobs together. Both voices count.")).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: /Land the mix together/i }));
    expect(await screen.findByText("We earned this together.")).toBeTruthy();

    await waitFor(() => {
      const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}");
      expect(saved.completedLessonIds).toContain(lesson.id);
      expect(saved.unlockedRewardIds).toEqual([lesson.rewardId]);
    });
  });
});
