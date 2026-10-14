"use client";
// Hero Home · pannello "dal semplice all'ecosistema" (porting di Home.dc.html, heroVisual="ecosistema").
// Pila di 7 lastre in isometria: parte piatta con una lastra, poi si inclina e ogni ~2,2s
// scende un livello nuovo. Alla fine tutte blu + etichetta "ecosistema" per 3,6s, poi riparte.
// Si ferma al passaggio del mouse; la scala a sinistra è cliccabile.
import React, { useEffect, useRef, useState } from "react";

// Ordine dal basso: consulenza → … → formazione. `plate` = quale illustrazione usare.
const ECO = [
  { plate: 7, label: "consulenza", tag: "consulenza" },
  { plate: 1, label: "presenza digitale", tag: "sito" },
  { plate: 2, label: "software su misura", tag: "software" },
  { plate: 3, label: "automazione", tag: "automazione" },
  { plate: 4, label: "intelligenza artificiale", tag: "IA" },
  { plate: 5, label: "hardware & server", tag: "hardware" },
  { plate: 6, label: "formazione", tag: "formazione" },
];
const N = ECO.length;

const MONO: React.CSSProperties = { fontFamily: "var(--mono)" };

// Illustrazioni astratte delle lastre (unità em = 1cqw del pannello). `acc` = colore d'accento.
function Plate({ n, acc }: { n: number; acc: string }) {
  const t = "background .4s";
  const line = (w: string, bg = "var(--line-soft)", h = "1.4em") => <div style={{ width: w, height: h, background: bg }}></div>;
  switch (n) {
    case 1: // sito
      return (
        <>
          <div style={{ height: "4em", borderBottom: "1px solid var(--line-soft)", display: "flex", alignItems: "center", gap: ".9em", padding: "0 2em" }}>
            <div style={{ width: "1.2em", height: "1.2em", background: "var(--track)" }}></div>
            <div style={{ width: "1.2em", height: "1.2em", background: "var(--track)" }}></div>
            <div style={{ flex: 1, height: "1.6em", background: "var(--subtle)", marginLeft: "1em" }}></div>
          </div>
          <div style={{ padding: "3em 2.4em", display: "flex", flexDirection: "column", gap: "1.6em" }}>
            <div style={{ width: "62%", height: "7em", background: acc, transition: t }}></div>
            {line("80%")}
            {line("52%")}
            <div style={{ width: "14em", height: "3.6em", background: "var(--ink)" }}></div>
          </div>
        </>
      );
    case 2: // software
      return (
        <div style={{ display: "grid", gridTemplateColumns: "11em minmax(0,1fr)", height: "100%" }}>
          <div style={{ borderRight: "1px solid var(--line-soft)", padding: "2.4em 1.8em", display: "flex", flexDirection: "column", gap: "1.4em" }}>
            <div style={{ height: "1.6em", background: acc, transition: t }}></div>
            {line("100%", undefined, "1.2em")}
            {line("100%", undefined, "1.2em")}
            {line("100%", undefined, "1.2em")}
          </div>
          <div style={{ padding: "2.4em", display: "flex", flexDirection: "column", gap: "1.8em" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.4em" }}>
              <div style={{ height: "7em", border: "1px solid var(--track)", borderTop: ".5em solid " + acc, transition: "border-color .4s" }}></div>
              <div style={{ height: "7em", border: "1px solid var(--track)" }}></div>
              <div style={{ height: "7em", border: "1px solid var(--track)" }}></div>
            </div>
            {line("100%", "var(--subtle-3)", "1.6em")}
            {line("100%", "var(--subtle)", "1.6em")}
            {line("100%", "var(--subtle-3)", "1.6em")}
            {line("100%", "var(--subtle)", "1.6em")}
          </div>
        </div>
      );
    case 3: {
      // automazione
      const node = (fill?: boolean) => (
        <div
          style={
            fill
              ? { width: "8em", height: "8em", background: acc, transition: t }
              : { width: "8em", height: "8em", border: "2px solid var(--ink)", background: "var(--bg)" }
          }
        ></div>
      );
      return (
        <>
          <div style={{ position: "absolute", left: "6em", right: "6em", top: "50%", height: "2px", background: "var(--line-strong)" }}></div>
          <div
            style={{
              position: "absolute",
              left: "5em",
              right: "5em",
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {node()}
            {node()}
            {node(true)}
            {node()}
          </div>
          <div style={{ position: "absolute", left: "5em", bottom: "4em", width: "22em", height: "1.4em", background: "var(--line-soft)" }}></div>
        </>
      );
    }
    case 4: // IA
      return (
        <div style={{ padding: "3em", display: "flex", flexDirection: "column", gap: "1.8em", height: "100%" }}>
          <div style={{ alignSelf: "flex-start", width: "58%", height: "6em", background: "var(--subtle-3)" }}></div>
          <div style={{ alignSelf: "flex-end", width: "48%", height: "8em", background: acc, transition: t }}></div>
          <div
            style={{
              marginTop: "auto",
              height: "4.4em",
              border: "2px solid var(--ink)",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              padding: "0 .8em",
            }}
          >
            <div style={{ width: "2.8em", height: "2.8em", background: "var(--ink)" }}></div>
          </div>
        </div>
      );
    case 5: // hardware
      return (
        <div style={{ padding: "3em 3.4em", display: "flex", flexDirection: "column", justifyContent: "center", gap: "1.5em", height: "100%" }}>
          {[0, 1, 2, 3].map((r) => (
            <div key={r} style={{ height: "5.2em", border: "2px solid var(--ink)", display: "flex", alignItems: "center", gap: "1em", padding: "0 1.6em" }}>
              <div style={{ width: "1.4em", height: "1.4em", background: r === 1 ? acc : "var(--line-strong)", transition: t }}></div>
              <div style={{ width: "1.4em", height: "1.4em", background: "var(--line-strong)" }}></div>
              <div style={{ marginLeft: "auto", width: "40%", height: "1.2em", background: "var(--line-soft)" }}></div>
            </div>
          ))}
        </div>
      );
    case 6: // formazione (calendario)
      return (
        <div
          style={{
            padding: "3em",
            display: "grid",
            gridTemplateColumns: "repeat(7,1fr)",
            gap: "1.2em",
            height: "100%",
            alignContent: "center",
          }}
        >
          {Array.from({ length: 14 }, (_, i) => (
            <div
              key={i}
              style={
                [2, 5, 9, 11].includes(i)
                  ? { aspectRatio: "1", background: acc, transition: t }
                  : { aspectRatio: "1", border: "1px solid var(--line)" }
              }
            ></div>
          ))}
          <div style={{ gridColumn: "span 7", height: "1.4em", width: "60%", background: "var(--line-soft)", marginTop: "1em" }}></div>
        </div>
      );
    default: // 7 · consulenza (checklist)
      return (
        <div style={{ padding: "3em 3.4em", display: "flex", flexDirection: "column", justifyContent: "center", gap: "1.6em", height: "100%" }}>
          {["70%", "54%", "62%", "40%"].map((w, r) => (
            <div key={r} style={{ display: "flex", alignItems: "center", gap: "1.4em" }}>
              <div
                style={
                  r === 1
                    ? { width: "2.6em", height: "2.6em", flex: "none", background: acc, transition: t }
                    : { width: "2.6em", height: "2.6em", flex: "none", border: "2px solid var(--ink)" }
                }
              ></div>
              <div style={{ height: "1.4em", width: w, background: "var(--line-soft)" }}></div>
            </div>
          ))}
        </div>
      );
  }
}

export default function HeroEcosystem() {
  const [es, setEs] = useState(0); // 0..N-1 = livelli attivi, N = ecosistema completo
  const [tick, setTick] = useState(0); // riarma il timer anche se `es` non cambia (clic sulla scala)
  const paused = useRef(false);

  useEffect(() => {
    // prefers-reduced-motion: niente ciclo, si mostra subito l'ecosistema completo
    const still = !!window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (still && es === N) return;
    const id = setTimeout(
      () => {
        if (still) setEs(N);
        else if (paused.current) setTick((t) => t + 1);
        else setEs((s) => (s + 1) % (N + 1));
      },
      still ? 0 : es === N ? 3600 : 2200,
    );
    return () => clearTimeout(id);
  }, [es, tick]);

  const fin = es === N;
  const iso = es >= 1;
  const gap = fin ? 6.6 : 5.8;
  const stack = iso
    ? "translate(-3cqw," + (fin ? 17 : 16) + "cqw) rotateX(58deg) rotateZ(-38deg) scale3d(.9,.9,.9)"
    : "translate(0cqw,8cqw) rotateX(0deg) rotateZ(0deg) scale3d(.94,.94,.94)";

  const pick = (k: number) => {
    setEs(k);
    setTick((t) => t + 1);
  };

  return (
    <div
      data-spot="1"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      style={{
        background: "radial-gradient(520px circle at var(--mx,-999px) var(--my,-999px),var(--accent-wash),transparent 60%),var(--bg)",
        border: "1px solid var(--line)",
        boxShadow: "var(--shadow-lift)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
          padding: "14px 18px",
          borderBottom: "1px solid var(--line-soft)",
          ...MONO,
          fontSize: "12px",
          color: "var(--meta)",
        }}
      >
        <span style={{ display: "inline-flex", gap: "8px", alignItems: "center" }}>
          <span style={{ position: "relative", width: "6px", height: "6px" }}>
            <span
              style={{
                position: "absolute",
                inset: 0,
                background: "var(--fill-accent)",
                animation: "cp-ping 1.6s cubic-bezier(0,0,.2,1) infinite",
              }}
            ></span>
            <span style={{ position: "absolute", inset: 0, background: "var(--fill-accent)" }}></span>
          </span>
          {"dal semplice all'ecosistema"}
        </span>
      </div>
      <div style={{ padding: "18px" }}>
        <div
          style={{
            position: "relative",
            aspectRatio: "6/5",
            border: "2px solid var(--ink)",
            backgroundColor: "var(--bg)",
            backgroundImage: "linear-gradient(var(--grid) 1px,transparent 1px),linear-gradient(90deg,var(--grid) 1px,transparent 1px)",
            backgroundSize: "20px 20px",
            overflow: "hidden",
            containerType: "inline-size",
          }}
        >
          {/* scala: ordine inverso (formazione in alto, consulenza in basso) */}
          <div
            style={{
              position: "absolute",
              left: "4cqw",
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              flexDirection: "column",
              gap: "2px",
              width: "27cqw",
              zIndex: 1,
            }}
          >
            {ECO.map((e, k) => {
              const i = k + 1;
              const on = !fin && i === es + 1;
              const done = fin || i <= es + 1;
              return (
                <button
                  key={e.label}
                  onClick={() => pick(k)}
                  aria-pressed={on}
                  style={{
                    order: N - k,
                    width: "100%",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "8px",
                    minHeight: "26px",
                    padding: 0,
                    background: "transparent",
                    border: 0,
                    cursor: "pointer",
                    textAlign: "left",
                    ...MONO,
                    fontSize: "10px",
                    lineHeight: 1.15,
                    color: on ? "var(--accent)" : done ? "var(--ink)" : "var(--meta)",
                    transition: "color .3s",
                  }}
                >
                  <span
                    style={{
                      width: "7px",
                      height: "7px",
                      flex: "none",
                      marginTop: "3px",
                      background: on || fin ? "var(--fill-accent)" : done ? "var(--ink)" : "var(--line)",
                      transition: "background .3s",
                    }}
                  ></span>
                  <span style={{ flex: 1, minWidth: 0 }}>{e.label}</span>
                </button>
              );
            })}
          </div>
          {/* pila isometrica */}
          <div aria-hidden="true" style={{ position: "absolute", left: "37cqw", top: "20cqw", width: "56cqw", height: "36cqw" }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                transformStyle: "preserve-3d",
                transform: stack,
                transition: "transform 1.1s cubic-bezier(.65,0,.35,1)",
              }}
            >
              {ECO.map((e, k) => {
                const i = k + 1;
                const vis = fin || i <= es + 1;
                const on = !fin && i === es + 1;
                const hot = on || fin;
                const last = fin && i === N;
                return (
                  <div
                    key={e.label}
                    style={{
                      position: "absolute",
                      inset: 0,
                      transform: "translateZ(" + ((i - 1) * gap + (vis ? 0 : 24)) + "cqw)",
                      opacity: vis ? 1 : 0,
                      transition: "transform .9s cubic-bezier(.2,.7,.2,1),opacity .5s",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "var(--bg)",
                        border: "2px solid " + (hot ? "var(--fill-accent)" : "var(--line-strong)"),
                        boxShadow: "0 2cqw 3cqw -1.6cqw rgba(0,0,60,.28)",
                        overflow: "hidden",
                        fontSize: "1cqw",
                        transition: "border-color .4s",
                      }}
                    >
                      <Plate n={e.plate} acc={hot ? "var(--fill-accent)" : "var(--track)"} />
                    </div>
                    <span
                      style={{
                        position: "absolute",
                        left: "-2px",
                        top: 0,
                        transform: "translateY(-100%)",
                        background: hot ? "var(--fill-accent)" : "var(--fill-ink)",
                        color: "var(--on-fill)",
                        ...MONO,
                        fontSize: "max(11px,2.2cqw)",
                        lineHeight: 1,
                        padding: "max(4px,.7cqw) max(6px,1cqw)",
                        whiteSpace: "nowrap",
                        opacity: on || last ? 1 : 0,
                        transition: "background .4s,opacity .4s",
                      }}
                    >
                      {last ? "ecosistema" : e.tag}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid var(--line-soft)", padding: "18px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <div
          style={{
            fontWeight: 700,
            fontSize: "clamp(22px,2.2vw,32px)",
            lineHeight: 1.05,
            letterSpacing: "-.03em",
            textTransform: "uppercase",
            color: "var(--accent)",
            textWrap: "balance",
          }}
        >
          Software, hardware, IA &amp; automazioni, consulenza &amp; formazione
        </div>
        <div style={{ fontWeight: 700, fontSize: "clamp(16px,1.3vw,19px)", lineHeight: 1.3, letterSpacing: "-.01em", textWrap: "pretty" }}>
          In un unico posto, per soluzioni connesse.
        </div>
      </div>
      <div style={{ height: "2px", background: "var(--line-soft)" }}>
        <div
          style={{
            height: "100%",
            width: (((es + 1) / (N + 1)) * 100).toFixed(1) + "%",
            background: "var(--fill-accent)",
            transition: "width .7s cubic-bezier(.2,.7,.2,1)",
          }}
        ></div>
      </div>
    </div>
  );
}
