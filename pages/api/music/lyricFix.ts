// pages/api/music/lyricFix.ts
import type { NextApiRequest, NextApiResponse } from "next";

type ReqBody = { input: string; genre?: string; tone?: string };

function maskKey(key: string | undefined) {
  if (!key) return null;
  return key.length > 10 ? `${key.slice(0, 6)}...${key.slice(-4)}` : "***";
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { input, genre = "afrobeats", tone = "romantic" } = req.body as ReqBody;
  if (!input || typeof input !== "string")
    return res.status(400).json({ error: "Missing input" });

  try {
    const OPENAI_KEY = process.env.OPENAI_API_KEY;
    // Diagnostic: tell if key is present (masked)
    console.log(
      "OPENAI_KEY present:",
      !!OPENAI_KEY,
      "masked:",
      maskKey(OPENAI_KEY),
    );

    if (!OPENAI_KEY) {
      return res
        .status(500)
        .json({ error: "OPENAI_API_KEY not set in environment (server)." });
    }

    const system = `You are a professional songwriter and music producer. Given messy lyrics or a short prompt,
produce cleaned and polished full lyrics (Intro, Verse 1, Chorus, Verse 2, Bridge, Outro if relevant),
and a short NOTES section suggesting tempo and instrumentation for a ${genre} ${tone} track.`;

    const userPrompt = `User input:\n${input}\n\nReturn a clearly labeled output with headings like [Intro], [Verse 1], [Chorus], [Bridge], [Outro], then a NOTES section.`;

    // Use fetch to OpenAI chat completions (stable endpoint). Model below: change if your plan has another model.
    const openaiResp = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini", // change if you need to
          messages: [
            { role: "system", content: system },
            { role: "user", content: userPrompt },
          ],
          max_tokens: 900,
          temperature: 0.8,
        }),
      },
    );

    // If OpenAI returns non-200, include the status + body in our response for debugging
    if (!openaiResp.ok) {
      const txt = await openaiResp.text();
      console.error("OpenAI responded with error:", openaiResp.status, txt);
      return res
        .status(500)
        .json({
          error: "OpenAI API request failed",
          status: openaiResp.status,
          body: txt,
        });
    }

    const data = await openaiResp.json();
    const reply = data?.choices?.[0]?.message?.content ?? null;
    if (!reply)
      return res.status(500).json({ error: "No output from model", raw: data });

    return res.status(200).json({ output: reply });
  } catch (err: any) {
    console.error("lyricFix unexpected error:", err);
    return res.status(500).json({ error: err.message || "Server error" });
  }
}
