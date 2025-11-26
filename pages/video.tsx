"use client";

import { useState } from "react";

export default function VideoGenerator() {
  const [script, setScript] = useState("");
  const [language, setLanguage] = useState("English");
  const [style, setStyle] = useState("news_anchor");
  const [face, setFace] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  // Convert uploaded image to Base64
  const handleFaceUpload = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setFace(reader.result);
    reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
    if (!script.trim()) {
      alert("Please type your script.");
      return;
    }

    setLoading(true);
    setVideoUrl("");

    const res = await fetch("/api/video/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        script,
        language,
        style,
        faceImageBase64: face,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      alert("Error: " + data.error);
      return;
    }

    setVideoUrl(data.videoUrl);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white p-6 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold mb-8 text-center">
        🎬 AI Video Generator
      </h1>

      {/* CARD */}
      <div className="w-full max-w-3xl bg-white/5 border border-white/10 p-6 rounded-2xl shadow-xl backdrop-blur">
        {/* Script */}
        <label className="block mb-2 font-semibold text-lg">Video Script</label>
        <textarea
          placeholder="Describe the video you want... (script will be spoken exactly)"
          className="w-full p-4 rounded-lg text-black h-36"
          value={script}
          onChange={(e) => setScript(e.target.value)}
        ></textarea>

        {/* Language */}
        <div className="mt-4">
          <label className="font-semibold block mb-1">Language</label>
          <select
            className="bg-black border border-gray-600 px-4 py-2 rounded-lg"
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

        {/* Style */}
        <div className="mt-4">
          <label className="font-semibold block mb-1">Video Style</label>
          <select
            className="bg-black border border-gray-600 px-4 py-2 rounded-lg"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
          >
            <option value="news_anchor">News Anchor</option>
            <option value="storyteller">Storyteller</option>
            <option value="teacher">Teacher</option>
            <option value="influencer">Influencer</option>
            <option value="motivational">Motivational Speaker</option>
          </select>
        </div>

        {/* Face Upload */}
        <div className="mt-4">
          <label className="font-semibold block mb-2">
            Upload Face (optional):
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

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full mt-6 bg-purple-600 hover:bg-purple-700 p-3 rounded-lg font-bold text-lg shadow-lg transition"
        >
          {loading ? "Generating Video..." : "Generate Video"}
        </button>
      </div>

      {/* Video Preview */}
      {videoUrl && (
        <div className="mt-10 w-full max-w-3xl">
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
