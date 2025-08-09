import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import { z } from "zod";
import { buildPrompt, jsonOutputSchema } from "@/lib/prompts";
import { selectFormats } from "@/lib/formatSelector";
import { generateEDL } from "@/lib/edl";
import { generatePremiereXML } from "@/lib/premiereXml";
import { getBrandingBySlug } from "@/lib/tenant";

const requestSchema = z.object({
  transcript: z.string().min(10),
  vibe: z.enum(["cinematic", "humorous", "documentary", "high-energy", "heartfelt"]).optional(),
  temperature: z.number().min(0).max(1).default(0.7),
  goal: z.enum(["awareness", "conversion", "authority", "entertainment"]).optional(),
  account: z.any().optional()
});

const outputSchema = z.object({
  hooks: z.array(z.string()).min(3).max(4),
  captions: z.array(z.string()).min(3).max(4),
  ctas: z.array(z.string()).min(3).max(4)
});

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const parsed = requestSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const body = parsed.data;

  const orgSlug = (req.headers["x-org-slug"] as string) || body?.account?.org;
  const branding = getBrandingBySlug(orgSlug);

  const { primaryFormat, secondaryFormat, backupFormat } = selectFormats(body.account);

  const prompt = buildPrompt({
    transcript: body.transcript,
    vibe: (body.vibe as any) || branding.presets?.vibe || "documentary",
    temperature: body.temperature,
    goal: (body.goal as any) || branding.presets?.goal || "awareness",
    account: body.account
  });

  let jsonOut: any | null = null;
  try {
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: body.temperature,
      response_format: { type: "json_schema", json_schema: jsonOutputSchema }
    });
    const raw = completion.choices[0]?.message?.content || "{}";
    jsonOut = JSON.parse(raw);
  } catch (e) {
    // Fallback: ask for plain JSON without schema (older models)
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [{ role: "user", content: prompt + "\n\nReturn ONLY valid minified JSON." }],
      temperature: body.temperature
    });
    try {
      jsonOut = JSON.parse(completion.choices[0]?.message?.content || "{}");
    } catch {
      jsonOut = { hooks: [], captions: [], ctas: [] };
    }
  }

  const safe = outputSchema.safeParse(jsonOut);
  if (!safe.success) {
    return res.status(500).json({ error: "Model did not return valid JSON", issues: safe.error.flatten() });
  }

  const edl = generateEDL(body.transcript);
  const premiereXml = generatePremiereXML(body.transcript);
  const hashtags = branding.presets?.defaultHashtags?.length ? branding.presets.defaultHashtags : ["#shorts", "#reels", "#tiktok", "#fyp"];

  return res.status(200).json({
    primaryFormat,
    secondaryFormat,
    backupFormat,
    hooks: safe.data.hooks,
    captions: safe.data.captions,
    ctas: safe.data.ctas,
    hashtags,
    edl,
    premiereXml,
    org: branding.slug
  });
}
