"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  const [language, setLanguage] = useState("en");
  const [lyricInput, setLyricInput] = useState("");
  const [lyricOutput, setLyricOutput] = useState<string | null>(null);
  const [lyricLoading, setLyricLoading] = useState(false);
  const [lyricError, setLyricError] = useState<string | null>(null);

  // ---------------- TRANSLATIONS ----------------
  const translations: any = {
    en: {
      title: "OmniVerse AI Studio",
      subtitle:
        "A next-generation platform where imagination meets intelligence — create AI-powered videos, avatars, and immersive experiences that push the boundaries of reality.",
      launchVideo: "🎬 Launch AI Video Creator",
      openAvatar: "🧍🏽‍♂️ Open Avatar Studio",
      smartStudy: "📘 Access Smart Study Assistant",
      featuresTitle: "What you can do with OmniVerse AI",
      featureVideoTitle: "AI Video Generator",
      featureVideoDesc:
        "Turn scripts into realistic talking-head videos powered by advanced AI.",
      featureAvatarTitle: "Avatar & Character Studio",
      featureAvatarDesc:
        "Create animated avatars and characters from your photos or imagination.",
      featureStudyTitle: "Smart Study & Learning",
      featureStudyDesc:
        "Solve questions, summarize notes, and generate study materials in seconds.",
      lyricTitle: "🎵 Music Lyric Fixer (Preview Tool)",
      lyricSubtitle:
        "Paste messy or incomplete lyrics and let OmniVerse clean, polish, and structure them.",
      lyricPlaceholder: "Type or paste messy lyrics here...",
      lyricButton: "Fix My Lyrics 🎤",
      lyricResultTitle: "Cleaned / Improved Lyrics",
    },

    fr: {
      title: "Studio OmniVerse AI",
      subtitle:
        "Une plateforme nouvelle génération où l’imagination rencontre l’intelligence — créez des vidéos IA, des avatars et des expériences immersives.",
      launchVideo: "🎬 Lancer le Créateur de Vidéo IA",
      openAvatar: "🧍🏽‍♂️ Ouvrir Avatar Studio",
      smartStudy: "📘 Ouvrir l’Assistant d’Étude",
      featuresTitle: "Ce que vous pouvez faire avec OmniVerse AI",
      featureVideoTitle: "Générateur de Vidéos IA",
      featureVideoDesc:
        "Transformez des scripts en vidéos réalistes de présentateurs animés par l’IA.",
      featureAvatarTitle: "Studio d’Avatar & Personnage",
      featureAvatarDesc:
        "Créez des avatars animés et des personnages à partir de vos photos.",
      featureStudyTitle: "Étude Intelligente",
      featureStudyDesc:
        "Résumez vos cours, créez des quiz et générez des fiches de révision en quelques secondes.",
      lyricTitle: "🎵 Correcteur de Paroles (Aperçu)",
      lyricSubtitle:
        "Collez des paroles désordonnées et laissez OmniVerse les nettoyer et les améliorer.",
      lyricPlaceholder: "Saisissez ici des paroles à corriger...",
      lyricButton: "Corriger les paroles 🎤",
      lyricResultTitle: "Paroles nettoyées / améliorées",
    },

    es: {
      title: "OmniVerse AI Studio",
      subtitle:
        "Una plataforma donde la imaginación se encuentra con la inteligencia — crea videos, avatares y experiencias impulsadas por IA.",
      launchVideo: "🎬 Iniciar Creador de Videos IA",
      openAvatar: "🧍🏽‍♂️ Abrir Estudio de Avatar",
      smartStudy: "📘 Abrir Asistente de Estudio",
      featuresTitle: "Lo que puedes hacer con OmniVerse AI",
      featureVideoTitle: "Generador de Video con IA",
      featureVideoDesc:
        "Convierte guiones en videos realistas de presentadores parlantes.",
      featureAvatarTitle: "Estudio de Avatares",
      featureAvatarDesc:
        "Crea avatares animados y personajes basados en tus fotos.",
      featureStudyTitle: "Estudio Inteligente",
      featureStudyDesc:
        "Resuelve preguntas, resume textos y crea materiales de estudio.",
      lyricTitle: "🎵 Corrector de Letras (Vista previa)",
      lyricSubtitle:
        "Pega letras desordenadas y deja que OmniVerse las limpie y organice.",
      lyricPlaceholder: "Escribe o pega letras aquí...",
      lyricButton: "Arreglar letras 🎤",
      lyricResultTitle: "Letras mejoradas",
    },

    zh: {
      title: "OmniVerse AI 工作室",
      subtitle:
        "一个让想象力与智能融合的平台——创建 AI 视频、虚拟形象和沉浸式体验。",
      launchVideo: "🎬 启动 AI 视频生成器",
      openAvatar: "🧍🏽‍♂️ 打开虚拟形象工作室",
      smartStudy: "📘 打开学习助手",
      featuresTitle: "在 OmniVerse AI 中你可以做什么",
      featureVideoTitle: "AI 视频生成器",
      featureVideoDesc: "将文本脚本变成逼真的讲话视频。",
      featureAvatarTitle: "虚拟形象工作室",
      featureAvatarDesc: "根据你的照片创建个性化虚拟形象。",
      featureStudyTitle: "智能学习助手",
      featureStudyDesc: "秒级生成学习笔记、题目和总结。",
      lyricTitle: "🎵 歌词修正器（预览工具）",
      lyricSubtitle: "粘贴乱七八糟的歌词，OmniVerse 会帮你整理润色。",
      lyricPlaceholder: "在此粘贴或输入歌词...",
      lyricButton: "修正歌词 🎤",
      lyricResultTitle: "整理后的歌词",
    },

    ar: {
      title: "استوديو أومنيفيرس للذكاء الاصطناعي",
      subtitle:
        "منصة الجيل الجديد حيث يلتقي الخيال بالذكاء—اصنع فيديوهات، وأفاتارات، وتجارب غامرة بالذكاء الاصطناعي.",
      launchVideo: "🎬 تشغيل منشئ الفيديو بالذكاء الاصطناعي",
      openAvatar: "🧍🏽‍♂️ فتح استوديو الأفاتار",
      smartStudy: "📘 فتح مساعد الدراسة الذكي",
      featuresTitle: "ماذا يمكنك أن تفعل مع أومنيفيرس AI",
      featureVideoTitle: "منشئ فيديوهات بالذكاء الاصطناعي",
      featureVideoDesc:
        "حوّل النصوص إلى فيديوهات حقيقية لمتحدثين مدعومين بالذكاء الاصطناعي.",
      featureAvatarTitle: "استوديو الشخصيات والأفاتار",
      featureAvatarDesc: "أنشئ شخصيات وأفاتارات متحركة من صورك.",
      featureStudyTitle: "مساعد دراسة ذكي",
      featureStudyDesc:
        "حل الأسئلة، لخص الدروس، وأنشئ مواد للمذاكرة خلال ثوانٍ.",
      lyricTitle: "🎵 مُحسّن الكلمات الغنائية (نسخة تجريبية)",
      lyricSubtitle: "الصق كلمات غير مرتبة ودع أومنيفيرس ينظفها ويحسنها.",
      lyricPlaceholder: "اكتب أو الصق الكلمات هنا...",
      lyricButton: "تحسين الكلمات 🎤",
      lyricResultTitle: "الكلمات بعد التحسين",
    },

    twi: {
      title: "OmniVerse AI Studio",
      subtitle:
        "Baabi a adwenemhaw ne nyansa hyia — bɔ AI video, avatar, ne nneɛma a ɛyɛ akokoduru wɔ wiase foforo mu.",
      launchVideo: "🎬 Bue AI Video Yɛbea",
      openAvatar: "🧍🏽‍♂️ Bue Avatar Studio",
      smartStudy: "📘 Bue Smart Study Boafo",
      featuresTitle: "Nneɛma a wubetumi ayɛ wɔ OmniVerse AI",
      featureVideoTitle: "AI Video Yɛbea",
      featureVideoDesc:
        "Sesaa nsɛm kɔ video a ɔbarima anaa ɔbea reka no te sɛ nipa ankasa.",
      featureAvatarTitle: "Avatar ne Suban Studio",
      featureAvatarDesc:
        "Yɛ avatar ne akwadworoma fi w’afoto anaa wo adwene mu.",
      featureStudyTitle: "Smart Study Boafo",
      featureStudyDesc:
        "Boa wo ma wutumi sua ntɛm, nya nsɛmmisa ne mmuae, ne nsɛntitiriw a wɔato mu.",
      lyricTitle: "🎵 Dwom Lyrics Siesie (Test-Tool)",
      lyricSubtitle:
        "Tɔ dwom a aka hɔ anaa ayɛ dɔnn, na ma OmniVerse nsi ho mmɔden.",
      lyricPlaceholder: "Tɔ dwom lyrics a aka hɔ ha...",
      lyricButton: "Siesie Lyrics 🎤",
      lyricResultTitle: "Lyrics a wɔasiesie ama no",
    },
  };

  const t = translations[language];

  // --------------- HANDLERS -----------------
  const handleFixLyrics = async () => {
    setLyricError(null);
    setLyricOutput(null);

    if (!lyricInput.trim()) {
      setLyricError("Please paste or type some lyrics first.");
      return;
    }

    try {
      setLyricLoading(true);
      const res = await fetch("/api/music/lyricFix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: lyricInput }),
      });

      if (!res.ok) {
        setLyricError("Something went wrong. Please try again.");
        return;
      }

      const data = await res.json();
      // Adjust this based on your API response shape
      const cleaned =
        data?.output || data?.result || JSON.stringify(data, null, 2);

      setLyricOutput(cleaned);
    } catch (err) {
      setLyricError("Network error. Please check your connection.");
    } finally {
      setLyricLoading(false);
    }
  };

  // ------------------ UI START ------------------
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center p-6">
      {/* MAIN CONTENT CONTAINER */}
      <div className="w-full max-w-5xl flex flex-col items-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-6"
        >
          <Image
            src="/omniverse-logo.png"
            alt="OmniVerse Logo"
            width={140}
            height={140}
            className="rounded-full shadow-lg"
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold mb-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {t.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-center max-w-2xl text-gray-300 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.3 }}
        >
          {t.subtitle}
        </motion.p>

        {/* Language Selector */}
        <div className="mb-8">
          <select
            className="bg-black border border-gray-700 text-white px-4 py-2 rounded"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
            <option value="zh">Chinese</option>
            <option value="ar">Arabic</option>
            <option value="twi">Twi (Akan)</option>
          </select>
        </div>

        {/* Primary Feature Buttons */}
        <div className="flex flex-col md:flex-row gap-4 w-full max-w-2xl mb-10">
          <Link
            href="/video"
            className="flex-1 bg-purple-600 hover:bg-purple-700 px-5 py-3 rounded text-center font-bold"
          >
            {t.launchVideo}
          </Link>

          <Link
            href="/avatar"
            className="flex-1 bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded text-center font-bold"
          >
            {t.openAvatar}
          </Link>

          <Link
            href="/smartstudy"
            className="flex-1 bg-green-600 hover:bg-green-700 px-5 py-3 rounded text-center font-bold"
          >
            {t.smartStudy}
          </Link>
        </div>

        {/* Feature Cards */}
        <section className="w-full max-w-5xl mb-10">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center">
            {t.featuresTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h3 className="font-semibold mb-2">{t.featureVideoTitle}</h3>
              <p className="text-sm text-gray-300">{t.featureVideoDesc}</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h3 className="font-semibold mb-2">{t.featureAvatarTitle}</h3>
              <p className="text-sm text-gray-300">{t.featureAvatarDesc}</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h3 className="font-semibold mb-2">{t.featureStudyTitle}</h3>
              <p className="text-sm text-gray-300">{t.featureStudyDesc}</p>
            </div>
          </div>
        </section>

        {/* Lyric Fixer Section */}
        <section className="w-full max-w-3xl mb-12 bg-white/5 border border-white/10 rounded-2xl p-5">
          <h2 className="text-lg md:text-xl font-semibold mb-1">
            {t.lyricTitle}
          </h2>
          <p className="text-sm text-gray-300 mb-4">{t.lyricSubtitle}</p>

          <textarea
            value={lyricInput}
            onChange={(e) => setLyricInput(e.target.value)}
            placeholder={t.lyricPlaceholder}
            className="w-full min-h-[120px] p-3 rounded-md text-black text-sm outline-none"
          />

          {lyricError && (
            <p className="text-red-400 text-xs mt-2">{lyricError}</p>
          )}

          <button
            onClick={handleFixLyrics}
            disabled={lyricLoading}
            className="mt-3 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-900 text-white px-4 py-2 rounded-md text-sm font-semibold"
          >
            {lyricLoading ? "Processing..." : t.lyricButton}
          </button>

          {lyricOutput && (
            <div className="mt-4 bg-black/40 border border-white/10 rounded-md p-3">
              <h3 className="text-sm font-semibold mb-2">
                {t.lyricResultTitle}
              </h3>
              <pre className="whitespace-pre-wrap text-xs text-gray-100">
                {lyricOutput}
              </pre>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="mt-auto text-gray-500 text-xs md:text-sm pb-4">
          © 2025 OmniVerse AI — Beyond Reality • Powered by OpenAI
        </footer>
      </div>
    </div>
  );
}
