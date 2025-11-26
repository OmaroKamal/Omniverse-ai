"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  const [language, setLanguage] = useState("en");

  const translations: any = {
    en: {
      title: "OmniVerse AI Studio",
      subtitle:
        "A next-generation platform where imagination meets intelligence — create AI-powered videos, avatars, and immersive experiences.",
      launchVideo: "🎬 Launch AI Video Creator",
      uploadFace: "📷 Upload Face for Video",
      openAvatar: "🧍🏽‍♂️ Open Avatar Studio",
      smartStudy: "📘 Access Smart Study Assistant",
      lyricFixTitle: "🎵 Test Music Lyric Fixer",
      fixLyrics: "Fix My Lyrics",
      placeholderLyrics: "Type messy or incomplete lyrics here...",
    },

    // You can keep your other languages
    fr: {
      title: "Studio OmniVerse AI",
      subtitle:
        "Une plateforme où l’imagination rencontre l’intelligence — créez des vidéos, avatars et expériences IA.",
      launchVideo: "🎬 Lancer le Créateur de Vidéo IA",
      uploadFace: "📷 Télécharger une photo",
      openAvatar: "🧍🏽‍♂️ Ouvrir Avatar Studio",
      smartStudy: "📘 Ouvrir l’Assistant d’Étude",
      lyricFixTitle: "🎵 Testeur de Correction de Paroles",
      fixLyrics: "Corriger les Paroles",
      placeholderLyrics: "Tapez des paroles incomplètes ici...",
    },

    twi: {
      title: "OmniVerse AI Studio",
      subtitle:
        "Baabi a adwene ne nyansa hyia — bɔ video, avatar ne nneɛma a ɛyɛ akokoduru wɔ AI mu.",
      launchVideo: "🎬 Bue AI Video Yɛbea",
      uploadFace: "📷 Fa W’anim Mfonini",
      openAvatar: "🧍🏽‍♂️ Bue Avatar Studio",
      smartStudy: "📘 Bue Smart Study Boafo",
      lyricFixTitle: "🎵 Nsɛmfua Ayɛyi Yɛbea",
      fixLyrics: "Siesie Nsɛmfua",
      placeholderLyrics: "Bɔ nsɛmfua a ɛnyɛ pɛ…",
    },
  };

  const t = translations[language];

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center p-6">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mb-6 mt-6"
      >
        <Image
          src="/omniverse-logo.png"
          alt="OmniVerse Logo"
          width={160}
          height={160}
          className="rounded-full shadow-xl"
        />
      </motion.div>

      {/* Title */}
      <motion.h1
        className="text-4xl font-extrabold mb-3 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {t.title}
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="text-center max-w-3xl text-gray-300 mb-8 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {t.subtitle}
      </motion.p>

      {/* Language Selector */}
      <div className="mb-6">
        <select
          className="bg-black border border-gray-700 px-4 py-2 rounded-lg"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="twi">Twi (Akan)</option>
        </select>
      </div>

      {/* Feature Buttons */}
      <div className="flex flex-col gap-4 w-full max-w-md">
        {/* Video Creator */}
        <a
          href="/video"
          className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg text-center font-bold shadow-lg transition"
        >
          {t.launchVideo}
        </a>

        {/* Upload Face */}
        <label className="bg-yellow-600 hover:bg-yellow-700 px-6 py-3 rounded-lg text-center font-bold shadow-lg cursor-pointer transition">
          {t.uploadFace}
          <input type="file" className="hidden" />
        </label>

        {/* Avatar Studio */}
        <a
          href="/avatar"
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-center font-bold shadow-lg transition"
        >
          {t.openAvatar}
        </a>

        {/* Smart Study */}
        <a
          href="/smartstudy"
          className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg text-center font-bold shadow-lg transition"
        >
          {t.smartStudy}
        </a>
      </div>

      {/* Music Lyric Fixer */}
      <div className="mt-12 p-6 border border-white/10 rounded-xl w-full max-w-xl bg-white/5 backdrop-blur">
        <h2 className="text-xl font-bold mb-3">{t.lyricFixTitle}</h2>

        <textarea
          id="lyric-input"
          placeholder={t.placeholderLyrics}
          className="w-full p-3 mt-2 text-black rounded-lg"
        ></textarea>

        <button
          onClick={async () => {
            const text = (
              document.getElementById("lyric-input") as HTMLTextAreaElement
            ).value;

            const res = await fetch("/api/music/lyricFix", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ input: text }),
            });

            const data = await res.json();
            alert(JSON.stringify(data, null, 2));
          }}
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg font-bold shadow-lg transition"
        >
          {t.fixLyrics}
        </button>
      </div>

      <footer className="mt-12 text-gray-500 text-sm">
        © 2025 OmniVerse AI — Beyond Reality
      </footer>
    </div>
  );
}
