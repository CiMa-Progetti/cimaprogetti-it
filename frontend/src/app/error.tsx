"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main style={{ paddingTop: "72px" }}>
      <section
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "clamp(80px,14vh,160px) clamp(20px,4vw,48px)",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          alignItems: "flex-start",
        }}
      >
        <span style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--meta)" }}>errore_</span>
        <h1 style={{ margin: 0, fontWeight: 700, fontSize: "clamp(56px,7.6vw,124px)", lineHeight: 0.88, letterSpacing: "-.055em" }}>
          Qualcosa si è <span style={{ color: "var(--accent)" }}>inceppato_</span>
        </h1>
        <button
          onClick={reset}
          className="h-background"
          style={{
            height: "56px",
            padding: "0 24px",
            border: 0,
            background: "var(--fill-accent)",
            color: "var(--on-fill)",
            fontWeight: 700,
            fontSize: "16px",
            cursor: "pointer",
            transition: "background .25s",
            "--h-background": "var(--fill-ink)",
          }}
        >
          Riprova
        </button>
      </section>
    </main>
  );
}
