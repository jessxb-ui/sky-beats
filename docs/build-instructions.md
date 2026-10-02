# Sky Beats build instructions for Codex

## Outcome

Build a polished, responsive MVP that Jess and Grace can use beside a Pioneer DJ DDJ-FLX4 connected to a Mac. They should be able to complete the first five guided lessons as one team, change controller/helper roles, save progress locally, unlock shared rewards and see the full ten-mission journey.

The app should look and feel real before it becomes technically ambitious. Manual “done” confirmation is acceptable for controller steps in version 1.

## Recommended implementation

- Next.js with TypeScript and the App Router
- React components with CSS Modules, Tailwind CSS or another small, consistent styling approach
- Browser local storage behind a typed persistence adapter
- Static lesson and reward data stored separately from interface components
- Local or openly licensed demonstration sounds only
- No backend, login or external account required

If an existing codebase later establishes different conventions, follow the codebase rather than replacing it solely to match this recommendation.

## Suggested routes

| Route | Screen | Purpose |
|---|---|---|
| `/` | Home | Duo, current mission, progress path and quick actions |
| `/lessons/[lessonId]` | Lesson | Explain one concept in a short sequence |
| `/lessons/[lessonId]/challenge` | Challenge | Guide turn-based controller practice |
| `/practice` | Practice | Choose and repeat a skill |
| `/rewards` | Rewards | View patches, gear and gig posters |
| `/settings` | Settings | Sound, motion, progress reset and device information |

## Core data model

Keep content data-driven. A lesson should include:

```ts
type Lesson = {
  id: string;
  order: number;
  title: string;
  missionName: string;
  durationMinutes: number;
  goal: string;
  briefing: {
    what: string;
    why: string;
    together: string;
    showMe?: {
      label: string;
      text: string;
      action: ControllerAction;
    };
  };
  steps: Array<{
    id: string;
    player: "jess" | "grace" | "duo";
    instruction: string;
    helperInstruction?: string;
    hint?: string;
  }>;
  successMessage: string;
  rewardId: string;
};
```

The three briefing strings are required for every mission, including missions that are not playable yet. The interface must show this short beginner briefing before Listen / Look / Do and before the controller challenge. “Show me” is optional help; “Got it — let’s try” is the clear action that opens the lesson content.

Saved state should include a schema version, completed lesson IDs, current lesson and step, unlocked reward IDs, accessibility preferences and the last-updated time. Validate stored data and recover to safe defaults if it is corrupt.

## Component plan

- `AppShell` — responsive frame, navigation and background motifs
- `Logo` — full and compact brand treatments
- `DuoHeader` — Jess and Grace avatars and shared status
- `MissionCard` — title, duration, reward and primary action
- `FlightPath` — accessible lesson progress list
- `TurnBanner` — current controller role, helper role and instruction context
- `LessonStep` — one focused teaching unit
- `ControllerPrompt` — physical control name, illustration and confirmation
- `PrimaryAction` — consistent large action button
- `RewardPatch` — earned/locked state and requirement
- `Celebration` — reduced-motion-aware completion feedback
- `PersistedStateProvider` — save/load/reset boundary
- `ControllerAdapter` — manual input now, Web MIDI later

Do not make every component globally generic. Extract a component when it represents a repeated product concept or reduces meaningful complexity.

## Primary user flow

1. Home shows Jess and Grace, mission 1 and a ten-stop flight path.
2. “Take off” opens the Beat Basics lesson.
3. A short What / Why / Together briefing introduces the idea, with optional “Show me” help.
4. “Got it — let’s try” opens the Listen / Look / Do teaching stage.
5. “Try it” opens the challenge.
6. Jess and Grace change roles. The app shows both the controller job and the partner’s helper job.
7. Each controller action can be confirmed manually.
8. “Land the mix” completes the lesson.
9. The Beat Finder patch unlocks and progress saves on the device.
10. Returning Home shows mission 2 as next and retains mission 1 completion after refresh.

## Responsive behaviour

- **Primary:** iPad/tablet landscape beside the controller.
- **Secondary:** phone portrait for reviewing lessons and rewards.
- **Supported:** desktop browser.

On tablet, keep the active instruction and primary action above the fold. On phone, stack visual content before controls only when it does not hide the current action. Avoid hover-only interactions.

