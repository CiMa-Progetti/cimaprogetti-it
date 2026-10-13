"use client";
// ============================================================
// Header condiviso + modale diagnosi + motore di animazione
// (porting di Nav.dc.html). Il motore anima tutto il documento
// tramite attributi data-*: data-reveal, data-rise(-group), data-grow,
// data-countup, data-spot, data-magnetic, data-dark, data-vtrack/vfill/vdot.
// ============================================================
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CP_DATA } from "@/lib/cp/data";
import { CP_QUIZ, CP_DIAG, OPEN_DIAG_EVENT, type DiagState } from "@/lib/cp/quiz";
import { useTheme } from "@/components/theme/ThemeProvider";

const ITEMS: [string, string, string][] = [
  ["servizi", "Servizi", "/servizi"],
  ["progetti", "Progetti", "/progetti"],
  ["valori", "Valori", "/valori"],
  ["metodo", "Come lavoriamo", "/metodo"],
  ["chisiamo", "Chi siamo", "/chi-siamo"],
  ["news", "News", "/news"],
  ["contatti", "Contatti", "/contatti"],
];

const ACTIVE_BY_PATH: Record<string, string> = {
  "/": "home",
  "/servizi": "servizi",
  "/progetti": "progetti",
  "/valori": "valori",
  "/metodo": "metodo",
  "/chi-siamo": "chisiamo",
  "/news": "news",
  "/contatti": "contatti",
};

type Props = { active: string; pathname: string; theme: "light" | "dark"; toggleTheme: () => void; cursor?: boolean };
type State = { scrolled: boolean; narrow: boolean; menu: boolean; open: boolean; d: DiagState; picked: number | null; t: number; vw: number };

class NavEngine extends React.Component<Props, State> {
  state: State = { scrolled: false, narrow: false, menu: false, open: false, d: { q: 0, answers: {} }, picked: null, t: 0, vw: 1280 };
  cursorRef = React.createRef<HTMLDivElement>();
  barRef = React.createRef<HTMLDivElement>();

  private _sc: HTMLElement | null | undefined;
  private _raf = 0;
  private _mo?: MutationObserver;
  private _io?: IntersectionObserver;
  private _mt?: ReturnType<typeof setTimeout>;
  private _ct?: ReturnType<typeof setTimeout>;
  private _seen?: WeakSet<Element>;
  private _mv?: (e: MouseEvent) => void;
  private _cs?: HTMLStyleElement;
  private _mag?: HTMLElement | null;
  private _busy = false;
  private _leave = () => {
    const c = this.cursorRef.current;
    if (c) c.style.opacity = "0";
  };
  private _enter = () => {
    const c = this.cursorRef.current;
    if (c && this._cs) c.style.opacity = "1";
  };

  onResize = () => {
    const n = window.innerWidth < 1100;
    if (n !== this.state.narrow) this.setState({ narrow: n, menu: false });
    if (window.innerWidth !== this.state.vw) this.setState({ vw: window.innerWidth });
    this._sc = undefined;
    this.tick();
  };
  onScroll = () => {
    if (this._raf) return;
    this._raf = requestAnimationFrame(() => {
      this._raf = 0;
      this.tick();
    });
  };
  onOpen = () => this.open();
  onKey = (e: KeyboardEvent) => this.key(e);

