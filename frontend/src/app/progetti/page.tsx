"use client";
// ============================================================
// Progetti — ProjectStack carousel (port of PageProgetti.jsx)
// ============================================================
import React, { useEffect, useState, useRef, useCallback } from "react";
import { Eyebrow as PEyebrow, Icon as PIcon } from "@/components/ds";
import { Placeholder, LogoPlaceholder, CtaFooter } from "@/components/Shared";
import { useReveal } from "@/components/hooks/useReveal";

// ============================================================
// External targets
// ============================================================
const MADAUDO_URL = "https://madaudo.art";
const GIAMPY_URL = "https://giampydogsitter.it/";
// Concept CiMa OS — embed interattivo copiato in /public/concepts/cima-os/
const CIMA_OS_URL = "/concepts/cima-os/index.html";

// ============================================================
// Types
// ============================================================
type Proj = {
  cat: string;
  title: string;
  client?: string;
  desc: string;
  tags: string[];
  live?: boolean;
  demo?: boolean;
  concept?: boolean;
  hints?: string[];
  viewport?: string; // URL: viewport NON interagibile del sito live
  href?: string; // URL reale "Vai al sito"
  embed?: string; // URL: concept interattivo (apre a schermo intero)
};

type ProjCategory = "online" | "demo" | "concept";

type ProgData = Record<
  ProjCategory,
  {
    label: string;
    blurb: string;
    items: Proj[];
  }
>;

// ============================================================
// Data
// ============================================================
const PROGETTI: ProgData = {
  online: {
    label: "Online",
    blurb: "Progetti realizzati e già online. Ogni card mostra una viewport del sito reale; premi \"Vai al sito\" per aprirlo.",
    items: [
      {
        cat: "Sito artista / galleria",
        title: "Madaudo",
        client: "Madaudo Studio",
        desc: "Sito-portfolio per un artista: storytelling visivo, archivio opere, mostre e biografia. Tema WordPress su misura, dark e gallery-forward.",
        tags: ["WordPress", "Portfolio", "Performance"],
        live: true,
        viewport: MADAUDO_URL,
        href: MADAUDO_URL,
      },
      {
        cat: "Sito servizi + area admin",
        title: "Giampy Dog Service",
        client: "Giampy Dog Service · Sassari",
        desc: "Landing page con contenuti, testimonianze, mappa e form contatti, più un pannello admin per gestire testi, SEO, immagini e richieste. Costruito con SvelteKit.",
        tags: ["SvelteKit", "Admin", "Mappa"],
        live: true,
        viewport: GIAMPY_URL,
        href: GIAMPY_URL,
      },
    ],
  },
  demo: {
    label: "Demo",
    blurb: "Prototipi interattivi da provare in prima persona.",
    items: [],
  },
  concept: {
    label: "Concept",
    blurb: "Esplorazioni e visioni di design: idee progettuali raccontate per esteso.",
    items: [
      {
        cat: "Concept",
        title: "CiMa OS — interfaccia",
        desc: "Esplorazione visiva di un sistema operativo AI-driven: un layer di automazioni sotto ogni applicazione, che orchestra agenti e dati con un'unica grammatica visiva. Rende visibile l'invisibile — col controllo umano sempre al centro.",
        tags: ["Concept", "AI OS", "Design system"],
        concept: true,
        embed: CIMA_OS_URL,
      },
      {
        cat: "Concept",
        title: "Cruscotto città 5.0",
        desc: "Visione di una dashboard per la transizione digitale di una PMI: un cruscotto unico che fonde performance operative, sostenibilità e sicurezza in un'unica lettura. L'idea è tradurre la complessità di più sistemi in tre indicatori chiari, leggibili anche da chi non è del settore, con drill-down progressivo per chi vuole approfondire.",
        tags: ["Concept", "Dashboard", "Data viz"],
        concept: true,
      },
    ],
  },
};

const TABS = ["online", "demo", "concept"] as const;

// ============================================================
// Site viewport — iframe live, scalato e NON interagibile
// ============================================================
const VIEWPORT_DESIGN_W = 1440;

