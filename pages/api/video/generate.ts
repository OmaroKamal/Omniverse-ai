import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { script } = req.body;

    if (!script) {
      return res.status(400).json({ error: "Missing script" });
    }

    const response = await client.videos.generate({
      model: "sora-1",
      prompt: `Create a realistic talking-head video speaking: ${script}`,
    });

    const videoUrl =
      response?.output?.[0]?.url ||
      response?.video_url ||
      response?.url ||
      null;

    if (!videoUrl) {
      return res.status(500).json({
        error: "Video URL missing — check Sora model availability",
      });
    }

    return res.status(200).json({ videoUrl });
  } catch (err: any) {
    console.error("API ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
}