  componentDidMount() {
    this.onResize();
    window.addEventListener("resize", this.onResize);
    window.addEventListener("scroll", this.onScroll, { passive: true, capture: true });
    window.addEventListener(OPEN_DIAG_EVENT, this.onOpen);
    document.addEventListener("keydown", this.onKey);
    this._mo = new MutationObserver(() => {
      clearTimeout(this._mt);
      this._mt = setTimeout(() => {
        this.arm();
        this.tick();
      }, 40);
    });
    this._mo.observe(document.body, { childList: true, subtree: true });
    if ((this.props.cursor ?? true) && matchMedia("(pointer:fine)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches)
      this.pointer();
    this.setState({ d: CP_DIAG.read() });
    if ((location.hash || "") === "#diagnosi") this.open();
    this.arm();
    this.tick();
  }

  componentDidUpdate(prev: Props) {
    if (prev.pathname !== this.props.pathname) {
      if (this.state.menu) this.setState({ menu: false });
      this._sc = undefined;
      requestAnimationFrame(() => {
        this.arm();
        this.tick();
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
    window.removeEventListener("scroll", this.onScroll, { capture: true });
    window.removeEventListener(OPEN_DIAG_EVENT, this.onOpen);
    document.removeEventListener("keydown", this.onKey);
    this._mo?.disconnect();
    this._io?.disconnect();
    clearTimeout(this._mt);
    clearTimeout(this._ct);
    if (this._mv) document.removeEventListener("mousemove", this._mv);
    document.documentElement.removeEventListener("mouseleave", this._leave);
    document.documentElement.removeEventListener("mouseenter", this._enter);
    this._cs?.remove();
    document.querySelectorAll<HTMLElement>("[data-armed]:not([data-shown])").forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    this.lock(false);
  }

  scroller(): HTMLElement | null {
    if (this._sc !== undefined) return this._sc;
    let el = document.querySelector("main") as HTMLElement | null;
    while (el && el !== document.body) {
      const o = getComputedStyle(el).overflowY;
      if ((o === "auto" || o === "scroll") && el.scrollHeight > el.clientHeight) {
        this._sc = el;
        return el;
      }
      el = el.parentElement;
    }
    this._sc = null;
    return null;
  }
  lock(on: boolean) {
    this._sc = undefined;
    const s = this.scroller();
    const v = on ? "hidden" : "";
    document.documentElement.style.overflow = v;
    document.body.style.overflow = v;
    if (s) s.style.overflow = v;
  }
  open() {
    this.setState((s) => ({ open: true, menu: false, t: s.t + 1 }));
    this.lock(true);
  }
  close() {
    this.setState({ open: false });
    this.lock(false);
    if (location.hash === "#diagnosi") history.replaceState(null, "", location.pathname + location.search);
  }
  key(e: KeyboardEvent) {
    if (!this.state.open) {
      if (e.key === "Escape" && this.state.menu) this.setState({ menu: false });
      return;
    }
    if (e.key === "Escape") {
      this.close();
      return;
    }
    if (CP_DIAG.done(this.state.d)) return;
    const m: Record<string, number> = { "1": 0, "2": 1, "3": 2, "4": 3, a: 0, b: 1, c: 2, d: 3 };
    const k = e.key.toLowerCase();
    if (k in m) {
      e.preventDefault();
      this.pick(m[k]);
    } else if (e.key === "Backspace" || e.key === "ArrowLeft") {
      e.preventDefault();
      this.back();
    }
  }
  pick(i: number) {
    if (this._busy) return;
    this._busy = true;
    this.setState({ picked: i });
    setTimeout(() => {
      const d = this.state.d;
      const nd: DiagState = { q: d.q + 1, answers: { ...d.answers, [d.q]: i } };
      CP_DIAG.write(nd);
      this._busy = false;
      this.setState((s) => ({ d: nd, picked: null, t: s.t + 1 }));
      const sc = document.querySelector("[data-diag-scroll]");
      if (sc) sc.scrollTop = 0;
    }, 280);
  }
  back() {
    const d = this.state.d;
    if (d.q <= 0) return;
    const nd = { ...d, q: Math.min(d.q, CP_QUIZ.length) - 1 };
    CP_DIAG.write(nd);
    this.setState((s) => ({ d: nd, t: s.t + 1 }));
  }
  restart() {
    const nd = { q: 0, answers: {} };
    CP_DIAG.write(nd);
    this.setState((s) => ({ d: nd, t: s.t + 1 }));
  }

  tick() {
    const s = this.scroller();
    const y = s ? s.scrollTop : window.scrollY;
    const max = s ? s.scrollHeight - s.clientHeight : document.documentElement.scrollHeight - window.innerHeight;
    if (this.barRef.current) this.barRef.current.style.width = (max > 0 ? Math.min(100, (y / max) * 100) : 0) + "%";
    const sc = y > 8;
    if (sc !== this.state.scrolled) this.setState({ scrolled: sc });
    const vh = window.innerHeight;
    document.querySelectorAll<HTMLElement>("[data-vtrack]").forEach((tr) => {
      const r = tr.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, (vh * 0.55 - r.top) / r.height));
      const f = tr.querySelector<HTMLElement>("[data-vfill]");
      if (f) f.style.transform = "scaleY(" + p.toFixed(3) + ")";
      tr.querySelectorAll<HTMLElement>("[data-vdot]").forEach((dt) => {
        const on = dt.getBoundingClientRect().top < vh * 0.55;
        dt.style.background = on ? "var(--fill-accent)" : "var(--bg)";
        dt.style.borderColor = on ? "var(--fill-accent)" : "var(--line-strong)";
      });
    });
  }

  arm() {
    if (!("IntersectionObserver" in window)) return;
    const E = "cubic-bezier(.16,1,.3,1)";
    this._seen = this._seen || new WeakSet();
    if (!this._io)
      this._io = new IntersectionObserver(
        (es) =>
          es.forEach((e) => {
            if (!e.isIntersecting) return;
            const tg = e.target as HTMLElement;
            this._io!.unobserve(tg);
            if (tg.dataset.riseMask) tg.querySelectorAll<HTMLElement>("[data-rise]").forEach((r) => this.show(r));
            else this.show(tg);
          }),
        { threshold: 0.01, rootMargin: "0px 0px -6% 0px" }
      );
    document.querySelectorAll<HTMLElement>("[data-reveal],[data-rise],[data-grow],[data-countup]").forEach((el) => {
      if (this._seen!.has(el) || el.dataset.shown) return;
      this._seen!.add(el);
      if (!el.dataset.armed) {
        el.dataset.armed = "1";
        let d = Number(el.dataset.delay || 0);
        if (el.hasAttribute("data-rise")) {
          const g = el.closest("[data-rise-group]");
          if (g) d += Array.from(g.querySelectorAll("[data-rise]")).indexOf(el) * 90;
          el.style.transform = "translateY(105%)";
          el.style.transition = "transform 1.1s " + E + " " + d + "ms";
        } else if (el.hasAttribute("data-grow")) {
          const y = el.dataset.grow === "y";
          el.style.transformOrigin = y ? "top" : "left";
          el.style.transform = y ? "scaleY(0)" : "scaleX(0)";
          el.style.transition = "transform 1.4s " + E + " " + d + "ms";
        } else if (el.hasAttribute("data-reveal")) {
          el.style.opacity = "0";
          el.style.transform = "translateY(18px)";
          el.style.transition = "opacity .9s " + E + " " + d + "ms, transform .9s " + E + " " + d + "ms";
        }
      }
      if (el.hasAttribute("data-rise")) {
        const m = el.parentElement;
        if (m && !this._seen!.has(m)) {
          this._seen!.add(m);
          m.dataset.riseMask = "1";
          this._io!.observe(m);
        }
      } else this._io!.observe(el);
    });
  }
  show(el: HTMLElement) {
    el.dataset.shown = "1";
    if (el.hasAttribute("data-rise") || el.hasAttribute("data-grow") || el.hasAttribute("data-reveal")) {
      el.style.opacity = "1";
      el.style.transform = "none";
    }
    if (el.hasAttribute("data-countup")) this.count(el);
  }
  count(el: HTMLElement) {
    if (el.dataset.counted) return;
    el.dataset.counted = "1";
    const n = Array.from(el.childNodes).find((c) => c.nodeType === 3);
    if (!n || !/\d/.test(n.nodeValue || "")) return;
    const fin = n.nodeValue as string,
      st = performance.now(),
      dur = 1400;
    let last: string | null = null;
    const fr = (now: number) => {
      if (last !== null && n.nodeValue !== last) return;
      const t = Math.min(1, (now - st) / dur),
        k = 1 - Math.pow(1 - t, 3);
      last = t < 1 ? fin.replace(/\d+/g, (m) => String(Math.round(Number(m) * k))) : fin;
      n.nodeValue = last;
      if (t < 1) requestAnimationFrame(fr);
    };
    requestAnimationFrame(fr);
  }

  pointer() {
    const c = this.cursorRef.current;
    if (!c) return;
    const rgb = (el: Element) => {
      const m = getComputedStyle(el).backgroundColor.match(/rgba?\(([^)]+)\)/);
      if (!m) return null;
      const v = m[1].split(/[ ,/]+/).filter(Boolean).map(Number);
      return (v.length > 3 ? v[3] : 1) > 0.5 ? v : null;
    };
    // Su fondo scuro (o blu, nel tema scuro) il cursore diventa bianco.
    const dark = (el: Element | null) => {
      const darkTheme = this.props.theme === "dark";
      while (el && el.nodeType === 1) {
        if ((el as HTMLElement).dataset?.dark) return true;
        const v = rgb(el);
        if (v) {
          if (darkTheme) return v[2] > 160 && v[0] < 90 && v[1] < 90;
          return (0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]) / 255 < 0.45;
        }
        el = el.parentElement;
      }
      return false;
    };
    const paint = (t: Element | null, hot: Element | null) => {
      const col = t && dark(t) ? "#fff" : "var(--accent)";
      c.style.background = hot ? "transparent" : col;
      c.style.borderColor = hot ? col : "transparent";
    };
    const HOT = 'a,button,[role="button"],label';
    this._mv = (e: MouseEvent) => {
      if (!this._cs) {
        c.style.opacity = "1";
        const st = document.createElement("style");
        st.textContent = "*{cursor:none!important}";
        document.head.appendChild(st);
        this._cs = st;
      }
      const t = e.target instanceof Element ? e.target : null;
      const hot = t && t.closest(HOT);
      c.style.transform = "translate3d(" + e.clientX + "px," + e.clientY + "px,0) translate(-50%,-50%) scale(" + (hot ? 2.8 : 1) + ")";
      paint(t, hot);
      clearTimeout(this._ct);
      const x = e.clientX,
        y = e.clientY;
      this._ct = setTimeout(() => {
        const el = document.elementFromPoint(x, y);
        if (el && el !== c) paint(el, el.closest(HOT));
      }, 320);
      const sp = t && (t.closest("[data-spot]") as HTMLElement | null);
      if (sp) {
        const r = sp.getBoundingClientRect();
        sp.style.setProperty("--mx", e.clientX - r.left + "px");
        sp.style.setProperty("--my", e.clientY - r.top + "px");
      }
      const mg = t && (t.closest("[data-magnetic]") as HTMLElement | null);
      if (this._mag && this._mag !== mg) this._mag.style.translate = "0px 0px";
      if (mg) {
        if (!mg.dataset.magArmed) {
          mg.dataset.magArmed = "1";
          mg.style.transition = (mg.style.transition ? mg.style.transition + "," : "") + "translate .35s cubic-bezier(.2,.7,.2,1)";
        }
        const r = mg.getBoundingClientRect();
        mg.style.translate = ((e.clientX - r.left - r.width / 2) * 0.16).toFixed(1) + "px " + ((e.clientY - r.top - r.height / 2) * 0.3).toFixed(1) + "px";
      }
      this._mag = mg;
    };
    document.addEventListener("mousemove", this._mv, { passive: true });
    document.documentElement.addEventListener("mouseleave", this._leave);
    document.documentElement.addEventListener("mouseenter", this._enter);
  }

  render() {
    const a = this.props.active;
    const { narrow, menu, open, d, picked, t, scrolled, vw } = this.state;
    const isDark = this.props.theme === "dark";
    const items = ITEMS.map(([id, label, href]) => ({ label, href, line: a === id ? "scaleX(1)" : "scaleX(0)" }));
    const menuOpen = narrow && menu;
    const toggleMenu = () => this.setState((s) => ({ menu: !s.menu }));

    const Q = CP_QUIZ,
      D = CP_DATA,
      G = CP_DIAG;
    const N = Q.length,
      done = G.done(d),
      pad = (n: number) => String(n).padStart(2, "0");
    const scores = G.scores(d),
      top = G.top(d);
    const svc: Record<string, any> = Object.fromEntries(D.services.map((s: any) => [s.id, s]));
    const cur = Q[Math.min(d.q, N - 1)];
    const sel = picked != null ? picked : d.answers[d.q];
    const dOpts = done
      ? []
      : cur.opts.map((o, i) => {
          const on = sel === i;
          return {
            key: String(i + 1),
            t: o.t,
            bg: on ? "var(--fill-accent)" : "var(--bg)",
            fg: on ? "var(--on-fill)" : "var(--ink)",
            bd: on ? "var(--fill-accent)" : "var(--line)",
            kbd: on ? "rgba(255,255,255,.6)" : "var(--line-strong)",
            pick: () => this.pick(i),
          };
        });
    const maxS = Math.max(6, ...Object.values(scores));
    const dProfile = D.services.map((s: any) => {
      const on = top.includes(s.id);
      return {
        title: s.title,
        w: ((scores[s.id] / maxS) * 100).toFixed(1) + "%",
        c: on ? "var(--fill-accent)" : "var(--accent-soft)",
        fg: on ? "var(--ink)" : "var(--meta)",
        weight: on ? 700 : 400,
      };
    });
    const reason = (id: string) => {
      let best = "",
        bv = 0;
      Object.keys(d.answers).forEach((k) => {
        const qi = +k;
        if (qi >= d.q) return;
        const o = Q[qi].opts[d.answers[k]];
        const v = (o && o.s[id]) || 0;
        if (v > bv) {
          bv = v;
          best = o.t;
        }
      });
      return best.toLowerCase();
    };
    const dTop = top.map((id, i) => ({ ...svc[id], rank: pad(i + 1), reason: reason(id), href: "/servizi#" + id, delay: i * 120 + "ms" }));
    const body =
      "Buongiorno,\n\nabbiamo fatto la diagnosi sul vostro sito. Priorità emerse:\n" +
      (dTop.length ? dTop.map((x) => x.rank + " " + x.title + " (" + x.range + ")").join("\n") : "nessuna evidente") +
      "\n\nVorremmo fissare il sopralluogo gratuito.\n";
    const first = dTop[0];
    const diagLabel = narrow
      ? done
        ? "Cosa ti serve →"
        : "Cosa ti serve?"
      : done
        ? "Ecco cosa ti serve davvero →"
        : d.q > 0
          ? "Mancano " + (N - d.q) + " domande →"
          : "Cosa ti serve davvero? →";
    const dCounter = done ? "completata" : pad(d.q + 1) + " / " + pad(N);
    const dPct = (done ? 100 : (d.q / N) * 100) + "%";
    const dGrid = narrow ? "minmax(0,1fr)" : "minmax(0,1.55fr) minmax(300px,1fr)";
    const dOptCols = vw < 560 ? "minmax(0,1fr)" : "repeat(2,minmax(0,1fr))";
    const dAnim = (t % 2 ? "cp-q" : "cp-q2") + " .45s cubic-bezier(.2,.7,.2,1) both";
    const dAsideNote = done
      ? "in blu le tue tre priorità. il preventivo vero arriva dopo il sopralluogo_"
      : "ogni risposta sposta le barre: è così che leggiamo un’azienda_";
    const dHeadline = dTop.length ? "Da dove partiremmo_" : "Sembra tutto in ordine_";
    const dSub = first
      ? "Sono emerse " +
        dTop.length +
        " priorità. Partiremmo dalla prima: di solito " +
        first.range +
        ", in " +
        first.duration +
        ". Il numero vero lo scriviamo dopo il sopralluogo, gratuito."
      : "Dalle risposte non emergono problemi evidenti. I più costosi sono quelli che non si vedono: un sopralluogo gratuito lo conferma.";
    const dMail = "mailto:info@cimaprogetti.it?subject=" + encodeURIComponent("Diagnosi dal sito") + "&body=" + encodeURIComponent(body);

    const themeBtn = (
      <button
        onClick={this.props.toggleTheme}
        role="switch"
        aria-checked={isDark}
        aria-label={isDark ? "Passa al tema chiaro" : "Passa al tema scuro"}
        title={isDark ? "Tema chiaro" : "Tema scuro"}
        className="h-border-color h-color"
        suppressHydrationWarning
        style={{
          width: "52px",
          height: "52px",
          flex: "none",
          border: "1px solid var(--line)",
          background: "var(--bg)",
          color: "var(--ink)",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "border-color .2s,color .2s",
          "--h-border-color": "var(--accent)",
          "--h-color": "var(--accent)",
        }}
      >
        {/* sole nel tema scuro (per tornare al chiaro), luna nel tema chiaro */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <g className="cp-only-dark" style={{ stroke: "currentColor", strokeWidth: "2.2px", strokeLinecap: "square" }}>
            <rect x="8" y="8" width="8" height="8" />
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" />
          </g>
          <path
            className="cp-only-light"
            d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"
            style={{ stroke: "currentColor", strokeWidth: "2.2px", strokeLinejoin: "miter" }}
          />
        </svg>
      </button>
    );

    return (
      <>
        <div
          ref={this.cursorRef}
          aria-hidden="true"
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            width: "12px",
            height: "12px",
            background: "var(--accent)",
            border: "1.5px solid transparent",
            zIndex: 1000,
            pointerEvents: "none",
            opacity: 0,
            transition: "transform .12s ease-out,background .2s,border-color .2s,opacity .3s",
            willChange: "transform",
          }}
        ></div>
        <header
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            background: "var(--glass)",
            backdropFilter: "saturate(1.6) blur(14px)",
            WebkitBackdropFilter: "saturate(1.6) blur(14px)",
            borderBottom: `1px solid ${scrolled ? "var(--line)" : "transparent"}`,
            transition: "border-color .3s",
          }}
        >
          <div
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              padding: "0 clamp(20px,4vw,48px)",
              height: "72px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "20px",
            }}
          >
            <Link
              href="/"
              style={{
                fontWeight: 700,
                fontSize: "18px",
                letterSpacing: "-.03em",
                color: "var(--ink)",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                flex: "none",
              }}
            >
              <img className="cp-only-light" src="/cp/logo-cima-blu.svg" alt="CiMa Progetti" style={{ height: "40px", width: "auto", display: "block" }} />
              <img className="cp-only-dark" src="/cp/logo-cima-bianco.svg" alt="CiMa Progetti" style={{ height: "40px", width: "auto" }} />
            </Link>
            <nav style={{ display: narrow ? "none" : "flex", gap: "2px", alignItems: "center" }}>
              {items.map((m) => (
                <Link
                  key={m.href}
                  href={m.href}
                  className="h-color"
                  style={{
                    position: "relative",
                    color: "var(--ink)",
                    fontSize: "15px",
                    padding: "0 14px",
                    height: "44px",
                    display: "inline-flex",
                    alignItems: "center",
                    transition: "color .2s",
                    "--h-color": "var(--accent)",
                  }}
                >
                  {m.label}
                  <span
                    style={{
                      position: "absolute",
                      left: "14px",
                      right: "14px",
                      bottom: "6px",
                      height: "2px",
                      background: "var(--accent)",
                      transformOrigin: "left",
                      transform: m.line,
                      transition: "transform .4s cubic-bezier(.2,.7,.2,1)",
                    }}
                  ></span>
                </Link>
              ))}
            </nav>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: "none" }}>
              {themeBtn}
              {narrow ? (
                <button
                  onClick={toggleMenu}
                  aria-expanded={menuOpen}
                  style={{
                    height: "52px",
                    padding: "0 14px",
                    border: "1px solid var(--line)",
                    background: "var(--bg)",
                    color: "var(--ink)",
                    cursor: "pointer",
                    fontFamily: "var(--mono)",
                    fontSize: "12px",
                  }}
                >
                  {menu ? "chiudi" : "menu"}
                </button>
              ) : null}
              <button
                data-magnetic="1"
                onClick={() => this.open()}
                className="h-background"
                style={{
                  height: "52px",
                  padding: "0 20px",
                  background: "var(--fill-accent)",
                  color: "var(--on-fill)",
                  border: 0,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "14px",
                  fontWeight: 700,
                  fontSize: "15px",
                  letterSpacing: "-.01em",
                  cursor: "pointer",
                  transition: "background .25s",
                  "--h-background": "var(--fill-ink)",
                }}
              >
                <span>{diagLabel}</span>
              </button>
            </div>
          </div>
          <div style={{ position: "absolute", left: 0, right: 0, bottom: "-1px", height: "2px" }}>
            <div ref={this.barRef} style={{ height: "100%", width: 0, background: "var(--fill-accent)" }}></div>
          </div>
        </header>

        {menuOpen ? (
          <div
            style={{
              position: "fixed",
              top: "72px",
              left: 0,
              right: 0,
              zIndex: 49,
              background: "var(--bg)",
              borderBottom: "1px solid var(--line)",
              padding: "8px clamp(20px,4vw,48px) 24px",
              animation: "cp-in .3s both",
            }}
          >
            {items.map((m) => (
              <Link
                key={m.href}
                href={m.href}
                onClick={() => this.setState({ menu: false })}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "16px 0",
                  borderBottom: "1px solid var(--line-soft)",
                  color: "var(--ink)",
                  fontWeight: 700,
                  fontSize: "22px",
                  letterSpacing: "-.02em",
                }}
              >
                {m.label}
                <span style={{ color: "var(--accent)" }}>→</span>
              </Link>
            ))}
          </div>
        ) : null}

        {open ? (
          <div
            data-diag-scroll="1"
            role="dialog"
            aria-modal="true"
            aria-label="Diagnosi"
            style={{ position: "fixed", inset: 0, zIndex: 200, background: "var(--bg)", color: "var(--ink)", overflowY: "auto", animation: "cp-fade .3s both" }}
          >
            <div
              style={{
                position: "sticky",
                top: 0,
                zIndex: 2,
                background: "var(--glass-strong)",
                backdropFilter: "blur(12px)",
                borderBottom: "1px solid var(--line-soft)",
              }}
            >
              <div
                style={{
                  maxWidth: "1280px",
                  margin: "0 auto",
                  padding: "0 clamp(20px,4vw,48px)",
                  height: "72px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "16px",
                }}
              >
                <span style={{ display: "inline-flex", alignItems: "center", gap: "12px", fontWeight: 700, fontSize: "17px", letterSpacing: "-.02em" }}>
                  <span style={{ width: "14px", height: "14px", background: "var(--fill-accent)", display: "inline-block" }}></span>Diagnosi
                  <span style={{ fontFamily: "var(--mono)", fontSize: "12px", fontWeight: 400, color: "var(--meta)" }}>{dCounter}</span>
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  {d.q > 0 ? (
                    <button
                      onClick={() => this.back()}
                      className="h-border-color"
                      style={{
                        height: "44px",
                        padding: "0 14px",
                        border: "1px solid var(--line)",
                        background: "var(--bg)",
                        color: "var(--ink)",
                        cursor: "pointer",
                        fontFamily: "var(--mono)",
                        fontSize: "12px",
                        transition: "border-color .2s",
                        "--h-border-color": "var(--ink)",
                      }}
                    >
                      ← indietro
                    </button>
                  ) : null}
                  <button
                    onClick={() => this.close()}
                    aria-label="chiudi"
                    className="h-background"
                    style={{
                      width: "44px",
                      height: "44px",
                      border: 0,
                      background: "var(--fill-ink)",
                      color: "var(--on-fill)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "background .2s",
                      "--h-background": "var(--fill-accent)",
                    }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path d="M6 6l12 12M18 6L6 18" style={{ stroke: "currentColor", strokeWidth: "2.4px", strokeLinecap: "square" }} />
                    </svg>
                  </button>
                </div>
              </div>
              <div style={{ height: "2px", background: "var(--track)" }}>
                <div style={{ height: "100%", width: dPct, background: "var(--fill-accent)", transition: "width .6s cubic-bezier(.2,.7,.2,1)" }}></div>
              </div>
            </div>
            <div
              style={{
                maxWidth: "1280px",
                margin: "0 auto",
                padding: "clamp(32px,6vh,72px) clamp(20px,4vw,48px) 72px",
                display: "grid",
                gridTemplateColumns: dGrid,
                gap: "40px 56px",
                alignItems: "start",
              }}
            >
              <div>
                {!done ? (
                  <div key={t} style={{ animation: dAnim }}>
                    <div style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--meta)" }}>
                      domanda {pad(d.q + 1)} / {pad(N)} · scegli una risposta, o premi 1–4_
                    </div>
                    <h2
                      style={{
                        fontWeight: 700,
                        fontSize: "clamp(30px,3.8vw,56px)",
                        lineHeight: 1.02,
                        letterSpacing: "-.035em",
                        margin: "18px 0 12px",
                        textWrap: "balance",
                      }}
                    >
                      {cur.q}
                    </h2>
                    <div style={{ fontFamily: "var(--mono)", fontSize: "13px", color: "var(--meta)" }}>{cur.hint}</div>
                    <div style={{ display: "grid", gridTemplateColumns: dOptCols, gap: "10px", marginTop: "36px" }}>
                      {dOpts.map((o) => (
                        <button
                          key={o.key}
                          onClick={o.pick}
                          className="h-border-color h-transform"
                          style={{
                            textAlign: "left",
                            minHeight: "112px",
                            padding: "18px",
                            border: `1px solid ${o.bd}`,
                            background: o.bg,
                            color: o.fg,
                            cursor: "pointer",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            gap: "20px",
                            transition: "background .2s,border-color .2s,color .2s,transform .25s cubic-bezier(.2,.7,.2,1)",
                            "--h-border-color": "var(--accent)",
                            "--h-transform": "translateY(-3px)",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "var(--mono)",
                              fontSize: "11px",
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "26px",
                              height: "26px",
                              border: `1px solid ${o.kbd}`,
                            }}
                          >
                            {o.key}
                          </span>
                          <span style={{ fontWeight: 700, fontSize: "18px", letterSpacing: "-.01em", lineHeight: 1.25 }}>{o.t}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div style={{ animation: "cp-in .5s cubic-bezier(.2,.7,.2,1) both" }}>
                    <div style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--meta)" }}>risultato · resta salvato mentre navighi il sito_</div>
                    <h2 style={{ fontWeight: 700, fontSize: "clamp(34px,4.4vw,64px)", lineHeight: 1, letterSpacing: "-.04em", margin: "18px 0 16px" }}>
                      {dHeadline}
                    </h2>
                    <p style={{ margin: 0, fontSize: "18px", lineHeight: 1.5, color: "var(--body)", maxWidth: "640px", textWrap: "pretty" }}>{dSub}</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "32px" }}>
                      {dTop.map((x) => (
                        <Link
                          key={x.id}
                          href={x.href}
                          onClick={() => this.close()}
                          className="h-border-color h-color"
                          style={{
                            display: "grid",
                            gridTemplateColumns: "44px minmax(0,1fr) auto",
                            gap: "18px",
                            alignItems: "center",
                            padding: "20px",
                            border: "1px solid var(--line)",
                            color: "var(--ink)",
                            animation: "cp-in .5s cubic-bezier(.2,.7,.2,1) both",
                            animationDelay: x.delay,
                            transition: "border-color .2s",
                            "--h-border-color": "var(--accent)",
                            "--h-color": "var(--ink)",
                          }}
                        >
                          <span
                            style={{
                              width: "44px",
                              height: "44px",
                              background: "var(--fill-accent)",
                              color: "var(--on-fill)",
                              fontFamily: "var(--mono)",
                              fontSize: "13px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {x.rank}
                          </span>
                          <span style={{ minWidth: 0 }}>
                            <span
                              style={{
                                display: "block",
                                color: "var(--accent)",
                                fontWeight: 700,
                                fontSize: "19px",
                                letterSpacing: "-.01em",
                                textTransform: "uppercase",
                                lineHeight: 1.1,
                              }}
                            >
                              {x.title}
                            </span>
                            <span style={{ display: "block", fontFamily: "var(--mono)", fontSize: "12px", color: "var(--meta)", marginTop: "8px", lineHeight: 1.5 }}>
                              perché hai risposto «{x.reason}»
                            </span>
                          </span>
                          <span style={{ textAlign: "right", fontFamily: "var(--mono)", fontSize: "12px", whiteSpace: "nowrap", lineHeight: 1.6 }}>
                            <span style={{ display: "block" }}>{x.range}</span>
                            <span style={{ display: "block", color: "var(--meta)" }}>{x.duration}</span>
                          </span>
                        </Link>
                      ))}
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "28px" }}>
                      <a
                        href={dMail}
                        className="h-background h-color"
                        style={{
                          height: "56px",
                          padding: "0 22px",
                          background: "var(--fill-accent)",
                          color: "var(--on-fill)",
                          fontWeight: 700,
                          fontSize: "15px",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "12px",
                          transition: "background .25s",
                          "--h-background": "var(--fill-ink)",
                          "--h-color": "var(--on-fill)",
                        }}
                      >
                        Inviaci il risultato →
                      </a>
                      <Link
                        href="/servizi"
                        onClick={() => this.close()}
                        className="h-border-color h-color"
                        style={{
                          height: "56px",
                          padding: "0 22px",
                          border: "1px solid var(--line-strong)",
                          color: "var(--ink)",
                          fontWeight: 700,
                          fontSize: "15px",
                          display: "inline-flex",
                          alignItems: "center",
                          transition: "border-color .2s",
                          "--h-border-color": "var(--ink)",
                          "--h-color": "var(--ink)",
                        }}
                      >
                        Vedi i servizi
                      </Link>
                      <button
                        onClick={() => this.restart()}
                        style={{
                          height: "56px",
                          padding: "0 18px",
                          border: 0,
                          background: "transparent",
                          color: "var(--ink)",
                          cursor: "pointer",
                          fontFamily: "var(--mono)",
                          fontSize: "12px",
                          textDecoration: "underline",
                        }}
                      >
                        rifai la diagnosi
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <aside style={{ background: "var(--subtle)", border: "1px solid var(--line-soft)", padding: "24px", position: "sticky", top: "104px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px", gap: "12px" }}>
                  <span style={{ fontWeight: 700, fontSize: "15px" }}>Profilo in tempo reale</span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "var(--mono)", fontSize: "11px", color: "var(--meta)" }}>
                    <span style={{ position: "relative", width: "6px", height: "6px" }}>
                      <span
                        style={{ position: "absolute", inset: 0, background: "var(--fill-accent)", animation: "cp-ping 1.6s cubic-bezier(0,0,.2,1) infinite" }}
                      ></span>
                      <span style={{ position: "absolute", inset: 0, background: "var(--fill-accent)" }}></span>
                    </span>
                    live
                  </span>
                </div>
                {dProfile.map((r: any) => (
                  <div
                    key={r.title}
                    style={{ display: "grid", gridTemplateColumns: "minmax(0,1.2fr) minmax(0,1fr)", gap: "12px", alignItems: "center", padding: "7px 0" }}
                  >
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: r.weight,
                        color: r.fg,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        transition: "color .3s",
                      }}
                    >
                      {r.title}
                    </span>
                    <span style={{ height: "6px", background: "var(--track)", position: "relative", overflow: "hidden" }}>
                      <span
                        style={{
                          position: "absolute",
                          left: 0,
                          top: 0,
                          bottom: 0,
                          width: r.w,
                          background: r.c,
                          transition: "width .8s cubic-bezier(.2,.7,.2,1),background .3s",
                        }}
                      ></span>
                    </span>
                  </div>
                ))}
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: "11px",
                    color: "var(--meta)",
                    marginTop: "16px",
                    lineHeight: 1.6,
                    borderTop: "1px solid var(--line)",
                    paddingTop: "14px",
                  }}
                >
                  {dAsideNote}
                </div>
              </aside>
            </div>
          </div>
        ) : null}
      </>
    );
  }
}

export default function Nav() {
  const pathname = usePathname() || "/";
  const { theme, toggle } = useTheme();
  const active = ACTIVE_BY_PATH[pathname] ?? (pathname.startsWith("/chi-siamo/") ? "chisiamo" : "");
  return <NavEngine active={active} pathname={pathname} theme={theme} toggleTheme={toggle} />;
}
