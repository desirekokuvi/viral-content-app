import { AccountDeepDive } from "@/types";

// ultra-simple heuristic; expand later with real metrics + trend data
export function selectFormats(acc?: AccountDeepDive) {
  const lowLift = [
    "Did You Know? Micro-History",
    "Quick Tips & Hacks",
    "Reaction/Duet",
    "How It’s Made / Timelapse"
  ];
  const midLift = [
    "Man-on-the-Street",
    "Workplace Mockumentary",
    "POV Skits",
    "Character + Sign-off"
  ];
  const highLift = [
    "Mini-Documentary",
    "Myth-Busting Experiment",
    "Is It Worth It?",
    "Versus Comparisons"
  ];

  const res = acc?.resources;
  const primary = res?.phoneOnly ? lowLift[0] : midLift[1];
  const secondary = res?.solo ? lowLift[1] : midLift[0];
  const backup = (acc?.avgViews ?? 0) < 800 ? lowLift[2] : highLift[2];
  return { primaryFormat: primary, secondaryFormat: secondary, backupFormat: backup };
}
