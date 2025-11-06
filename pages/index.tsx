import CameraCapture from "./CameraCapture";

export default function Home() {
  return (
    <main style={{ padding: 20 }}>
      <h1>OmniVerse AI — Capture & Solve</h1>
      <p>Use the camera to capture a question and get step-by-step solutions.</p>
      <CameraCapture />
    </main>
  );
}
