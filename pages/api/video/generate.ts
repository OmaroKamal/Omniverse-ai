import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { script } = req.body;

    if (!script || script.trim().length === 0) {
      return res.status(400).json({ error: "Script is required" });
    }

    // The correct Sora API format for all environments
    const soraResponse = await client.responses.create({
      model: "sora-1",
      input: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Create a realistic talking-head video. The presenter must speak EXACTLY this script:\n\n${script}`,
            },
          ],
        },
      ],
    });

    console.log("RAW SORA RESPONSE:", soraResponse);

    // Extract the video URL depending on model output
    const videoUrl = soraResponse?.output?.[0]?.content?.[0]?.url || null;

    if (!videoUrl) {
      return res.status(500).json({
        error:
          "No video URL returned from Sora. Check your credits or model availability.",
      });
    }

    return res.status(200).json({ success: true, videoUrl });
  } catch (error: any) {
    cons