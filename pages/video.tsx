// pages/video.tsx
import React, { useState } from "react";

export default function VideoStudio() {
  const [prompt, setPrompt] = useState("");
  const [voice, setVoice] = useState("female");
  const [style, setStyle] = useState("realistic");
  const [duration, setDuration] = useState("30");
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  async function generateVideo() {
    if (!prompt.trim()) return alert("Please describe your scene first.");
    setLoading(true);
    setVideoUrl(null);

    try {
      const res = await fetch("/api/generate-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, style, voice, duration }),
      });
      const j = await res.json();
      setVideoUrl(j.videoUrl || "/mock/sample1.mp4");
    } catch (err) {
      console.error(err);
      alert("Failed to generate (mock).");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        maxWidth: 1000,
        margin: "0 auto",
        background: "#f9fafb",
        borderRadius: 16,
        padding: 24,
        boxShadow: "0 0 12px rgba(0,0,0,0.05)",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: 20 }}>
        🎬 Omniverse AI Studio
      </h1>
      <p style={{ textAlign: "center", color: "#666" }}>
        Turn your text into realistic, cartoon, or avatar videos with voice
        narration.
      </p>

      <div style={{ marginTop: 20 }}>
        <label style={{ fontWeight: 600 }}>Describe your scene:</label>
        <textarea
          rows={5}
          style={{ width: "100%", marginTop: 6, padding: 10, borderRadius: 8 }}
          placeholder="Example: A cheerful child teaching alphabets in a colorful classroom..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 12,
          marginTop: 20,
        }}
      >
        <div>
          <label>🎨 Style</label>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            style={{ width: "100%", padding: 8 }}
          >
            <option value="realistic">Realistic</option>
            <option value="cartoon">Cartoon</option>
            <option value="avatar">Avatar</option>
            <option value="cinematic">Cinematic</option>
          </select>
        </div>

        <div>
          <label>🗣️ Voice Type</label>
          <select
            value={voice}
            onChange={(e) => setVoice(e.target.value)}
            style={{ width: "100%", padding: 8 }}
          >
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="child">Child</option>
            <option value="robotic">Robotic</option>
          </select>
        </div>

        <div>
          <label>⏱ Duration (sec)</label>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            style={{ width: "100%", padding: 8 }}
          >
            <option value="15">15s</option>
            <option value="30">30s</option>
            <option value="60">1 min</option>
            <option value="120">2 mins</option>
          </select>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: 30 }}>
        <button
          onClick={generateVideo}
          disabled={loading}
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "10px 28px",
            borderRadius: 8,
            cursor: "pointer",
            fontSize: 16,
          }}
        >
          {loading ? "Generating Video..." : "Generate Mock Video"}
        </button>
      </div>

      {videoUrl && (
        <div style={{ marginTop: 30, textAlign: "center" }}>
          <h3>Generated Video Preview</h3>
          <video
            src={videoUrl}
            controls
            style={{ width: "100%", borderRadius: 12, marginTop: 10 }}
          />
          <div style={{ marginTop: 10 }}>
            <a href={videoUrl} download style={{ color: "#2563eb" }}>
              ⬇ Download Video
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
