import FormatBadge from "./FormatBadge";

export default function ResultsPanel({ data }: { data: any }) {
  if (!data) return null;
  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <FormatBadge type="primary" label={data.primaryFormat} />
        <FormatBadge type="secondary" label={data.secondaryFormat} />
        <FormatBadge type="backup" label={data.backupFormat} />
      </div>

      <section>
        <h3 className="font-semibold mb-2">Hooks</h3>
        <ul className="list-disc ml-6 space-y-1">{data.hooks?.map((h:string, i:number)=>(<li key={i}>{h}</li>))}</ul>
      </section>

      <section>
        <h3 className="font-semibold mb-2">Captions</h3>
        <ul className="list-disc ml-6 space-y-1">{data.captions?.map((c:string, i:number)=>(<li key={i}>{c}</li>))}</ul>
      </section>

      <section>
        <h3 className="font-semibold mb-2">CTAs</h3>
        <ul className="list-disc ml-6 space-y-1">{data.ctas?.map((c:string, i:number)=>(<li key={i}>{c}</li>))}</ul>
      </section>

      <section>
        <h3 className="font-semibold mb-2">Hashtags</h3>
        <p>{data.hashtags?.join(" ")}</p>
      </section>

      <section>
        <h3 className="font-semibold mb-2">EDL (CMX3600)</h3>
        <pre className="whitespace-pre-wrap text-xs bg-gray-50 p-3 rounded border">{data.edl}</pre>
      </section>

      <section>
        <h3 className="font-semibold mb-2">Premiere XML (stub)</h3>
        <pre className="whitespace-pre-wrap text-xs bg-gray-50 p-3 rounded border">{data.premiereXml}</pre>
      </section>
    </div>
  );
}
