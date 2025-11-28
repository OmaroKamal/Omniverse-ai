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

    const { script, scene, language, style, faceImageBase64 } = req.body;

    if (!script || !scene) {
      return res
        .status(400)
        .json({ error: "Missing script or scene description" });
    }

    // ✅ Step 1: Use OpenAI to create a PROFESSIONAL VIDEO PROMPT
    const aiPrompt = `
You are a professional film director AI.

Video Style: ${style}
Language: ${language}

Scene:
${scene}

Dialogue:
${script}

Create a realistic, full-body cinematic video description suitable for AI video generation.
Include:
- Camera movement
- Lighting
- Character expressions
- Environment details
- Natural human actions
`;

    const completion = await client.responses.create({
      model: "gpt-4.1-mini",
      input: aiPrompt,
    });

    const refinedPrompt =
      completion.output_text || "Professional cinematic video scene";

    // ✅ Step 2: TEMPORARY VIDEO ENGINE MOCK (Until Sora/Runway is connected)
    const fakeVideoUrl = "https://www.w3schools.com/html/mov_bbb.mp4"; // placeholder demo video

    // ✅ Step 3: Return clean response
    return res.status(200).json({
      message: "Video job created successfully",
      refinedPrompt,
      videoUrl: fakeVideoUrl,
      note: "This is a placeholder video. Real AI video engine will replace this.",
    });
  } catch (err: any) {
    console.error("VIDEO API ERROR:", err);
    return res.status(500).json({
      error: "Video generation failed",
      details: err.message,
    });
  }
}