## Accessibility

- Use semantic landmarks and logical heading order.
- Make the complete flow keyboard operable.
- Provide visible focus and touch targets of at least 44 × 44 px.
- Add meaningful alternative text to instructional imagery; mark decorative motifs as decorative.
- Meet WCAG 2.2 AA contrast for text and controls.
- Respect `prefers-reduced-motion` and provide a persistent motion preference.
- Provide text/cue alternatives for audio and animation.
- Do not encode whose turn it is using colour alone.
- Keep timers optional and avoid time pressure.

## Audio and controller architecture

Version 1 is a companion guide while the DDJ-FLX4 controls rekordbox or another supported DJ application on the Mac. Sky Beats uses manual confirmation and does not claim the controller or manage the music library. Still define a small controller interface with semantic actions such as `play`, `cue`, `crossfader`, `lowEq`, `loop` and `effect`. UI lessons should respond to semantic actions, not hardware-specific MIDI numbers.

Version 2 may add a Web MIDI adapter for supported browsers and the DDJ-FLX4. Treat capability detection, permission, mapping/calibration and manual fallback as first-class states. Never block a lesson because MIDI is unavailable.

Keep demonstration audio short and licensed for distribution. Do not include commercial tracks. Respect autoplay restrictions and provide obvious volume controls.

## Build phases

### Phase 1 — Foundation

- Create the app shell, design tokens, fonts and responsive navigation.
- Add typed lesson/reward data and validated local persistence.
- Build Home with the duo, current mission and flight path.

### Phase 2 — Playable learning loop

- Build reusable Lesson and Challenge flows.
- Implement lessons 1–5 with manual controller confirmation.
- Add controller/helper role switching, no-penalty retry, “help each other”, resume and shared completion states.

### Phase 3 — Practice and rewards

- Build the Practice skill grid and repeatable prompts.
- Build patches, locked requirements and unlock celebrations.
- Add progress reset, sound and reduced-motion settings.

### Phase 4 — Polish and verification

- Verify tablet, phone and desktop layouts.
- Test persistence recovery, lesson progression and cooperative role alternation.
- Audit keyboard flow, focus, contrast, labels and reduced motion.
- Remove placeholder copy, dead controls and unlicensed assets.

### Later, not MVP

- Web MIDI hardware detection
- Set Builder and generated gig posters
- Local recording tools
- Additional avatar customisation
- Accounts, synchronisation or family profiles

## MVP acceptance criteria

- Home, Lesson, Challenge, Practice and Rewards are navigable and visually complete.
- All ten lessons appear on the journey; lessons 1–5 have playable guided content.
- Every mission contains non-empty What it is, Why DJs use it and What we’ll try together briefing content.
- The beginner briefing appears before Listen / Look / Do and before the controller challenge.
- A lesson takes roughly 5–10 minutes and presents one action at a time.
- Jess and Grace both receive meaningful controller and helper roles.
- No screen scores, grades, ranks or compares either player.
- A mission can be retried or paused without losing progress or rewards.
- Completion is based on both players trying the roles, not measured accuracy or speed.
- Completing a lesson unlocks one shared crew reward and persists after refresh.
- The app works when storage is unavailable or contains invalid data.
- Manual controller confirmation works without MIDI or connected services.
- Tablet landscape is polished; phone and desktop remain usable.
- The experience supports keyboard use, reduced motion and labelled controls.
- No account, backend or copyrighted commercial music is required.

## Visual QA checklist

- Compare overall colour, warmth and character balance with the supplied brand board.
- Confirm body text uses Aviator Navy on a light surface.
- Confirm the main action is obvious within a quick glance.
- Check that decorative clouds, paths and notes cannot be mistaken for controls.
- Check long labels, 200% zoom and both player names.
- Verify locked, active, complete, error and offline/local-save states.
- Capture screenshots at tablet landscape and phone portrait sizes for review.

## Suggested first Codex request

> Read `AGENTS.md` and all files in `docs/`. Build Phase 1 of the Sky Beats MVP in this folder. Use the supplied reference images without modifying them. Implement the responsive shell, brand tokens, typed lesson data, safe local progress storage and the Home screen. Verify the result at tablet landscape and phone portrait sizes, then report what is complete and what remains for Phase 2.
