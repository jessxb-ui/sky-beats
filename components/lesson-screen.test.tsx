import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { lessons } from "@/lib/data";
import { LessonScreen } from "./lesson-screen";
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

describe("beginner lesson briefing", () => {
  beforeEach(() => {
    storedValues.clear();
    Object.defineProperty(window, "localStorage", { configurable: true, value: localStorageMock });
  });

  it("gates Listen, Look and Do behind the three-part briefing", async () => {
    const lesson = lessons[0];
    render(<ProgressProvider><LessonScreen lesson={lesson} /></ProgressProvider>);

    expect(await screen.findByRole("heading", { name: "What it is" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Why DJs use it" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "What we’ll try together" })).toBeTruthy();
    expect(screen.queryByRole("heading", { name: "Listen" })).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Show me" }));
    expect(screen.getByRole("heading", { name: "Play and the beat count" })).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "Got it — let’s try" }));
    expect(screen.getByRole("heading", { name: "Listen" })).toBeTruthy();
    expect(screen.getByRole("link", { name: /Take off together/i })).toBeTruthy();
  });
});
