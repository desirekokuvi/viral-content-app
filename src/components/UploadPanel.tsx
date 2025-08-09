import { useState } from "react";

export default function UploadPanel({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [transcript, setTranscript] = useState("");
  const [vibe, setVibe] = useState("documentary");
  const [temperature, setTemperature] = useState(0.7);
  const [goal, setGoal] = useState("awareness");
  const [avgViews, setAvgViews] = useState<number | undefined>(undefined);
  const [phoneOnly, setPhoneOnly] = useState(true);

  return (
    <div className="space-y-4">
      <textarea
        className="w-full h-40 p-3 border rounded"
        placeholder="Paste transcript here (add [mm:ss] markers for auto-EDL)"
        value={transcript}
        onChange={e => setTranscript(e.target.value)}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <select className="border p-2 rounded" value={vibe} onChange={e => setVibe(e.target.value)}>
          <option value="documentary">Documentary</option>
          <option value="humorous">Humorous</option>
          <option value="cinematic">Cinematic</option>
          <option value="high-energy">High-Energy</option>
          <option value="heartfelt">Heartfelt</option>
        </select>
        <select className="border p-2 rounded" value={goal} onChange={e => setGoal(e.target.value)}>
          <option value="awareness">Awareness</option>
          <option value="conversion">Conversion</option>
          <option value="authority">Authority</option>
          <option value="entertainment">Entertainment</option>
        </select>
        <input
          type="number" min={0} max={1} step={0.1}
          className="border p-2 rounded"
          value={temperature}
          onChange={e => setTemperature(parseFloat(e.target.value))}
        />
        <input
          type="number" placeholder="Avg views (optional)"
          className="border p-2 rounded"
          value={avgViews ?? ""}
          onChange={e => setAvgViews(e.target.value ? parseInt(e.target.value, 10) : undefined)}
        />
      </div>

      <label className="inline-flex items-center space-x-2">
        <input type="checkbox" checked={phoneOnly} onChange={e => setPhoneOnly(e.target.checked)} />
        <span>Phone-only resources</span>
      </label>

      <button
        onClick={() => onSubmit({
          transcript,
          vibe,
          temperature,
          goal,
          account: {
            platform: "instagram",
            avgViews: avgViews,
            resources: { phoneOnly, solo: true }
          }
        })}
        className="px-4 py-2 bg-black text-white rounded"
      >Generate</button>
    </div>
  );
}
