import type { NextApiRequest, NextApiResponse } from "next";
import { getBrandingBySlug } from "@/lib/tenant";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query as { slug?: string };
  const branding = getBrandingBySlug(slug);
  res.status(200).json(branding);
}
