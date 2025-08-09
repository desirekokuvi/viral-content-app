export type Vibe = "cinematic" | "humorous" | "documentary" | "high-energy" | "heartfelt";

export interface AccountDeepDive {
  platform: "instagram" | "youtube" | "tiktok" | "linkedin";
  profileUrl?: string;
  avgViews?: number; // typical range 500–2000
  topVideos?: { url: string; views: number; transcript?: string; hookText?: string }[];
  resources?: { solo?: boolean; cameraOp?: boolean; phoneOnly?: boolean };
}

export interface GenerateRequestBody {
  transcript: string;
  vibe: Vibe;
  temperature: number; // 0–1
  goal: "awareness" | "conversion" | "authority" | "entertainment";
  account?: AccountDeepDive;
}

export interface GenerateResponse {
  primaryFormat: string;
  secondaryFormat: string;
  backupFormat: string;
  hooks: string[];
  captions: string[];
  ctas: string[];
  hashtags: string[];
  edl?: string; // CMX3600 text
  premiereXml?: string; // fcpxml-like stub for Premiere
}

export interface OrgBranding {
  slug: string;            // e.g., "msa-ford" | "vw-richmond"
  appName: string;         // e.g., "MSA Content Lab"
  logoUrl?: string;
  theme?: {
    primary?: string;
    secondary?: string;
    bg?: string;
    text?: string;
  };
  presets?: {
    vibe?: Vibe;
    goal?: "awareness"|"conversion"|"authority"|"entertainment";
    defaultHashtags?: string[];
  };
}
