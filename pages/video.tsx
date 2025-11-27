"use client";

import { useState } from "react";
import Link from "next/link";

export default function VideoGenerator() {
  const [script, setScript] = useState("");
  const [scene, setScene] = useState("");
  const [language, setLanguage] = useState("English");
  const [style, setStyle] = useState("news_anchor");
  const [face, setFace] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [error, setError] = useState("");

  // Convert uploaded image to Base64
  const handleFaceUpload = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setFace(reader.result);
    reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
    setError("");
    if (!script.trim()) {
      setError("Please type a script for the video.");
      return;
    }

    if (!scene.trim()) {
      setError("Please describe the scene/environment.");
      return;
    }

    setLoading(true);
    setVideoUrl("");

    try {
      const res = await fetch("/api/video/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          script,
          scene,
          language,
          style,
          faceImageBase64: face,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.error || "Video generation failed.");
        return;
      }

      setVideoUrl(data.videoUrl);
    } catch (err) {
      setLoading(false);
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white p-6 flex flex-col items-center">
      {/* Top Bar */}
      <div className="w-full max-w-5xl flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold">🎬 AI Video Generator</h1>
        <Link
          href="/"
          className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-semibold"
        >
          ← Back to Home
        </Link>
      </div>

      {/* MAIN CARD */}
      <div className="w-full max-w-4xl bg-white/5 border border-white/10 p-6 rounded-2xl shadow-xl backdrop-blur">
        {/* SCRIPT */}
        <label className="block mb-2 font-semibold text-lg">
          Video Script (What the character will say)
        </label>
        <textarea
          placeholder="Type the exact words the character will speak..."
          className="w-full p-4 rounded-lg text-black h-32 mb-4"
          value={script}
          onChange={(e) => setScript(e.target.value)}
        />

        {/* SCENE */}
        <label className="block mb-2 font-semibold text-lg">
          Scene / Environment Description (Full-body & background)
        </label>
        <textarea
          placeholder="Example: A man standing in front of a restaurant, holding food and speaking to customers..."
          className="w-full p-4 rounded-lg text-black h-28 mb-4"
          value={scene}
          onChange={(e) => setScene(e.target.value)}
        />

        {/* CONTROLS GRID */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* LANGUAGE */}
          <div>
            <label className="font-semibold block mb-1">Language</label>
            <select
              className="w-full bg-black border border-gray-600 px-4 py-2 rounded-lg"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option>English</option>
              <option>French</option>
              <option>Spanish</option>
              <option>Arabic</option>
              <option>Chinese</option>
              <option>Twi</option>
            </select>
          </div>

          {/* STYLE */}
          <div>
            <label className="font-semibold block mb-1">Video Style</label>
            <select
              className="w-full bg-black border border-gray-600 px-4 py-2 rounded-lg"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
            >
              <option value="news_anchor">News Anchor</option>
              <option value="storyteller">Storyteller</option>
              <option value="teacher">Teacher</option>
              <option value="influencer">Influencer</option>
              <option value="motivational">Motivational Speaker</option>
              <option value="advert">Product Advertisement</option>
            </select>
          </div>
        </div>

        {/* FACE UPLOAD */}
        <div className="mt-6">
          <label className="font-semibold block mb-2">
            Upload Character Face (Optional)
          </label>
          <input type="file" accept="image/*" onChange={handleFaceUpload} />

          {face && (
            <img
              src={face}
              alt="Preview"
              className="mt-3 w-32 h-32 rounded-lg object-cover border border-white/20"
            />
          )}
        </div>

        {/* ERROR */}
        {error && (
          <div className="mt-4 text-red-400 text-sm font-semibold">{error}</div>
        )}

        {/* GENERATE BUTTON */}
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full mt-6 bg-purple-600 hover:bg-purple-700 p-3 rounded-lg font-bold text-lg shadow-lg transition disabled:bg-purple-900"
        >
          {loading ? "Generating Video..." : "Generate Full-Scene Video"}
        </button>
      </div>

      {/* VIDEO PREVIEW */}
      {videoUrl && (
        <div className="mt-10 w-full max-w-4xl">
          <video
            src={videoUrl}
            controls
            className="rounded-xl shadow-xl w-full"
          />
          <a
            href={videoUrl}
            download="omniverse-video.mp4"
            className="mt-4 block bg-blue-600 hover:bg-blue-700 text-center p-3 rounded-lg font-bold"
          >
            Download Video
          </a>
        </div>
      )}
    </div>
  );
}
