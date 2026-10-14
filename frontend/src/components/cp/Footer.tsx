"use client";
// Banda CTA blu · indice delle pagine · footer legale (porting di Footer.dc.html)
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { openDiag } from "@/lib/cp/quiz";
import { openConsent } from "@/lib/cp/consent";

export default function Footer({ cta = true, index = true }: { cta?: boolean; index?: boolean }) {
  const [vw, setVw] = useState(1280);
  useEffect(() => {
    const r = () => setVw(window.innerWidth);
    r();
    window.addEventListener("resize", r);
    return () => window.removeEventListener("resize", r);
  }, []);
  const cols = vw >= 1100 ? 7 : vw >= 560 ? 4 : 2;
  const left = cols - ((7 - 1) % cols);
  const idxCols = "repeat(" + cols + ",minmax(0,1fr))";
  const lastSpan = "span " + left;
  const showCta = cta;
  const showIdx = index;

  return (
  <>
    {showCta ? (
      <>
        <section
          data-dark="1"
          style={{ position: "relative", background: "var(--fill-accent)", color: "var(--on-fill)", overflow: "hidden" }}
        >
          <div
            style={{
              position: "absolute",
              inset: "0",
              backgroundImage: "radial-gradient(rgba(255,255,255,.2) 1px,transparent 1px)",
              backgroundSize: "24px 24px",
              pointerEvents: "none",
            }}
          ></div>
          <div
            style={{
              position: "relative",
              maxWidth: "1280px",
              margin: "0 auto",
              padding: "clamp(80px,12vh,136px) clamp(20px,4vw,48px)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,420px),1fr))",
              gap: "40px 64px",
              alignItems: "end",
            }}
          >
            <div>
              <div data-reveal="1" style={{ fontFamily: "var(--mono)", fontSize: "12px", marginBottom: "22px" }}>
                non sai da dove partire?_
              </div>
              <h2
                data-rise-group="1"
                style={{ fontWeight: "700", fontSize: "clamp(40px,5.6vw,88px)", lineHeight: "1", letterSpacing: "-.045em", margin: "0" }}
              >
                <span style={{ display: "block", overflow: "hidden", paddingBottom: ".08em" }}>
                  <span data-rise="1" style={{ display: "block" }}>
                    Parti dalla
                  </span>
                </span>
                <span style={{ display: "block", overflow: "hidden", paddingBottom: ".08em" }}>
                  <span data-rise="1" style={{ display: "block" }}>
                    diagnosi_
                  </span>
                </span>
              </h2>
            </div>
            <div data-reveal="1" style={{ display: "flex", flexDirection: "column", gap: "24px", alignItems: "flex-start" }}>
              <p style={{ margin: "0", fontSize: "clamp(17px,1.35vw,20px)", lineHeight: "1.5", maxWidth: "480px", textWrap: "pretty" }}>
                Otto domande a scelta multipla, sessanta secondi, niente da compilare. Alla fine vedi da dove partiremmo e una stima del
                valore della prestazione.
              </p>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <button
                  data-magnetic="1"
                  onClick={openDiag}
                  className="h-background h-color"
                  style={{
                    height: "56px",
                    padding: "0 24px",
                    background: "var(--bg)",
                    color: "var(--accent)",
                    border: "0",
                    fontWeight: "700",
                    fontSize: "16px",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "12px",
                    transition: "background .25s,color .25s",
                    "--h-background": "var(--fill-ink)",
                    "--h-color": "var(--on-fill)",
                  }}
                >
                  Fai la diagnosi{" "}
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M4 12h15M12 5l7 7-7 7" style={{ stroke: "currentColor", strokeWidth: "2.4px", strokeLinecap: "square" }} />
                  </svg>
                </button>
                <Link
                  href="/contatti"
                  className="h-border-color h-color"
                  style={{
                    height: "56px",
                    padding: "0 24px",
                    border: "1px solid rgba(255,255,255,.6)",
                    color: "var(--on-fill)",
                    fontWeight: "700",
                    fontSize: "16px",
                    display: "inline-flex",
                    alignItems: "center",
                    transition: "border-color .25s",
                    "--h-border-color": "var(--bg)",
                    "--h-color": "var(--on-fill)",
                  }}
                >
                  Parliamone
                </Link>
              </div>
            </div>
          </div>
        </section>
      </>
    ) : null}

    {showIdx ? (
      <>
        <nav aria-label="Tutte le pagine" style={{ background: "var(--track)", borderTop: "1px solid var(--line)" }}>
          <div style={{ display: "grid", gridTemplateColumns: idxCols, gap: "1px" }}>
            <Link
              href="/servizi"
              className="h-background h-color"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "18px",
                minHeight: "88px",
                padding: "16px clamp(16px,1.6vw,22px)",
                background: "var(--bg)",
                color: "var(--ink)",
                textDecoration: "none",
                transition: "background .25s,color .25s",
                "--h-background": "var(--fill-accent)",
                "--h-color": "var(--on-fill)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontFamily: "var(--mono)",
                  fontSize: "12px",
                }}
              >
                <span>01</span>
                <span style={{ fontFamily: "inherit", fontSize: "18px", lineHeight: "1" }}>→</span>
              </div>
              <span style={{ fontWeight: "700", fontSize: "clamp(19px,1.6vw,24px)", letterSpacing: "-.03em", lineHeight: "1" }}>
                Servizi_
              </span>
            </Link>
            <Link
              href="/progetti"
              className="h-background h-color"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "18px",
                minHeight: "88px",
                padding: "16px clamp(16px,1.6vw,22px)",
                background: "var(--bg)",
                color: "var(--ink)",
                textDecoration: "none",
                transition: "background .25s,color .25s",
                "--h-background": "var(--fill-accent)",
                "--h-color": "var(--on-fill)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontFamily: "var(--mono)",
                  fontSize: "12px",
                }}
              >
                <span>02</span>
                <span style={{ fontFamily: "inherit", fontSize: "18px", lineHeight: "1" }}>→</span>
              </div>
              <span style={{ fontWeight: "700", fontSize: "clamp(19px,1.6vw,24px)", letterSpacing: "-.03em", lineHeight: "1" }}>
                Progetti_
              </span>
            </Link>
            <Link
              href="/valori"
              className="h-background h-color"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "18px",
                minHeight: "88px",
                padding: "16px clamp(16px,1.6vw,22px)",
                background: "var(--bg)",
                color: "var(--ink)",
                textDecoration: "none",
                transition: "background .25s,color .25s",
                "--h-background": "var(--fill-accent)",
                "--h-color": "var(--on-fill)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontFamily: "var(--mono)",
                  fontSize: "12px",
                }}
              >
                <span>03</span>
                <span style={{ fontFamily: "inherit", fontSize: "18px", lineHeight: "1" }}>→</span>
              </div>
              <span style={{ fontWeight: "700", fontSize: "clamp(19px,1.6vw,24px)", letterSpacing: "-.03em", lineHeight: "1" }}>
                Valori_
              </span>
            </Link>
            <Link
              href="/metodo"
              className="h-background h-color"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "18px",
                minHeight: "88px",
                padding: "16px clamp(16px,1.6vw,22px)",
                background: "var(--bg)",
                color: "var(--ink)",
                textDecoration: "none",
                transition: "background .25s,color .25s",
                "--h-background": "var(--fill-accent)",
                "--h-color": "var(--on-fill)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontFamily: "var(--mono)",
                  fontSize: "12px",
                }}
              >
                <span>04</span>
                <span style={{ fontFamily: "inherit", fontSize: "18px", lineHeight: "1" }}>→</span>
              </div>
              <span style={{ fontWeight: "700", fontSize: "clamp(19px,1.6vw,24px)", letterSpacing: "-.03em", lineHeight: "1" }}>
                Come lavoriamo_
              </span>
            </Link>
            <Link
              href="/chi-siamo"
              className="h-background h-color"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "18px",
                minHeight: "88px",
                padding: "16px clamp(16px,1.6vw,22px)",
                background: "var(--bg)",
                color: "var(--ink)",
                textDecoration: "none",
                transition: "background .25s,color .25s",
                "--h-background": "var(--fill-accent)",
                "--h-color": "var(--on-fill)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontFamily: "var(--mono)",
                  fontSize: "12px",
                }}
              >
                <span>05</span>
                <span style={{ fontFamily: "inherit", fontSize: "18px", lineHeight: "1" }}>→</span>
              </div>
              <span style={{ fontWeight: "700", fontSize: "clamp(19px,1.6vw,24px)", letterSpacing: "-.03em", lineHeight: "1" }}>
                Chi siamo_
              </span>
            </Link>
            <Link
              href="/news"
              className="h-background h-color"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "18px",
                minHeight: "88px",
                padding: "16px clamp(16px,1.6vw,22px)",
                background: "var(--bg)",
                color: "var(--ink)",
                textDecoration: "none",
                transition: "background .25s,color .25s",
                "--h-background": "var(--fill-accent)",
                "--h-color": "var(--on-fill)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontFamily: "var(--mono)",
                  fontSize: "12px",
                }}
              >
                <span>06</span>
                <span style={{ fontFamily: "inherit", fontSize: "18px", lineHeight: "1" }}>→</span>
              </div>
              <span style={{ fontWeight: "700", fontSize: "clamp(19px,1.6vw,24px)", letterSpacing: "-.03em", lineHeight: "1" }}>News_</span>
            </Link>
            <Link
              href="/contatti"
              className="h-background h-color"
              style={{
                gridColumn: lastSpan,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "18px",
                minHeight: "88px",
                padding: "16px clamp(16px,1.6vw,22px)",
                background: "var(--bg)",
                color: "var(--ink)",
                textDecoration: "none",
                transition: "background .25s,color .25s",
                "--h-background": "var(--fill-accent)",
                "--h-color": "var(--on-fill)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontFamily: "var(--mono)",
                  fontSize: "12px",
                }}
              >
                <span>07</span>
                <span style={{ fontFamily: "inherit", fontSize: "18px", lineHeight: "1" }}>→</span>
              </div>
              <span style={{ fontWeight: "700", fontSize: "clamp(19px,1.6vw,24px)", letterSpacing: "-.03em", lineHeight: "1" }}>
                Contatti_
              </span>
            </Link>
          </div>
        </nav>
      </>
    ) : null}
    <footer style={{ background: "var(--bg)", borderTop: "1px solid var(--line)" }}>
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "40px clamp(20px,4vw,48px) 48px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,200px),1fr))",
          gap: "32px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Link
            href="/"
            style={{
              fontWeight: "700",
              fontSize: "17px",
              letterSpacing: "-.03em",
              color: "var(--ink)",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <img className="cp-only-light" src="/cp/logo-cima-blu.svg" alt="CiMa Progetti" style={{ height: "48px", width: "auto", display: "block" }} />
<img className="cp-only-dark" src="/cp/logo-cima-bianco.svg" alt="CiMa Progetti" style={{ height: "48px", width: "auto" }} />
          </Link>
          <span style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--meta)", lineHeight: "1.7" }}>
            CIMA PROGETTI Srls
            <br />
            Via Otranto 39, 00192 Roma
            <br />
            REA RM-1778381
            <br />
            P.IVA 18328621000
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "15px" }}>
          <span style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--meta)" }}>sito_</span>
          <Link href="/servizi" className="h-color" style={{ color: "var(--ink)", "--h-color": "var(--accent)" }}>
            Servizi
          </Link>
          <Link href="/progetti" className="h-color" style={{ color: "var(--ink)", "--h-color": "var(--accent)" }}>
            Progetti
          </Link>
          <Link href="/valori" className="h-color" style={{ color: "var(--ink)", "--h-color": "var(--accent)" }}>
            Valori
          </Link>
          <Link href="/metodo" className="h-color" style={{ color: "var(--ink)", "--h-color": "var(--accent)" }}>
            Come lavoriamo
          </Link>
          <Link href="/chi-siamo" className="h-color" style={{ color: "var(--ink)", "--h-color": "var(--accent)" }}>
            Chi siamo
          </Link>
          <Link href="/news" className="h-color" style={{ color: "var(--ink)", "--h-color": "var(--accent)" }}>
            News
          </Link>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "15px" }}>
          <span style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--meta)" }}>contatti_</span>
          <a href="mailto:info@cimaprogetti.it" className="h-color" style={{ color: "var(--ink)", "--h-color": "var(--accent)" }}>
            info@cimaprogetti.it
          </a>
          <a href="tel:+393382451171" className="h-color" style={{ color: "var(--ink)", "--h-color": "var(--accent)" }}>
            +39 338 245 1171
          </a>
          <a
            href="mailto:cima.progetti@pec-societa.it"
            className="h-color"
            style={{ color: "var(--ink)", overflowWrap: "anywhere", "--h-color": "var(--accent)" }}
          >
            <span style={{ display: "block", fontFamily: "var(--mono)", fontSize: "12px", color: "var(--meta)", marginBottom: "2px" }}>PEC</span>
            cima.progetti@pec-societa.it
          </a>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "15px" }}>
          <span style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--meta)" }}>legale_</span>
          <a href="/legale#privacy" className="h-color" style={{ color: "var(--ink)", "--h-color": "var(--accent)" }}>
            Privacy policy
          </a>
          <a href="/legale#cookie" className="h-color" style={{ color: "var(--ink)", "--h-color": "var(--accent)" }}>
            Cookie policy
          </a>
          <a href="/legale#termini" className="h-color" style={{ color: "var(--ink)", "--h-color": "var(--accent)" }}>
            Termini e condizioni
          </a>
          <button
            type="button"
            onClick={openConsent}
            className="h-color"
            style={{ padding: 0, border: 0, background: "transparent", textAlign: "left", fontSize: "15px", cursor: "pointer", color: "var(--ink)", "--h-color": "var(--accent)" }}
          >
            Preferenze cookie
          </button>
          <span style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--meta)" }}>© 2026_</span>
        </div>
      </div>
    </footer>
  </>
);
}
