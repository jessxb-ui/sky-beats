import type { CrewMember, Lesson, PracticeSkill, Reward } from "./types";

export const lessons: Lesson[] = [
  {
    id: "beat-basics", order: 1, title: "Beat Basics", missionName: "Find the Beat", durationMinutes: 6,
    goal: "Tap along and hear the repeating 1–2–3–4 pulse.", accent: "#46B6E6", playable: true,
    briefing: {
      what: "The beat is the steady pulse underneath the music—the part your feet naturally tap to.",
      why: "DJs follow the beat so two tracks can move together without sounding messy.",
      together: "Listen for the pulse, count 1–2–3–4, and make beat 1 the strongest count.",
      showMe: { label: "Play and the beat count", text: "Press Play on the DDJ-FLX4, then listen for a steady drum or thump. Count 1–2–3–4 along with it.", action: "play" },
    },
    learn: [
      { label: "Listen", text: "Every dance track has a steady pulse hiding underneath." },
      { label: "Look", text: "Count four beats, then begin again: 1, 2, 3, 4." },
      { label: "Do", text: "Tap with the pulse and make beat 1 your strongest tap." },
    ],
    steps: [
      { id: "jess-count", player: "jess", phase: "first-role", instruction: "Press Play, then tap the repeating 1–2–3–4 pulse.", helperInstruction: "Grace, count 1–2–3–4 aloud and make beat 1 clear.", hint: "Keep the count steady, even when the music changes.", action: "play" },
      { id: "grace-tap", player: "grace", phase: "role-swap", instruction: "Take the controls and tap the same four-beat pulse.", helperInstruction: "Jess, keep the count going and give Grace a ready signal before beat 1.", hint: "Make beat 1 a little stronger.", action: "tap" },
      { id: "duo-land", player: "duo", phase: "crew-moment", instruction: "Count together and land on beat 1 three times.", hint: "One of you calls “ready”; both of you say “one.”", action: "tap" },
    ], successMessage: "Beat found. Your feet knew all along.", rewardId: "beat-finder", rewardName: "Beat Finder patch",
  },
  {
    id: "bars-phrases", order: 2, title: "Bars & Phrases", missionName: "Drop on the 1", durationMinutes: 7,
    goal: "Recognise a new four-beat bar and the start of a musical section.", accent: "#2EC4B6", playable: true,
    briefing: {
      what: "Beats arrive in small groups called bars, and bars join into bigger musical sections called phrases.",
      why: "Starting a new track at the beginning of a musical section makes a mix feel planned and natural.",
      together: "Count the beats, listen for a change, and give the ready signal just before the next beat 1.",
      showMe: { label: "Play on beat 1", text: "Rest a finger over Play. The helper counts and says “ready” just before the next strong 1; then the controller player presses.", action: "play" },
    },
    learn: [
      { label: "Listen", text: "Beats travel in groups. Four beats make one small musical sentence." },
      { label: "Look", text: "Beat 1 often feels like a fresh start — listen for a change or new sound." },
      { label: "Do", text: "Count 1–2–3–4 and point up when the next 1 arrives." },
    ],
    steps: [
      { id: "grace-count", player: "grace", phase: "first-role", instruction: "Press Play and listen for the next fresh musical section.", helperInstruction: "Jess, count four beats and point up when the next beat 1 arrives.", hint: "A new drum or melody can signal the start.", action: "play" },
      { id: "jess-play", player: "jess", phase: "role-swap", instruction: "Press Play on the next beat 1.", helperInstruction: "Grace, count the bar and give Jess the ready signal just before the 1.", hint: "Rest a finger over Play and wait for Grace’s signal.", action: "play" },
      { id: "duo-phrase", player: "duo", phase: "crew-moment", instruction: "Choose the next phrase together, call “ready,” and start on its beat 1.", action: "play" },
    ], successMessage: "Clean landing. Right on the 1.", rewardId: "flight-sticker", rewardName: "Flight-path sticker",
  },
  {
    id: "cue-it", order: 3, title: "Cue It", missionName: "Ready, Set, Cue", durationMinutes: 7,
    goal: "Use Cue and Play, then set a simple cue point.", accent: "#7A4DFF", playable: true,
    briefing: {
      what: "A cue point is a saved starting place inside a track.",
      why: "It lets a DJ prepare the exact moment they want before the audience hears the track.",
      together: "Find a clear first beat, save it with Cue, move away, and return to it.",
      showMe: { label: "Cue button", text: "Find the Cue button beside Play on the active deck. It saves and returns to the starting place you choose.", action: "cue" },
    },
    learn: [
      { label: "Listen", text: "Cue lets you preview or return to one exact starting point." },
      { label: "Look", text: "Find the orange Cue button beside Play on the active deck." },
      { label: "Do", text: "Pause on a clear beat, set Cue, then tap Cue to return." },
    ],
    steps: [
      { id: "jess-try", player: "jess", phase: "first-role", instruction: "Try Cue, then Play, and notice what each button does.", helperInstruction: "Grace, listen for what changes and point to the button Jess should try next.", hint: "Cue holds the starting point; Play keeps the track moving.", action: "cue" },
      { id: "grace-set", player: "grace", phase: "role-swap", instruction: "Set a cue point, move away, then return to it.", helperInstruction: "Jess, give the ready signal before Grace taps Cue to return.", action: "cue" },
      { id: "duo-prepare", player: "duo", phase: "crew-moment", instruction: "Prepare one track together without starting it.", hint: "Point to Cue, check the deck together, then leave Play alone.", action: "cue" },
    ], successMessage: "Track parked and ready.", rewardId: "cue-master", rewardName: "Cue Master patch",
  },
  {
    id: "match-energy", order: 4, title: "Match the Energy", missionName: "Pick the Next Track", durationMinutes: 8,
    goal: "Choose a next track with a similar or deliberate energy level.", accent: "#FFB66B", playable: true,
    briefing: {
      what: "Energy describes how calm, busy, gentle or exciting a track feels.",
      why: "Track order helps shape how the music journey rises, rests and builds again.",
      together: "Listen to two options and agree whether the next track should lift, hold or settle the mood. There is no single correct answer.",
      showMe: { label: "Two track choices", text: "Preview two tracks in rekordbox. Listen for speed, drums and how busy each one feels, then agree on the mood you want next.", action: "choose" },
    },
    learn: [
      { label: "Listen", text: "Some tracks lift the room; others give everyone space to breathe." },
      { label: "Look", text: "Compare speed, drums and how busy each track feels." },
      { label: "Do", text: "Choose whether your next track should rise, hold or settle." },
    ],
    steps: [
      { id: "grace-pick", player: "grace", phase: "first-role", instruction: "Choose the next track from two options.", helperInstruction: "Jess, listen to both previews and name one difference you hear.", hint: "There is no wrong mood — make a clear choice.", action: "choose" },
      { id: "jess-pick", player: "jess", phase: "role-swap", instruction: "Choose whether the next track should lift, hold, or settle the energy.", helperInstruction: "Grace, listen again and say what supports Jess’s choice.", action: "choose" },
      { id: "duo-journey", player: "duo", phase: "crew-moment", instruction: "Agree on a three-track mini journey together.", hint: "Try: warm-up, lift-off, big finish.", action: "choose" },
    ], successMessage: "Good call. The dance floor stays with you.", rewardId: "purple-headphones", rewardName: "Purple headphones",
  },
  {
    id: "first-transition", order: 5, title: "First Transition", missionName: "Pass the Sound", durationMinutes: 9,
    goal: "Blend two tracks using channel volume or the crossfader.", accent: "#E53935", playable: true,
    briefing: {
      what: "A transition is the moment one track hands the music over to another.",
      why: "A smooth handover keeps the music flowing instead of stopping between songs.",
      together: "One person counts eight beats while the other slowly moves the sound from deck A to deck B, then swap roles.",
      showMe: { label: "Channel faders", text: "Find the two tall channel faders in the middle of the DDJ-FLX4. They control how much of deck A and deck B you hear.", action: "channelVolume" },
    },
    learn: [
      { label: "Listen", text: "A transition passes the sound from one deck to the other." },
      { label: "Look", text: "Start with deck A loud and deck B quiet." },
      { label: "Do", text: "Over eight beats, slowly bring B in while A moves out." },
    ],
    steps: [
      { id: "jess-blend", player: "jess", phase: "first-role", instruction: "Start deck A, then slowly bring deck B in over eight beats.", helperInstruction: "Grace, point to the channel fader and count eight steady beats.", hint: "Smooth hands. Let both tracks share the middle.", action: "channelVolume" },
      { id: "grace-blend", player: "grace", phase: "role-swap", instruction: "Make the return flight, bringing deck A back in slowly.", helperInstruction: "Jess, count eight beats and give the ready signal before Grace moves the fader.", hint: "A wobbly mix is useful practice. Reset whenever you like.", action: "channelVolume" },
      { id: "duo-land", player: "duo", phase: "crew-moment", instruction: "Choose the next beat 1 together and land the sound on deck A.", hint: "One person points; the other moves. Decide the jobs together.", action: "crossfader" },
    ], successMessage: "Two tracks, one smooth flight.", rewardId: "transition-ace", rewardName: "Transition Ace patch",
  },
  { id: "bass-swap", order: 6, title: "Bass Swap", missionName: "Trade the Low End", durationMinutes: 8, goal: "Avoid clashing bass by swapping low EQ between tracks.", briefing: { what: "The low EQ controls the deep bass part of a track.", why: "DJs make space for one bassline at a time so the mix does not sound crowded.", together: "Point to both LOW controls, listen to each bassline, then trade them on beat 1.", showMe: { label: "LOW EQ knobs", text: "Find the LOW knob in each channel strip. Turn slowly and return it to the centre when you reset.", action: "lowEq" } }, learn: [], steps: [], successMessage: "Bass swapped. No sonic stampede.", rewardId: "bass-pilot", rewardName: "Bass Pilot patch", accent: "#46B6E6", playable: false },
  { id: "loop-it", order: 7, title: "Loop It", missionName: "Catch and Release", durationMinutes: 7, goal: "Set, hear and release a basic loop.", briefing: { what: "A loop repeats a short piece of a track again and again.", why: "DJs use loops to make extra time or hold onto a useful part of the music.", together: "Choose a clear beat, start a short loop, listen to it repeat, then release it on beat 1.", showMe: { label: "Loop controls", text: "The loop controls catch a short section and release it when you are ready to continue.", action: "loop" } }, learn: [], steps: [], successMessage: "Loop caught. Loop released.", rewardId: "loop-legend", rewardName: "Loop Legend patch", accent: "#2EC4B6", playable: false },
  { id: "effects-lab", order: 8, title: "Effects Lab", missionName: "Tasteful Chaos", durationMinutes: 7, goal: "Try one effect and learn that less is usually more.", briefing: { what: "An effect changes the sound for a moment, like adding an echo.", why: "DJs use effects to add interest or help a transition, without hiding the music.", together: "Choose one effect, try a big version and a small version, then agree which fits the track.", showMe: { label: "Effect controls", text: "Choose an effect, move its amount slowly, and switch it off to hear the clean track again.", action: "effect" } }, learn: [], steps: [], successMessage: "Science confirms: that was spicy.", rewardId: "lightning-sticker", rewardName: "Lightning controller sticker", accent: "#7A4DFF", playable: false },
  { id: "build-a-set", order: 9, title: "Build a Set", missionName: "Plan the Flight", durationMinutes: 10, goal: "Arrange 4–6 tracks into a short musical journey.", briefing: { what: "A DJ set is a group of tracks played in an order that creates a musical journey.", why: "Planning the order helps the mood rise, rest and finish in a way that feels intentional.", together: "Choose 4–6 tracks, agree on their order, and decide who takes each transition.", showMe: { label: "Track list", text: "Use the track list in rekordbox to compare your choices before either person starts the music.", action: "choose" } }, learn: [], steps: [], successMessage: "Flight plan locked.", rewardId: "duo-badge", rewardName: "Duo name badge", accent: "#FFB66B", playable: false },
  { id: "first-gig", order: 10, title: "First Gig", missionName: "Play It Together", durationMinutes: 15, goal: "Perform a 10–15 minute set together.", briefing: { what: "A gig is a complete music journey that DJs share with listeners from beginning to end.", why: "It brings track choices, cue points and transitions together into one flowing set.", together: "Take turns on the controls, keep helping with counts and ready signals, and finish the set together.", showMe: { label: "Your flight plan", text: "Keep the planned track order nearby, then point to the next move whenever your partner is on the controls.", action: "choose" } }, learn: [], steps: [], successMessage: "First gig complete. You made that together.", rewardId: "first-gig", rewardName: "First Gig patch", accent: "#E53935", playable: false },
];

