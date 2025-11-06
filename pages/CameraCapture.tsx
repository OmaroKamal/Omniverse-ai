"use client";
import React, { useRef, useState } from "react";
import Tesseract from "tesseract.js";

export default function CameraCapture() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);
  const [ocrText, setOcrText] = useState<string | null>(null);
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch (err) {
      alert(
        "Unable to access camera. Make sure you allowed permission and opened preview in a new tab.",
      );
      console.error(err);
    }
  }

  function stopCamera() {
    const stream = videoRef.current?.srcObject as MediaStream | undefined;
    stream?.getTracks().forEach((t) => t.stop());
    if (videoRef.current) videoRef.current.srcObject = null;
  }

  function capture() {
    if (!videoRef.current || !canvasRef.current) return;
    const v = videoRef.current;
    const c = canvasRef.current;
    const w = v.videoWidth || 640;
    const h = v.videoHeight || 480;
    c.width = w;
    c.height = h;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(v, 0, 0, w, h);
    const dataUrl = c.toDataURL("image/png");
    setImageData(dataUrl);
    runOCR(dataUrl);
  }

  async function runOCR(dataUrl: string) {
    setLoading(true);
    setOcrText(null);
    setAiResult(null);

    try {
      console.log("Starting OCR...");
      const { data } = await Tesseract.recognize(dataUrl, "eng", {
        logger: (m) => console.log("Tesseract progress:", m),
      });

      const text = (data?.text || "").trim();
      console.log("OCR Result:", text);
      setOcrText(text || "[no text found]");

      if (text) {
        console.log("Sending to AI API:", text);
        const resp = await fetch("/api/solve", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: text }),
        });

        const j = await resp.json();
        console.log("AI Response:", j);
        setAiResult(j?.answer || j?.error || "No answer returned");
      }
    } catch (err) {
      console.error("OCR error:", err);
      setOcrText("[OCR failed]");
      setAiResult(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 920 }}>
      <div style={{ display: "flex", gap: 12 }}>
        <div>
          <video
            ref={videoRef}
            style={{ background: "#000", width: 480, height: 360 }}
            autoPlay
            playsInline
          />
          <div style={{ marginTop: 8 }}>
            <button onClick={startCamera} style={{ marginRight: 8 }}>
              Start Camera
            </button>
            <button onClick={capture} style={{ marginRight: 8 }}>
              Capture
            </button>
            <button onClick={stopCamera}>Stop Camera</button>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <canvas ref={canvasRef} style={{ display: "none" }} />
          {loading && <div>Working… (OCR & AI)</div>}
          {imageData && (
            <div>
              <h4>Captured Image</h4>
              <img src={imageData} alt="captured" style={{ maxWidth: 360 }} />
            </div>
          )}
          {ocrText && (
            <div>
              <h4>OCR</h4>
              <pre style={{ whiteSpace: "pre-wrap" }}>{ocrText}</pre>
            </div>
          )}
          {aiResult && (
            <div>
              <h4>AI Answer</h4>
              <pre style={{ whiteSpace: "pre-wrap" }}>{aiResult}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
