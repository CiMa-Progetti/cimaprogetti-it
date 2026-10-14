"use client";
// Banner consenso cookie + pannello preferenze. Logica e categorie in src/lib/cp/consent.ts.
// Si riapre da qualsiasi punto con openConsent() (es. "Preferenze cookie" nel footer).
import React, { useEffect, useRef, useState } from "react";
import {
  ALLOW_ALL,
  CONSENT_CATEGORIES,
  DENY_ALL,
  OPEN_CONSENT_EVENT,
  readConsent,
  saveConsent,
  type ConsentChoices,
} from "@/lib/cp/consent";

const MONO: React.CSSProperties = { fontFamily: "var(--mono)", fontSize: "12px" };

const BTN: React.CSSProperties = {
  height: "48px",
  padding: "0 18px",
  fontWeight: 700,
  fontSize: "15px",
  letterSpacing: "-.01em",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background .25s,border-color .25s,color .25s",
};

// "Accetta" e "Rifiuta" hanno lo stesso peso visivo (Garante): stesso stile pieno.
const SOLID: React.CSSProperties = {
  ...BTN,
  border: "1px solid var(--fill-accent)",
  background: "var(--fill-accent)",
  color: "var(--on-fill)",
  "--h-background": "var(--fill-ink)",
  "--h-border-color": "var(--fill-ink)",
  "--h-color": "var(--on-fill)",
};

const OUTLINE: React.CSSProperties = {
  ...BTN,
  border: "1px solid var(--line-strong)",
  background: "var(--bg)",
  color: "var(--ink)",
  "--h-border-color": "var(--ink)",
  "--h-color": "var(--ink)",
};

const LINK: React.CSSProperties = { color: "var(--accent)", textDecoration: "underline", textUnderlineOffset: "3px", "--h-color": "var(--ink)" };

function Toggle({ on, disabled, onChange, label }: { on: boolean; disabled?: boolean; onChange: () => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      disabled={disabled}
      onClick={onChange}
      style={{
        position: "relative",
        flex: "none",
        width: "44px",
        height: "24px",
        padding: 0,
        border: "1px solid " + (on ? "var(--fill-accent)" : "var(--line-strong)"),
        background: on ? "var(--fill-accent)" : "var(--subtle-3)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.55 : 1,
        transition: "background .25s,border-color .25s",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: "3px",
          left: "3px",
          width: "16px",
          height: "16px",
          background: on ? "var(--on-fill)" : "var(--ink)",
          transform: on ? "translateX(20px)" : "none",
          transition: "transform .3s cubic-bezier(.2,.7,.2,1),background .25s",
        }}
      ></span>
    </button>
  );
}

