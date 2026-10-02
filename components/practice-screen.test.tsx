import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PracticeScreen } from "./practice-screen";

describe("cooperative practice", () => {
  it("shows controller and helper jobs, then swaps them for the next round", async () => {
    render(<PracticeScreen />);

    fireEvent.click(screen.getByRole("button", { name: /Beat counting/i }));
    expect(screen.getByText("Jess on the controls")).toBeTruthy();
    expect(screen.getByText("Grace helps")).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: /Done together/i }));
    expect(await screen.findByText("Practised together")).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: /Swap jobs for another round/i }));
    expect(screen.getByText("Grace on the controls")).toBeTruthy();
    expect(screen.getByText("Jess helps")).toBeTruthy();
  });
});
