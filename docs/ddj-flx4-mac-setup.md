# DDJ-FLX4 and Mac setup

## MVP operating model

The Pioneer DJ DDJ-FLX4 connects to the Mac and controls the supported DJ software. Sky Beats runs as a companion guide in a browser. In the first version, Sky Beats tells Jess and Grace what to try on the controller, and they tap Done after trying it.

This separation keeps the first build reliable:

- the DJ application owns music playback and the controller connection;
- Sky Beats owns lessons, role prompts, progress and rewards;
- no direct browser-to-controller connection is required;
- the lesson still works if controller detection is unavailable.

## Simple session setup

1. Install a DDJ-FLX4-compatible DJ application on the Mac. The project defaults to rekordbox for lesson wording unless the owner chooses another application.
2. Connect the DDJ-FLX4 to the Mac using the appropriate USB cable. For a USB-C Mac, AlphaTheta recommends the cable supplied with the controller.
3. Connect headphones and, if used, powered speakers. The Mac speaker can be used with the DJ application’s PC Master Out option for a very simple practice setup.
4. Open the DJ application and confirm that Play, Cue and headphone preview work.
5. Open Sky Beats in the browser. Use it beside the DJ application, in split view, or on a second screen.
6. Load suitable practice tracks in the DJ application. Sky Beats does not supply or copy commercial music.
7. Start Mission 1 and manually confirm each action after the crew has tried it.

An adult should handle installation, cables, audio routing, firmware and account-connected music services. Start with a comfortable listening volume.

## Product wording

Sky Beats should say:

- “On your DDJ-FLX4: press Play.”
- “Try it on the controller, then tap Done.”
- “Can’t find it? Show me the control.”
- “Controller checking is off—manual mode is ready.”

Sky Beats should not imply that it loaded the track, heard the mix or verified a control movement in manual mode.

## Future controller detection

Direct detection is a later experiment, not an MVP dependency. If Web MIDI or another integration is added:

- keep manual mode permanently available;
- ask permission only when the user chooses controller detection;
- map hardware messages to semantic actions rather than lesson-specific code;
- provide a guided calibration/check screen;
- never compete with the active DJ application for the device;
- use detected actions for confirmation and hints, not performance scoring;
- test the exact supported browser, macOS, firmware and DJ-software combination.

## Official references

- [DDJ-FLX4 support hub](https://support.alphatheta.com/en-us/products/12077079532697)
- [DDJ-FLX4 instruction manual](https://support.alphatheta.com/en-us/articles/12267724407961)
- [rekordbox for Mac/Windows support](https://support.alphatheta.com/en-us/articles/12293335443353)
- [What else is needed to start DJing](https://support.alphatheta.com/en-US/articles/12185682247961?product=12077079532697)
- [DDJ-FLX4 MIDI-compatible software guidance](https://support.alphatheta.com/en-US/articles/12294087060377?product=12077079532697)

Check these official pages again before publishing hardware-specific setup instructions, because supported software, operating systems and firmware change over time.