export const rewards: Reward[] = [
  { id: "beat-finder", name: "Beat Finder", kind: "patch", owner: "crew", requirement: "Complete this crew mission: Beat Basics", icon: "wave", color: "#46B6E6" },
  { id: "flight-sticker", name: "Flight Path", kind: "gear", owner: "crew", requirement: "Complete this crew mission: Bars & Phrases", icon: "plane", color: "#2EC4B6" },
  { id: "cue-master", name: "Cue Master", kind: "patch", owner: "crew", requirement: "Complete this crew mission: Cue It", icon: "disc", color: "#7A4DFF" },
  { id: "purple-headphones", name: "Purple Headphones", kind: "gear", owner: "crew", requirement: "Complete this crew mission: Match the Energy", icon: "headphones", color: "#7A4DFF" },
  { id: "transition-ace", name: "Transition Ace", kind: "patch", owner: "crew", requirement: "Complete this crew mission: First Transition", icon: "sliders", color: "#E53935" },
  { id: "bass-pilot", name: "Bass Pilot", kind: "patch", owner: "crew", requirement: "Complete this crew mission: Bass Swap", icon: "speaker", color: "#FFB66B" },
  { id: "loop-legend", name: "Loop Legend", kind: "patch", owner: "crew", requirement: "Complete this crew mission: Loop It", icon: "loop", color: "#2EC4B6" },
  { id: "lightning-sticker", name: "Tasteful Chaos", kind: "gear", owner: "crew", requirement: "Complete this crew mission: Effects Lab", icon: "bolt", color: "#7A4DFF" },
  { id: "duo-badge", name: "Duo Name Badge", kind: "gear", owner: "crew", requirement: "Complete this crew mission: Build a Set", icon: "star", color: "#46B6E6" },
  { id: "first-gig", name: "First Gig", kind: "poster", owner: "crew", requirement: "Complete this crew mission: First Gig", icon: "mic", color: "#E53935" },
];

