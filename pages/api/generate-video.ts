// pages/api/generate-video.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const samples = [
    "/mock/sample1.mp4",
    "/mock/sample2.mp4",
    "/mock/sample3.mp4",
  ];
  const idx = Math.floor(Math.random() * samples.length);
  const videoUrl = samples[idx];
  res.status(200).json({ ok: true, videoUrl });
}
