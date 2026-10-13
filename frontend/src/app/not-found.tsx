import Link from "next/link";
import Footer from "@/components/cp/Footer";

export default function NotFound() {
  return (
    <>
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
          <span style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--meta)" }}>errore 404_</span>
          <h1 style={{ margin: 0, fontWeight: 700, fontSize: "clamp(56px,7.6vw,124px)", lineHeight: 0.88, letterSpacing: "-.055em" }}>
            Pagina non <span style={{ color: "var(--accent)" }}>trovata_</span>
          </h1>
          <p style={{ margin: 0, fontSize: "clamp(17px,1.35vw,20px)", lineHeight: 1.5, color: "var(--body)", maxWidth: "520px" }}>
            Il link che hai seguito non porta più da nessuna parte. Riparti dalla home.
          </p>
          <Link
            href="/"
            className="h-background"
            style={{
              height: "56px",
              padding: "0 24px",
              background: "var(--fill-accent)",
              color: "var(--on-fill)",
              fontWeight: 700,
              fontSize: "16px",
              display: "inline-flex",
              alignItems: "center",
              transition: "background .25s",
              "--h-background": "var(--fill-ink)",
            }}
          >
            Torna alla home →
          </Link>
        </section>
      </main>
      <Footer cta={false} />
    </>
  );
}
