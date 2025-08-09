export function generatePremiereXML(transcript: string) {
  // Minimal stub; replace with full fcpxml/premiere schema later
  const safe = transcript.substring(0, 200).replace(/[<>]/g, "");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<Sequence name="AutoCut">\n  <Note>${safe}</Note>\n</Sequence>`;
}
