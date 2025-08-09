// Very light CMX3600 EDL generator from inline timecodes like [mm:ss] in transcript
export function generateEDL(transcript: string) {
  // find lines with [mm:ss] markers and convert to timecode events
  const lines = transcript.split(/\n+/);
  const events: { id: number; tc: string; note: string }[] = [];
  let id = 1;
  for (const line of lines) {
    const m = line.match(/\[(\d{1,2}):(\d{2})\]/);
    if (m) {
      const mm = m[1].padStart(2, "0");
      const ss = m[2];
      const tc = `00:${mm}:${ss}:00`;
      const note = line.replace(/\[[^\]]+\]\s*/, "").slice(0, 48);
      events.push({ id: id++, tc, note });
    }
  }

  if (!events.length) return ";; No timecodes found — add [mm:ss] markers to transcript";

  const header = `TITLE: AUTO-GENERATED\nFCM: NON-DROP FRAME`;
  const body = events
    .map(e => `${String(e.id).padStart(3, "0")}  AX       V     C        ${e.tc} ${e.tc} ${e.tc} ${e.tc}\n* ${e.note}`)
    .join("\n\n");
  return `${header}\n\n${body}\n`;
}
