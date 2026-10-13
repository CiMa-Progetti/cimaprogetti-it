// Pagina del founder (porting di Founder.dc.html): /chi-siamo/[slug]
import React from "react";
import Link from "next/link";
import Footer from "@/components/cp/Footer";
import MaterialSymbolsFont from "@/components/MaterialSymbolsFont";
import { waLink } from "@/lib/cp/data";

type Founder = {
  name: string;
  title: string;
  tagline: string;
  role: string;
  bio: string;
  phone: string;
  email: string;
  linkedin: string;
  skills: { icon: string; label: string }[];
};

const MONO: React.CSSProperties = { fontFamily: "var(--mono)", fontSize: "12px" };

const CONTACT_LINK: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  padding: "clamp(20px,3vh,28px) 0",
  borderBottom: "1px solid var(--line)",
  color: "var(--ink)",
  textDecoration: "none",
  transition: "color .2s",
  "--h-color": "var(--accent)",
};

const CONTACT_VALUE: React.CSSProperties = {
  fontWeight: 700,
  fontSize: "clamp(24px,2.6vw,38px)",
  lineHeight: 1.05,
  letterSpacing: "-.035em",
  overflowWrap: "anywhere",
};

function ContactLabel({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <span style={{ ...MONO, color: "var(--meta)", display: "flex", gap: "10px" }}>
      <span style={{ color: "var(--accent)" }}>{n}</span>
      {children}
    </span>
  );
}

