import { GenerateRequestBody } from "@/types";

export const jsonOutputSchema = {
  name: "GenerateOutput",
  schema: {
    type: "object",
    properties: {
      hooks: { type: "array", items: { type: "string" }, minItems: 3, maxItems: 4 },
      captions: { type: "array", items: { type: "string" }, minItems: 3, maxItems: 4 },
      ctas: { type: "array", items: { type: "string" }, minItems: 3, maxItems: 4 }
    },
    required: ["hooks", "captions", "ctas"],
    additionalProperties: false
  },
  strict: True
} as const;

export const buildPrompt = (body: GenerateRequestBody) => `
You are a world-class social content strategist.
Task: From the transcript below, produce 3-4 *concise* options for each category.
Return ONLY JSON with fields: hooks[], captions[], ctas[].
Constraints: Short-form optimized. Hooks ≤ 12 words. Captions ≤ 220 chars.
Tone/Vibe: ${body.vibe}. Goal: ${body.goal}. Temperature: ${body.temperature}.
Transcript:\n\n${body.transcript}
`;
