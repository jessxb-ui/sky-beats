# Sky Beats

Sky Beats is a playful co-learning DJ app for Jess and Grace. It turns short practice sessions with a real DJ controller into shared music missions, visual rewards and a first recorded mix.

**Brand promise:** Sky Beats helps a parent and child learn DJing together through short, playful music missions that turn practice into a shared creative adventure.

## Project pack

- [Brand guidelines](docs/brand-guidelines.md)
- [Product and lesson content](docs/product-content.md)
- [Cooperative experience rules](docs/cooperative-experience.md)
- [DDJ-FLX4 and Mac setup](docs/ddj-flx4-mac-setup.md)
- [Build brief for Codex](docs/build-instructions.md)
- [Codex working instructions](AGENTS.md)
- [Reference images](assets/images/README.md)
- [Source notes and original quick chat](docs/source-notes.md)

## First milestone

Jess and Grace can open the app on an iPad, complete five guided lessons with a Pioneer DJ DDJ-FLX4, swap controller and helper roles, unlock shared crew rewards and prepare for their first short set together.

## MVP at a glance

The first release has five main areas: Home, Lesson, Challenge, Practice and Rewards. The DDJ-FLX4 connects to the Mac and rekordbox handles music; Sky Beats remains a browser companion where the crew confirms each controller action manually. It works without an account or backend, stores shared progress locally and keeps direct controller detection for a later Web MIDI phase.

## Run the prototype

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The prototype includes the full ten-mission flight path, playable guided flows for missions 1–5, practice activities, rewards, settings and local progress recovery.

## GitHub Pages

The repository includes an automated GitHub Pages workflow. Every push to `main` checks the app, creates a static export and publishes the `out` directory. The Pages build supplies the repository base path automatically, so lesson routes and images work from a project-site URL.

Useful checks:

```bash
npm test
npm run typecheck
npm run build
```
