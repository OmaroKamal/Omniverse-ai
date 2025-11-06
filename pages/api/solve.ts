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
    const { question } = req.body;

    if (!question || question.trim().length === 0) {
      return res.status(400).json({ error: "No question provided" });
    }

    console.log("Raw OCR Input:", question);

    // Step 1: Clean the OCR text
    const cleanResp = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that cleans messy OCR text. Only return the corrected text, nothing else.",
        },
        {
          role: "user",
          content: question,
        },
      ],
    });

    const cleanedText =
      cleanResp.choices[0]?.message?.content?.trim() || question;
    console.log("Cleaned OCR Text:", cleanedText);

    // Step 2: Solve the cleaned text
    const solveResp = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a smart tutor. Read the question carefully and provide the correct answer with a short explanation if needed.",
        },
        {
          role: "user",
          content: cleanedText,
        },
      ],
    });

    const answer =
      solveResp.choices[0]?.message?.content?.trim() || "No answer found.";
    console.log("AI Answer:", answer);

    return res.status(200).json({
      cleanedText,
      answer,
    });
  } catch (err: any) {
    console.error("Solve API error:", err);
    return res
      .status(500)
      .json({ error: err.message || "Internal server error" });
  }
}
