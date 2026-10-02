import type { ControllerAction } from "./types";

export interface ControllerAdapter {
  readonly mode: "manual" | "midi";
  confirm(action: ControllerAction): Promise<{ action: ControllerAction; confirmed: true }>;
}

export const manualController: ControllerAdapter = {
  mode: "manual",
  async confirm(action) {
    return { action, confirmed: true };
  },
};