export default function CookieConsent() {
  const [mode, setMode] = useState<"hidden" | "banner" | "prefs">("hidden");
  const [draft, setDraft] = useState<ConsentChoices>(DENY_ALL);
  const prefsRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Primo controllo dopo il montaggio: localStorage non esiste sul server.
    const id = setTimeout(() => {
      if (!readConsent()) setMode("banner");
    }, 0);
    const open = () => {
      lastFocus.current = document.activeElement as HTMLElement | null;
      setDraft(readConsent() ?? DENY_ALL);
      setMode("prefs");
    };
    window.addEventListener(OPEN_CONSENT_EVENT, open);
    return () => {
      clearTimeout(id);
      window.removeEventListener(OPEN_CONSENT_EVENT, open);
    };
  }, []);

  useEffect(() => {
    if (mode !== "prefs") return;
    prefsRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMode(readConsent() ? "hidden" : "banner");
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      lastFocus.current?.focus?.();
    };
  }, [mode]);

  const decide = (c: ConsentChoices) => {
    saveConsent(c);
    setMode("hidden");
  };

  if (mode === "hidden") return null;

  const policyLinks = (
    <>
      Leggi la{" "}
      <a href="/legale#cookie" className="h-color" style={LINK}>
        cookie policy
      </a>{" "}
      e la{" "}
      <a href="/legale#privacy" className="h-color" style={LINK}>
        privacy policy
      </a>
      .
    </>
  );

  if (mode === "banner")
    return (
      <section
        role="region"
        aria-label="Consenso cookie"
        style={{
          position: "fixed",
          left: "max(12px, env(safe-area-inset-left))",
          right: "max(12px, env(safe-area-inset-right))",
          bottom: "max(12px, env(safe-area-inset-bottom))",
          zIndex: 300,
          maxWidth: "460px",
          background: "var(--bg)",
          color: "var(--ink)",
          border: "1px solid var(--line)",
          boxShadow: "var(--shadow-lift)",
          animation: "cp-pop .5s cubic-bezier(.2,.7,.2,1) both",
        }}
      >
        <div style={{ height: "2px", background: "var(--fill-accent)" }}></div>
        <div style={{ padding: "20px 20px 18px", display: "flex", flexDirection: "column", gap: "14px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
            <span style={{ ...MONO, color: "var(--meta)" }}>cookie e privacy_</span>
            <button
              type="button"
              onClick={() => decide(DENY_ALL)}
              aria-label="Chiudi e continua solo con i necessari"
              className="h-color"
              style={{
                width: "36px",
                height: "36px",
                margin: "-8px -8px 0 0",
                border: 0,
                background: "transparent",
                color: "var(--meta)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "--h-color": "var(--ink)",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M6 6l12 12M18 6L6 18" style={{ stroke: "currentColor", strokeWidth: "2.4px", strokeLinecap: "square" }} />
              </svg>
            </button>
          </div>
          <p style={{ margin: 0, fontWeight: 700, fontSize: "20px", lineHeight: 1.15, letterSpacing: "-.025em" }}>
            Solo ciò che serve<span style={{ color: "var(--accent)" }}>_</span>
          </p>
          <p style={{ margin: 0, fontSize: "15px", lineHeight: 1.5, color: "var(--body)", textWrap: "pretty" }}>
            Usiamo solo strumenti necessari al funzionamento del sito. Se in futuro ne aggiungeremo altri, per statistiche o
            marketing, li attiveremo solo con il tuo consenso. {policyLinks}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "4px" }}>
            <button type="button" onClick={() => decide(DENY_ALL)} className="h-background h-border-color h-color" style={SOLID}>
              Rifiuta
            </button>
            <button type="button" onClick={() => decide(ALLOW_ALL)} className="h-background h-border-color h-color" style={SOLID}>
              Accetta tutti
            </button>
            <button
              type="button"
              onClick={() => {
                lastFocus.current = document.activeElement as HTMLElement | null;
                setDraft(DENY_ALL);
                setMode("prefs");
              }}
              className="h-border-color h-color"
              style={{ ...OUTLINE, gridColumn: "span 2" }}
            >
              Personalizza
            </button>
          </div>
        </div>
      </section>
    );

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) setMode(readConsent() ? "hidden" : "banner");
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 300,
        background: "var(--scrim)",
        backdropFilter: "blur(3px)",
        overflowY: "auto",
        padding: "clamp(12px,4vh,48px) clamp(12px,3vw,32px)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        animation: "cp-fade .3s both",
      }}
    >
      <div
        ref={prefsRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cp-consent-title"
        style={{
          width: "min(100%,640px)",
          margin: "auto 0",
          background: "var(--bg)",
          color: "var(--ink)",
          border: "1px solid var(--line)",
          outline: "none",
          animation: "cp-pop .5s cubic-bezier(.2,.7,.2,1) both",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
            height: "60px",
            padding: "0 clamp(20px,3vw,32px)",
            borderBottom: "1px solid var(--line-soft)",
          }}
        >
          <span style={{ ...MONO, color: "var(--meta)" }}>preferenze cookie_</span>
          <button
            type="button"
            onClick={() => setMode(readConsent() ? "hidden" : "banner")}
            aria-label="Chiudi"
            className="h-background"
            style={{
              width: "44px",
              height: "44px",
              marginRight: "-12px",
              border: 0,
              background: "var(--fill-ink)",
              color: "var(--on-fill)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              "--h-background": "var(--fill-accent)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6L6 18" style={{ stroke: "currentColor", strokeWidth: "2.4px", strokeLinecap: "square" }} />
            </svg>
          </button>
        </div>
        <div style={{ padding: "clamp(24px,4vw,36px) clamp(20px,3vw,32px) 8px" }}>
          <h2
            id="cp-consent-title"
            style={{ margin: 0, fontWeight: 700, fontSize: "clamp(28px,3.4vw,40px)", lineHeight: 1, letterSpacing: "-.045em" }}
          >
            Scegli tu<span style={{ color: "var(--accent)" }}>_</span>
          </h2>
          <p style={{ margin: "14px 0 0", fontSize: "15px", lineHeight: 1.55, color: "var(--body)", maxWidth: "52ch", textWrap: "pretty" }}>
            I necessari restano sempre attivi. Le altre categorie sono spente finché non le attivi tu, e puoi cambiare idea quando
            vuoi dal link «Preferenze cookie» in fondo a ogni pagina. {policyLinks}
          </p>
        </div>
        <div style={{ padding: "16px clamp(20px,3vw,32px) 0" }}>
          {CONSENT_CATEGORIES.map((c, i) => {
            const on = c.required || draft[c.id];
            return (
              <div key={c.id} style={{ padding: "18px 0", borderTop: "1px solid var(--line-soft)", display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <span style={{ ...MONO, color: "var(--accent)" }}>{String(i + 1).padStart(2, "0")}</span>
                  <span style={{ flex: 1, fontWeight: 700, fontSize: "18px", letterSpacing: "-.02em" }}>{c.label}</span>
                  {c.required ? <span style={{ ...MONO, color: "var(--meta)" }}>sempre attivi</span> : null}
                  <Toggle
                    on={!!on}
                    disabled={c.required}
                    label={c.label}
                    onChange={() => setDraft((d) => ({ ...d, [c.id]: !d[c.id] }))}
                  />
                </div>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: 1.5, color: "var(--body)", textWrap: "pretty" }}>{c.desc}</p>
                {c.tools.length ? (
                  <ul style={{ margin: 0, padding: 0, listStyle: "none", border: "1px solid var(--track)" }}>
                    {c.tools.map((t, j) => (
                      <li
                        key={t.name}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,130px),1fr))",
                          gap: "2px 16px",
                          padding: "10px 14px",
                          borderTop: j ? "1px solid var(--line-soft)" : undefined,
                        }}
                      >
                        <span style={{ ...MONO, color: "var(--ink)" }}>{t.name}</span>
                        <span style={{ fontSize: "14px", lineHeight: 1.45, color: "var(--body)", gridColumn: "span 2" }}>{t.purpose}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span style={{ ...MONO, color: "var(--meta)" }}>nessuno strumento attivo al momento</span>
                )}
              </div>
            );
          })}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,160px),1fr))",
            gap: "8px",
            padding: "20px clamp(20px,3vw,32px) clamp(20px,3vw,32px)",
            borderTop: "1px solid var(--line-soft)",
          }}
        >
          <button type="button" onClick={() => decide(DENY_ALL)} className="h-background h-border-color h-color" style={SOLID}>
            Rifiuta
          </button>
          <button type="button" onClick={() => decide(ALLOW_ALL)} className="h-background h-border-color h-color" style={SOLID}>
            Accetta tutti
          </button>
          <button type="button" onClick={() => decide(draft)} className="h-border-color h-color" style={OUTLINE}>
            Salva le scelte
          </button>
        </div>
      </div>
    </div>
  );
}