function SiteViewport({ url }: { url: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => setBox({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const scale = box.w ? box.w / VIEWPORT_DESIGN_W : 0;
  // L'iframe renderizza a larghezza desktop e viene scalato per riempire la card.
  const frameH = scale ? box.h / scale : 0;

  return (
    <div className="cm-viewport" ref={wrapRef}>
      {scale > 0 && (
        <iframe
          className="cm-viewport__frame"
          src={url}
          title="Anteprima sito (non interagibile)"
          loading="lazy"
          tabIndex={-1}
          aria-hidden="true"
          scrolling="no"
          sandbox="allow-scripts allow-same-origin"
          style={{
            width: VIEWPORT_DESIGN_W,
            height: frameH,
            transform: `scale(${scale})`,
          }}
        />
      )}
      {/* Guard: blocca ogni interazione, la viewport resta puramente visiva */}
      <span className="cm-viewport__guard" aria-hidden="true" />
    </div>
  );
}

// ============================================================
// Components
// ============================================================

function ProjectCardInner({ p, onDemo }: { p: Proj; onDemo: (p: Proj) => void }) {
  return (
    <React.Fragment>
      <div className="cm-stack__shot">
        <div className="cm-stack__chrome">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="cm-stack__screen">
          {p.viewport ? (
            <SiteViewport url={p.viewport} />
          ) : p.embed ? (
            <SiteViewport url={p.embed} />
          ) : (
            <Placeholder label={p.demo ? "Mockup demo" : p.concept ? "Visual concept" : "Screenshot pagina"} icon={p.demo ? "play_circle" : "image"} />
          )}
        </div>
      </div>
      <div className="cm-stack__body">
        <span className="cm-stack__cat">{p.cat}</span>
        <h3 className="cm-stack__title">{p.title}</h3>
        {p.client && <LogoPlaceholder name={p.client} />}
        <p className="cm-stack__desc">{p.desc}</p>
        <div className="cm-stack__tags">
          {p.tags.map((t) => (
            <span className="cm-stack__tag" key={t}>
              {t}
            </span>
          ))}
        </div>
        <div className="cm-stack__actions">
          {p.live && p.href && (
            <a className="cm-stack__arrow" href={p.href} target="_blank" rel="noopener noreferrer" data-cursor="hug">
              Vai al sito <PIcon name="arrow_outward" size={18} />
            </a>
          )}
          {p.demo && (
            <button className="cm-stack__arrow" onClick={() => onDemo(p)} data-cursor="hug">
              Interagisci <PIcon name="touch_app" size={18} />
            </button>
          )}
          {p.embed && (
            <button className="cm-stack__arrow" onClick={() => onDemo(p)} data-cursor="hug">
              Esplora il concept <PIcon name="open_in_full" size={18} />
            </button>
          )}
          {p.concept && !p.embed && <span className="cm-stack__tag" style={{ borderStyle: "dashed" }}>Concept · non disponibile live</span>}
        </div>
      </div>
    </React.Fragment>
  );
}

function ProjectStack({ items, onDemo }: { items: Proj[]; onDemo: (p: Proj) => void }) {
  const [idx, setIdx] = useState(0);
  const startX = useRef<number | null>(null);
  const n = items.length;

  const go = useCallback((d: number) => setIdx((i) => ((i + d) % n + n) % n), [n]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  return (
    <div>
      <div
        className="cm-stack"
        onTouchStart={(e) => {
          startX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (startX.current == null) return;
          const dx = e.changedTouches[0].clientX - startX.current;
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
          startX.current = null;
        }}
      >
        {items.map((p, i) => {
          let offset = i - idx;
          if (offset < -Math.floor(n / 2)) offset += n;
          if (offset > Math.floor(n / 2)) offset -= n;
          const style: React.CSSProperties =
            offset < 0
              ? { transform: "translateX(-130%) rotate(-7deg)", opacity: 0, pointerEvents: "none", zIndex: 0 }
              : (() => {
                  const clamped = Math.min(offset, 3);
                  return {
                    transform: `translateY(${clamped * 18}px) scale(${1 - clamped * 0.045})`,
                    opacity: offset > 3 ? 0 : 1 - clamped * 0.12,
                    zIndex: 20 - offset,
                    pointerEvents: offset === 0 ? "auto" : "none",
                  };
                })();
          return (
            <article className="cm-stack__card" key={p.title} style={style} aria-hidden={offset !== 0}>
              <ProjectCardInner p={p} onDemo={onDemo} />
            </article>
          );
        })}
      </div>

      {n > 1 && (
        <div className="cm-stack__nav">
          <button className="cm-navbtn" onClick={() => go(-1)} aria-label="Precedente" data-cursor="hug">
            <PIcon name="arrow_back" size={24} />
          </button>
          <div className="cm-dots" role="tablist" aria-label="Vai al progetto">
            {items.map((_, i) => (
              <button
                key={i}
                className={"cm-dot" + (i === idx ? " is-active" : "")}
                onClick={() => setIdx(i)}
                aria-label={"Progetto " + (i + 1)}
                data-cursor="hug"
              />
            ))}
          </div>
          <button className="cm-navbtn" onClick={() => go(1)} aria-label="Successivo" data-cursor="hug">
            <PIcon name="arrow_forward" size={24} />
          </button>
        </div>
      )}
    </div>
  );
}

// ============================================================
// Demo — "In arrivo" brandizzato
// ============================================================
function ComingSoon() {
  return (
    <div className="cm-soon">
      <div className="cm-soon__glow" aria-hidden="true" />
      <div className="cm-soon__inner">
        <span className="cm-soon__badge">
          <span className="cm-soon__dot" />
          In arrivo
        </span>
        <h3 className="cm-soon__title">
          Demo interattive<br />in lavorazione
        </h3>
        <p className="cm-soon__sub">
          Stiamo costruendo prototipi da provare in prima persona — assistenti IA, configuratori e funnel. Tornano presto, qui.
        </p>
        <span className="cm-soon__mark">CiMa Progetti</span>
      </div>
    </div>
  );
}

// ============================================================
// Overlay — demo (hints) o concept (embed interattivo)
// ============================================================
function DemoOverlay({ demo, onClose }: { demo: Proj; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="cm-overlay" role="dialog" aria-modal="true" aria-label={demo.title}>
      <div className="cm-overlay__bar">
        <span className="cm-overlay__title">{demo.title}</span>
        <button className="cm-overlay__close" onClick={onClose} data-cursor="hug">
          <PIcon name="close" size={18} /> Chiudi
        </button>
      </div>
      <div className="cm-overlay__frame">
        {demo.embed ? (
          <iframe
            className="cm-overlay__embed"
            src={demo.embed}
            title={demo.title}
            allow="fullscreen"
          />
        ) : (
          <React.Fragment>
            <Placeholder label="Demo interattiva a schermo intero" icon="play_circle" />
            <div className="cm-overlay__hints">
              <h4>Cosa puoi provare</h4>
              <ul>
                {demo.hints?.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

// ============================================================
// Page
// ============================================================

export default function PageProgetti() {
  useReveal();
  const [active, setActive] = useState<ProjCategory>("online");
  const [demo, setDemo] = useState<Proj | null>(null);
  const tabsbarRef = useRef<HTMLDivElement>(null);

  // Publish tab bar height to --tabbar-h so section scroll offsets stay correct.
  useEffect(() => {
    const bar = tabsbarRef.current;
    if (!bar) return;
    const setVar = () =>
      document.documentElement.style.setProperty("--tabbar-h", `${bar.offsetHeight}px`);
    setVar();
    const ro = new ResizeObserver(setVar);
    ro.observe(bar);
    return () => {
      ro.disconnect();
      document.documentElement.style.removeProperty("--tabbar-h");
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const threshold = window.innerHeight * 0.4;
      let cur: ProjCategory = active;
      for (const t of TABS) {
        const el = document.getElementById("prog-" + t);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= threshold) cur = t;
      }
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [active]);

  const jump = (t: ProjCategory) => {
    const el = document.getElementById("prog-" + t);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      <section className="cm-prog-hero">
        <div className="cm-prog-hero__inner cm-reveal">
          <PEyebrow>Progetti</PEyebrow>
          <h1 className="cm-prog-hero__title">Cosa costruiamo</h1>
          <p className="cm-prog-hero__sub">Lavori online, demo interattive e concept. Sfoglia le card o salta tra le categorie.</p>
        </div>
      </section>

      <div className="cm-prog-tabsbar" ref={tabsbarRef}>
        <div className="cm-tabs" role="tablist" aria-label="Categorie progetti">
          {TABS.map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={active === t}
              className={"cm-tab" + (active === t ? " is-active" : "")}
              onClick={() => jump(t)}
              data-cursor="hug"
            >
              {PROGETTI[t].label}
              {PROGETTI[t].items.length > 0 && <span className="cm-tab__count">{PROGETTI[t].items.length}</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="cm-prog">
        {TABS.map((t, ti) => {
          const data = PROGETTI[t];
          return (
            <section className="cm-prog-sec" id={"prog-" + t} key={t}>
              {ti > 0 && <hr className="cm-prog-divider" />}
              <div className="cm-prog-sec__head cm-reveal">
                <span className="cm-prog-sec__num">{String(ti + 1).padStart(2, "0")}</span>
                <div>
                  <h2 className="cm-prog-sec__title">{data.label}</h2>
                  <p className="cm-prog-sec__blurb">{data.blurb}</p>
                </div>
              </div>
              {t === "demo" ? <ComingSoon /> : <ProjectStack items={data.items} onDemo={setDemo} />}
            </section>
          );
        })}
      </div>

      <CtaFooter
        title="IL PROSSIMO<br/>SARAI TU"
        sub="Hai un progetto in mente? Trasformiamolo nel prossimo caso di studio."
      />

      {demo && <DemoOverlay demo={demo} onClose={() => setDemo(null)} />}
    </div>
  );
}
