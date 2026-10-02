export type Player = "jess" | "grace" | "duo";
export type CrewMember = Exclude<Player, "duo">;
export type MissionPhase = "first-role" | "role-swap" | "crew-moment";

export type ControllerAction =
  | "play"
  | "cue"
  | "crossfader"
  | "channelVolume"
  | "lowEq"
  | "loop"
  | "effect"
  | "tap"
  | "choose";

export type LessonBriefing = {
  what: string;
  why: string;
  together: string;
  showMe?: {
    label: string;
    text: string;
    action: ControllerAction;
  };
};

type LessonStepBase = {
  id: string;
  instruction: string;
  hint?: string;
  action: ControllerAction;
};

export type LessonStep =
  | (LessonStepBase & {
      player: CrewMember;
      phase: "first-role" | "role-swap";
      helperInstruction: string;
    })
  | (LessonStepBase & {
      player: "duo";
      phase: "crew-moment";
    });

export type Lesson = {
  id: string;
  order: number;
  title: string;
  missionName: string;
  durationMinutes: number;
  goal: string;
  briefing: LessonBriefing;
  learn: Array<{ label: "Listen" | "Look" | "Do"; text: string }>;
  steps: LessonStep[];
  successMessage: string;
  rewardId: string;
  rewardName: string;
  accent: string;
  playable: boolean;
};

export type Reward = {
  id: string;
  name: string;
  kind: "patch" | "gear" | "poster";
  owner: "crew";
  requirement: string;
  icon: string;
  color: string;
};

export type PracticeSkill = {
  id: string;
  name: string;
  icon: string;
  prompt: string;
  controllerInstruction: string;
  helperInstruction: string;
  color: "teal" | "purple" | "sky" | "orange" | "red";
};

export type Preferences = {
  sound: boolean;
  reducedMotion: boolean;
};

export type SavedProgress = {
  version: 1;
  completedLessonIds: string[];
  currentLessonId: string;
  currentStep: number;
  unlockedRewardIds: string[];
  preferences: Preferences;
  lastUpdated: string;
};
