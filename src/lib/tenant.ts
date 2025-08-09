import { OrgBranding } from "@/types";

// In-memory tenant registry for MVP; move to DB later.
const TENANTS: OrgBranding[] = [
  {
    slug: "msa-ford",
    appName: "MSA Content Lab",
    logoUrl: "/logo.svg",
    theme: { primary: "#00205B", secondary: "#00A3E0", bg: "#ffffff", text: "#111" },
    presets: { vibe: "documentary", goal: "awareness", defaultHashtags: ["#Ford", "#FraserValley"] }
  },
  {
    slug: "vw-richmond",
    appName: "VW Viral Hub",
    logoUrl: "/logo.svg",
    theme: { primary: "#001E50", secondary: "#2A7DE1", bg: "#ffffff", text: "#111" },
    presets: { vibe: "humorous", goal: "awareness", defaultHashtags: ["#Volkswagen", "#Richmond"] }
  }
];

export function getBrandingBySlug(slug?: string): OrgBranding {
  if (!slug) return { slug: "default", appName: process.env.NEXT_PUBLIC_APP_NAME || "Viral Content App" };
  return TENANTS.find(t => t.slug === slug) || { slug, appName: slug };
}
