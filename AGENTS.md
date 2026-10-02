# Codex instructions for Sky Beats

Read these files before making product or interface changes:

1. `docs/brand-guidelines.md`
2. `docs/product-content.md`
3. `docs/cooperative-experience.md`
4. `docs/ddj-flx4-mac-setup.md`
5. `docs/build-instructions.md`

Use the supplied images in `assets/images/` as visual references. Do not overwrite them. New generated or exported assets must use clear descriptive filenames and live in an appropriate subfolder under `assets/`.

## Product principles

- Build for a parent and child learning together, not for a teacher and student.
- Make each lesson achievable in 5–10 minutes.
- Alternate meaningful roles between Jess and Grace. When one person uses the controller, the other always has a simple helper role.
- Keep the experience playful but not babyish.
- Prioritise one clear action per screen.
- Treat Jess and Grace as one crew. Never score, rank or compare them.
- Reward shared effort with visual collectibles, not coins, streak pressure or leaderboards.
- Assume both players are complete beginners. The app teaches; neither player is cast as the expert.
- Keep instructions useful beside a physical Pioneer DJ DDJ-FLX4 controller.

## MVP boundaries

- Include Home, Lesson, Challenge, Practice and Rewards.
- Include the ten lessons in `docs/product-content.md`; fully implement the first five before expanding.
- Store progress locally. Do not add accounts, a database, payments, social features or a content-management system.
- Controller actions are self-confirmed in version 1. Keep controller input behind an interface so Web MIDI can be added later.
- Version 1 is a companion to DJ software on the Mac; it does not replace rekordbox or connect directly to the controller.
- Do not reproduce copyrighted songs or bundle commercial audio.

## Design rules

- Follow the colours, typography, illustration style and voice in the brand guide.
- Use generous spacing, large touch targets and short readable lines.
- Treat tablet landscape as the primary layout, then support mobile and desktop.
- Meet WCAG 2.2 AA where practical: keyboard access, visible focus, semantic labels, sufficient contrast, reduced motion and no colour-only status.
- Keep core controls available without relying on animation or audio.

## Engineering rules

- Use TypeScript and small reusable components.
- Keep lesson copy and progression data separate from components.
- Model saved progress with a version number and safe migration/reset behaviour.
- Prefer native browser capabilities and a small dependency footprint.
- Add tests for progression, cooperative role alternation, shared reward unlocks and saved-state recovery.
- Before handing off changes, run the available checks and verify the key flow at tablet and mobile sizes.

## Definition of done

A change is complete when it works through the visible user flow, matches the brand guide, preserves progress correctly, handles empty/error states, passes available checks and includes any necessary content or documentation update.


<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