export default function FounderPage({ founder: f }: { founder: Founder }) {
  const k = f.name.lastIndexOf(" ");
  const nameA = f.name.slice(0, k);
  const nameB = f.name.slice(k + 1);
  const num = f.phone.replace(/\D/g, "");
  const wa = waLink(f.phone);

  return (
    <>
      <MaterialSymbolsFont />
      <main>
        <section style={{ padding: "calc(72px + clamp(32px,6vh,72px)) clamp(20px,4vw,48px) clamp(48px,8vh,88px)" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <Link
              href="/chi-siamo"
              className="h-border-color"
              style={{
                display: "inline-flex",
                alignItems: "center",
                height: "44px",
                padding: "0 14px",
                border: "1px solid var(--line)",
                ...MONO,
                color: "var(--ink)",
                transition: "border-color .2s",
                "--h-border-color": "var(--ink)",
              }}
            >
              ← chi siamo
            </Link>
            <div
              data-reveal="1"
              style={{
                marginTop: "clamp(32px,6vh,64px)",
                ...MONO,
                color: "var(--accent)",
                textTransform: "uppercase",
                letterSpacing: ".04em",
              }}
            >
              {f.title}
            </div>
            <h1
              data-rise-group="1"
              style={{ fontWeight: 700, fontSize: "clamp(52px,8vw,132px)", lineHeight: 0.88, letterSpacing: "-.055em", margin: "18px 0 0" }}
            >
              <span style={{ display: "block", overflow: "hidden", paddingBottom: ".12em" }}>
                <span data-rise="1" style={{ display: "block" }}>
                  {nameA}
                </span>
              </span>
              <span style={{ display: "block", overflow: "hidden", paddingBottom: ".12em" }}>
                <span data-rise="1" style={{ display: "block" }}>
                  {nameB}
                  <span style={{ color: "var(--accent)" }}>_</span>
                </span>
              </span>
            </h1>
            <p
              data-reveal="1"
              data-delay="200"
              style={{
                fontWeight: 500,
                fontSize: "clamp(20px,1.9vw,28px)",
                lineHeight: 1.3,
                letterSpacing: "-.02em",
                margin: "clamp(20px,3.5vh,36px) 0 0",
                maxWidth: "32ch",
                textWrap: "pretty",
              }}
            >
              {f.tagline}
            </p>
          </div>
        </section>
        <section style={{ borderTop: "1px solid var(--line-soft)" }}>
          <div
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              padding: "clamp(56px,9vh,104px) clamp(20px,4vw,48px)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,420px),1fr))",
              gap: "64px clamp(40px,7vw,112px)",
              alignItems: "start",
            }}
          >
            <div data-reveal="1" style={{ display: "flex", flexDirection: "column", gap: "44px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <span style={{ ...MONO, color: "var(--meta)" }}>approccio_</span>
                <p
                  style={{
                    margin: 0,
                    fontSize: "clamp(18px,1.5vw,22px)",
                    lineHeight: 1.5,
                    color: "var(--ink)",
                    maxWidth: "52ch",
                    textWrap: "pretty",
                  }}
                >
                  {f.bio}
                </p>
                <span style={{ ...MONO, color: "var(--accent)" }}>{f.role}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ ...MONO, color: "var(--meta)", paddingBottom: "12px" }}>competenze_</span>
                {f.skills.map((s) => (
                  <div
                    key={s.label}
                    style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px 0", borderTop: "1px solid var(--line)" }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        width: "30px",
                        height: "30px",
                        flex: "none",
                        color: "var(--accent)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "'Material Symbols Sharp'",
                        fontSize: "28px",
                        lineHeight: 1,
                        fontFeatureSettings: "'liga'",
                        WebkitFontSmoothing: "antialiased",
                        overflow: "hidden",
                      }}
                    >
                      {s.icon}
                    </span>
                    <span style={{ fontWeight: 700, fontSize: "clamp(17px,1.4vw,20px)", letterSpacing: "-.015em" }}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div data-reveal="1" data-delay="120" style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ ...MONO, color: "var(--meta)", paddingBottom: "4px" }}>contatti diretti_</span>
              <div style={{ display: "flex", flexDirection: "column", borderTop: "1px solid var(--line)" }}>
                <a href={wa} target="_blank" rel="noopener" className="h-color" style={CONTACT_LINK}>
                  <ContactLabel n="01">whatsapp</ContactLabel>
                  <span style={CONTACT_VALUE}>{f.phone}</span>
                </a>
                <a href={"mailto:" + f.email} className="h-color" style={CONTACT_LINK}>
                  <ContactLabel n="02">email</ContactLabel>
                  <span style={CONTACT_VALUE}>{f.email}</span>
                </a>
                <a href={f.linkedin} target="_blank" rel="noopener" className="h-color" style={CONTACT_LINK}>
                  <ContactLabel n="03">linkedin</ContactLabel>
                  <span style={CONTACT_VALUE}>Profilo LinkedIn ↗</span>
                </a>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "28px" }}>
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener"
                  data-magnetic="1"
                  className="h-background h-color"
                  style={{
                    height: "56px",
                    padding: "0 24px",
                    background: "var(--fill-accent)",
                    color: "var(--on-fill)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "12px",
                    fontWeight: 700,
                    fontSize: "16px",
                    letterSpacing: "-.01em",
                    transition: "background .25s",
                    "--h-background": "var(--fill-ink)",
                    "--h-color": "var(--on-fill)",
                  }}
                >
                  Scrivi su WhatsApp
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M4 12h15M12 5l7 7-7 7" style={{ stroke: "currentColor", strokeWidth: "2.4px", strokeLinecap: "square" }} />
                  </svg>
                </a>
                <a
                  href={"tel:+" + num}
                  className="h-border-color h-color"
                  style={{
                    height: "56px",
                    padding: "0 24px",
                    background: "var(--bg)",
                    color: "var(--ink)",
                    border: "1px solid var(--line-strong)",
                    display: "inline-flex",
                    alignItems: "center",
                    fontWeight: 700,
                    fontSize: "16px",
                    letterSpacing: "-.01em",
                    transition: "border-color .25s",
                    "--h-border-color": "var(--ink)",
                    "--h-color": "var(--ink)",
                  }}
                >
                  Chiama
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
