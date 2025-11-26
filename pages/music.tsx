// pages/music.tsx
"use client";
import React, { useState } from "react";

export default function MusicStudio() {
  const [input, setInput] = useState("");
  const [genre, setGenre] = useState("afrobeats");
  const [tone, setTone] = useState("romantic");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function submitLyrics(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const resp = await fetch("/api/music/lyricFix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input, genre, tone }),
      });
      const j = await resp.json();
      if (!resp.ok) throw new Error(j.error || "Failed");
      setResult(j.output);
    } catch (err: any) {
      setError(err.message || "Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{ padding: 28, maxWidth: 900, margin: "0 auto", color: "#fff" }}
    >
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>
        OmniVerse AI — Music Creator
      </h1>
      <p style={{ opacity: 0.8, marginBottom: 20 }}>
        Paste messy lyrics or a few lines and we will fix, expand, and structure
        them into a full song.
      </p>

      <form onSubmit={submitLyrics} style={{ display: "grid", gap: 12 }}>
        <label>
          Paste your lyrics or prompt:
          <textarea
            required
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={6}
            style={{ width: "100%", padding: 12, marginTop: 6 }}
            placeholder="e.g. me baby girl i dey love you but you no dey see..."
          />
        </label>

        <div style={{ display: "flex", gap: 12 }}>
          <label>
            Genre:
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              style={{ marginLeft: 8 }}
            >
              <option value="afrobeats">Afrobeats</option>
              <option value="rnb">R&B</option>
              <option value="trap">Trap</option>
              <option value="gospel">Gospel</option>
              <option value="àmapiano">Amapiano</option>
            </select>
          </label>

          <label>
            Tone:
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              style={{ marginLeft: 8 }}
            >
              <option value="romantic">Romantic</option>
              <option value="funny">Funny / Viral</option>
              <option value="sad">Sad / Emotional</option>
              <option value="motivational">Motivational</option>
            </select>
          </label>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            style={{ padding: "10px 16px" }}
          >
            {loading ? "Working…" : "Create Song (Lyrics)"}
          </button>
        </div>
      </form>

      {error && (
        <div style={{ marginTop: 12, color: "salmon" }}>Error: {error}</div>
      )}

      {result && (
        <section
          style={{
            marginTop: 20,
            background: "#0b0b0b",
            padding: 14,
            borderRadius: 8,
          }}
        >
          <h3>Generated Song</h3>
          <pre style={{ whiteSpace: "pre-wrap" }}>{result}</pre>
        </section>
      )}
    </main>
  );
}
