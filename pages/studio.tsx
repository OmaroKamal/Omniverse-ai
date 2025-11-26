export default function Studio() {
  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ fontSize: "40px" }}>🎥 OmniVerse AI Studio</h1>
      <p>Create AI-generated videos, avatars, and animations.</p>

      <div style={{ marginTop: 20 }}>
        <button
          style={{
            padding: "12px 20px",
            borderRadius: 8,
            background: "#333",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Start Creating
        </button>
      </div>
    </div>
  );
}