export const practiceSkills: PracticeSkill[] = [
  { id: "beat", name: "Beat counting", icon: "1234", prompt: "Find the four-beat pulse, then swap jobs.", controllerInstruction: "Tap the repeating pulse and make beat 1 clear.", helperInstruction: "Count 1–2–3–4 aloud and give the ready signal before beat 1.", color: "teal" },
  { id: "cue", name: "Cue points", icon: "CUE", prompt: "Park a track at one clear starting point.", controllerInstruction: "Set a cue, move away, then return to it without pressing Play.", helperInstruction: "Point to Cue and listen for the same starting sound to return.", color: "purple" },
  { id: "phrases", name: "Phrase spotting", icon: "♪", prompt: "Spot the start of a new musical section together.", controllerInstruction: "Rest a finger over Play and start on the next phrase.", helperInstruction: "Count the bar and call “ready” just before the new section begins.", color: "sky" },
  { id: "eq", name: "EQ practice", icon: "EQ", prompt: "Hear what the low EQ changes, then swap jobs.", controllerInstruction: "Turn the low EQ down, listen, then return it to 12 o’clock.", helperInstruction: "Point to LOW and describe what disappears and returns.", color: "orange" },
  { id: "transitions", name: "Transitions", icon: "↗", prompt: "Pass the sound from one deck to the other.", controllerInstruction: "Move the channel fader slowly over eight steady beats.", helperInstruction: "Count eight beats and give the ready signal before the move begins.", color: "red" },
  { id: "loops", name: "Loops", icon: "↻", prompt: "Catch and release one short loop together.", controllerInstruction: "Turn the loop on, listen, then release it on beat 1.", helperInstruction: "Count towards beat 1 and signal when it is time to release.", color: "teal" },
  { id: "effects", name: "Effects", icon: "✦", prompt: "Try one silly effect and one subtle version.", controllerInstruction: "Move the effect amount slowly, then turn the effect off.", helperInstruction: "Listen and give the clean-off signal before the sound gets too busy.", color: "purple" },
  { id: "tracks", name: "Track selection", icon: "♫", prompt: "Build a tiny warm-up, lift-off, and finish.", controllerInstruction: "Choose one track for the next part of the mini journey.", helperInstruction: "Listen to the options and name one energy difference you hear.", color: "sky" },
];

export function getHelper(player: CrewMember): CrewMember {
  return player === "jess" ? "grace" : "jess";
}

export function getLesson(id: string) {
  return lessons.find((lesson) => lesson.id === id);
}

export function getNextLesson(completed: string[]) {
  return lessons.find((lesson) => lesson.playable && !completed.includes(lesson.id)) ?? lessons[4];
}
