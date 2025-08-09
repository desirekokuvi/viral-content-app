import { useEffect, useState } from "react";
import UploadPanel from "@/components/UploadPanel";
import ResultsPanel from "@/components/ResultsPanel";

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [branding, setBranding] = useState<any>({ appName: process.env.NEXT_PUBLIC_APP_NAME || "Viral Content App" });

  // read ?org=slug to white‑label per tenant
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const org = params.get("org");
    if (org) fetch(`/api/branding/${org}`).then(r=>r.json()).then(setBranding).catch(()=>{});
  }, []);

  async function handleGenerate(payload: any) {
    setLoading(true); setError(null);
    try {
      const res = await fetch("/api/generate", { method: "POST", headers: { "Content-Type": "application/json", "x-org-slug": branding?.slug || "" }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error(await res.text());
      const json = await res.json();
      setData(json);
    } catch (e:any) { setError(e.message); } finally { setLoading(false); }
  }

  return (
    <main className="min-h-screen p-6 max-w-5xl mx-auto" style={{
      background: branding?.theme?.bg,
      color: branding?.theme?.text
    }}>
      <header className="flex items-center gap-3 mb-6">
        <img src={branding?.logoUrl || "/logo.svg"} className="w-8 h-8" />
        <h1 className="text-2xl font-bold">{branding?.appName}</h1>
        <div className="ml-auto text-xs opacity-60">Org: {branding?.slug || "default"}</div>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        <section>
          <h2 className="text-lg font-semibold mb-2">Inputs</h2>
          <UploadPanel onSubmit={handleGenerate} />
        </section>
        <section>
          <h2 className="text-lg font-semibold mb-2">Outputs</h2>
          {loading && <p>Generating…</p>}
          {error && <p className="text-red-600">{error}</p>}
          <ResultsPanel data={data} />
        </section>
      </div>

      <footer className="mt-10 text-xs opacity-70">
        <p>Tip: Add [mm:ss] markers to your transcript for instant EDL cuts.</p>
      </footer>
    </main>
  );
}
