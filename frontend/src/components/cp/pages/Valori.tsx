// @ts-nocheck — porting automatico di Valori.dc.html (logica originale quasi verbatim)
"use client";
/* eslint-disable */
import React from "react";
import Footer from "@/components/cp/Footer";
import { CP_DATA } from "@/lib/cp/data";
import { CP_QUIZ, CP_DIAG } from "@/lib/cp/quiz";

class ValoriPage extends React.Component<any, any> {
  [key: string]: any;
  state = { act: 0, at: 0, checks: {}, ct: 0, wide: true };
  componentDidMount() {
    if (this.state && 'vw' in this.state) this.setState({ vw: window.innerWidth });
    this.onResize = () => { const w = window.innerWidth >= 960; if (w !== this.state.wide) this.setState({ wide: w }); };
    this.onResize(); window.addEventListener('resize', this.onResize); this.boot();
  }
  componentWillUnmount() { window.removeEventListener('resize', this.onResize); clearTimeout(this._w); if (this._sc) document.removeEventListener('scroll', this._sc, { capture: true }); cancelAnimationFrame(this._raf); }
  boot() {
    const D = CP_DATA; if (!D) { this._w = setTimeout(() => this.boot(), 30); return; }
    this.forceUpdate();
    setTimeout(() => {
      this._sc = () => { if (this._raf) return; this._raf = requestAnimationFrame(() => { this._raf = 0;
        const line = window.innerHeight * 0.28; let i = 0;
        document.querySelectorAll('[data-vstep]').forEach((el, k) => { if (el.getBoundingClientRect().top <= line) i = k; });
        if (i !== this.state.act) this.setState(s => ({ act: i, at: s.at + 1 })); }); };
      document.addEventListener('scroll', this._sc, { capture: true, passive: true }); this._sc();
      const h = decodeURIComponent((location.hash || '').slice(1)); if (h && D.values.some(v => v.id === h)) this.scrollToId(h);
    }, 120);
  }
  scrollToId(id) {
    const el = document.getElementById(id); if (!el) return;
    let s = el.parentElement; while (s && s !== document.body) { const o = getComputedStyle(s).overflowY; if ((o === 'auto' || o === 'scroll') && s.scrollHeight > s.clientHeight) break; s = s.parentElement; }
    const top = el.getBoundingClientRect().top - 72;
    if (s && s !== document.body) s.scrollTo({ top: s.scrollTop + top, behavior: 'smooth' }); else window.scrollTo({ top: window.scrollY + top, behavior: 'smooth' });
  }
  renderVals(): any {
    const D = CP_DATA; if (!D) return {};
    const { act, at, checks, ct, wide } = this.state;
    const pT = Object.fromEntries(D.projects.map(p => [p.id, p.title.toLowerCase()]));
    const values = D.values.map((v, i) => ({ ...v, idx: String(i), titleLower: v.title.toLowerCase(), go: () => this.scrollToId(v.id), items: v.commitments.map(t => ({ t })), projLinks: v.projects.map(id => ({ title: pT[id], href: '/progetti#' + id })) }));
    const n = D.values.filter(v => checks[v.id]).length;
    const questions = D.values.map(v => { const on = !!checks[v.id]; return { num: v.num, short: v.title.toLowerCase(), question: v.question, bg: on ? '#fff' : 'transparent', fg: on ? '#0000FF' : '#fff', bd: on ? '#fff' : 'rgba(255,255,255,.5)', mark: on ? '✓' : '',
      toggle: () => this.setState(s => ({ checks: { ...s.checks, [v.id]: !s.checks[v.id] }, ct: s.ct + 1 })) }; });
    return { values, cur: D.values[act], railAnim: (at % 2 ? 'cp-in' : 'cp-in2') + ' .5s cubic-bezier(.2,.7,.2,1) both',
      segs: D.values.map((v, i) => ({ c: i <= act ? 'var(--fill-accent)' : 'var(--track)' })), storyGrid: wide ? 'minmax(260px,.8fr) minmax(0,1.6fr)' : 'minmax(0,1fr)', railDisplay: wide ? 'block' : 'none',
      questions, meter: D.values.map((v, i) => ({ c: i < n ? '#fff' : 'rgba(255,255,255,.25)' })),
      verdict: n === 4 ? 'Quattro su quattro: si fa_' : n === 0 ? 'Zero su quattro, per ora_' : n + ' su 4: ne parliamo_', verdictAnim: (ct % 2 ? 'cp-in' : 'cp-in2') + ' .4s both' };
  }

  render() {
    const { values, cur, segs, meter, questions, railAnim, railDisplay, storyGrid } = this.renderVals();
    return (<>
    <main>
      <section
        style={{
          padding: "calc(72px + clamp(48px,9vh,104px)) clamp(20px,4vw,48px) clamp(64px,10vh,112px)",
          backgroundImage: "radial-gradient(var(--dot) 1px,transparent 1px)",
          backgroundSize: "24px 24px",
          borderBottom: "1px solid var(--line-soft)",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div
            data-reveal="1"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              background: "var(--bg)",
              border: "1px solid var(--line)",
              padding: "8px 12px",
              fontFamily: "var(--mono)",
              fontSize: "12px",
              color: "var(--body)",
            }}
          >
            valori · la cosa più importante che abbiamo
          </div>
          <h1
            data-rise-group="1"
            style={{
              fontWeight: "700",
              fontSize: "clamp(48px,7.4vw,120px)",
              lineHeight: ".96",
              letterSpacing: "-.05em",
              margin: "24px 0 0",
            }}
          >
            <span style={{ display: "block", overflow: "hidden", paddingBottom: ".08em" }}>
              <span data-rise="1" style={{ display: "block" }}>
                Quello che ci guida
              </span>
            </span>
            <span style={{ display: "block", overflow: "hidden", paddingBottom: ".08em" }}>
              <span data-rise="1" style={{ display: "block" }}>
                in ogni <span style={{ color: "var(--accent)" }}>progetto_</span>
              </span>
            </span>
          </h1>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,380px),1fr))",
              gap: "32px 56px",
              alignItems: "end",
              marginTop: "40px",
            }}
          >
            <p
              data-reveal="1"
              style={{ margin: "0", fontSize: "clamp(20px,1.9vw,28px)", lineHeight: "1.3", letterSpacing: "-.015em", textWrap: "pretty" }}
            >
              Non sono una pagina del sito. Sono il criterio con cui decidiamo cosa fare, cosa non fare e cosa pubblicare. Se un progetto
              non ne rispetta almeno uno, non lo facciamo.
            </p>
            <div data-reveal="1" style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: "8px" }}>
              {(values || []).map((v, v_i) => (
                <React.Fragment key={v_i}>
                  <button
                    onClick={v.go}
                    data-spot="1"
                    className="h-border-color"
                    style={{
                      textAlign: "left",
                      background:
                        "radial-gradient(260px circle at var(--mx,-999px) var(--my,-999px),var(--accent-wash),transparent 60%),var(--bg)",
                      border: "1px solid var(--line)",
                      padding: "16px",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      gap: "22px",
                      minHeight: "120px",
                      transition: "border-color .25s",
                      "--h-border-color": "var(--accent)",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontFamily: "var(--mono)",
                        fontSize: "12px",
                        color: "var(--accent)",
                      }}
                    >
                      <span>{v.num}</span>
                      <span>↓</span>
                    </span>
                    <span style={{ fontWeight: "700", fontSize: "15px", textTransform: "uppercase", lineHeight: "1.15" }}>{v.title}</span>
                  </button>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 clamp(20px,4vw,48px)" }}>
        <div style={{ display: "grid", gridTemplateColumns: storyGrid, gap: "56px", alignItems: "start" }}>
          <div style={{ display: railDisplay, position: "sticky", top: "104px", padding: "40px 0" }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--meta)" }}>valore_</div>
            <div
              style={{
                fontWeight: "700",
                fontSize: "clamp(140px,16vw,250px)",
                lineHeight: ".8",
                letterSpacing: "-.075em",
                color: "var(--accent)",
                marginTop: "16px",
                animation: railAnim,
              }}
            >
              {cur.num}
            </div>
            <div
              style={{
                fontWeight: "700",
                fontSize: "24px",
                letterSpacing: "-.02em",
                textTransform: "uppercase",
                marginTop: "26px",
                lineHeight: "1.1",
                animation: railAnim,
              }}
            >
              {cur.title}
            </div>
            <div style={{ display: "flex", gap: "6px", marginTop: "26px" }}>
              {(segs || []).map((g, g_i) => (
                <React.Fragment key={g_i}>
                  <span style={{ flex: "1", height: "3px", background: g.c, transition: "background .4s" }}></span>
                </React.Fragment>
              ))}
            </div>
            <div style={{ marginTop: "26px", background: "var(--subtle)", border: "1px solid var(--line-soft)", padding: "18px" }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--meta)" }}>la domanda che ci facciamo_</div>
              <div style={{ fontWeight: "700", fontSize: "17px", lineHeight: "1.3", marginTop: "10px", animation: railAnim }}>
                {cur.question}
              </div>
            </div>
          </div>
          <div>
            {(values || []).map((v, v_i) => (
              <React.Fragment key={v_i}>
                <article
                  id={v.id}
                  data-vstep={v.idx}
                  style={{
                    minHeight: "92vh",
                    padding: "clamp(56px,10vh,112px) 0",
                    borderBottom: "1px solid var(--line-soft)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: "28px",
                    scrollMarginTop: "72px",
                  }}
                >
                  <div data-reveal="1" style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--accent)" }}>
                    {v.num} / 04 — {v.titleLower}
                  </div>
                  <p
                    data-reveal="1"
                    style={{
                      margin: "0",
                      fontWeight: "700",
                      fontSize: "clamp(28px,3.4vw,52px)",
                      letterSpacing: "-.035em",
                      lineHeight: "1.05",
                      textWrap: "balance",
                    }}
                  >
                    “{v.claim}”
                  </p>
                  <p
                    data-reveal="1"
                    style={{
                      margin: "0",
                      fontSize: "clamp(17px,1.35vw,20px)",
                      lineHeight: "1.55",
                      color: "var(--body)",
                      maxWidth: "640px",
                      textWrap: "pretty",
                    }}
                  >
                    {v.body}
                  </p>
                  <div data-reveal="1">
                    <div style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--meta)", marginBottom: "10px" }}>
                      in pratica, ci impegniamo a_
                    </div>
                    {(v.items || []).map((c, c_i) => (
                      <React.Fragment key={c_i}>
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "28px minmax(0,1fr)",
                            gap: "16px",
                            alignItems: "center",
                            padding: "14px 0",
                            borderTop: "1px solid var(--line-soft)",
                          }}
                        >
                          <span
                            style={{
                              width: "28px",
                              height: "28px",
                              background: "var(--fill-accent)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                              <path
                                d="M4 12h15M12 5l7 7-7 7"
                                style={{ stroke: "var(--on-fill)", strokeWidth: "3px", strokeLinecap: "square" }}
                              />
                            </svg>
                          </span>
                          <span style={{ fontSize: "16px", lineHeight: "1.4" }}>{c.t}</span>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                  <div data-reveal="1" style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
                    <span
                      style={{
                        fontFamily: "var(--mono)",
                        fontSize: "12px",
                        background: "var(--fill-ink)",
                        color: "var(--on-fill)",
                        padding: "10px 12px",
                        lineHeight: "1.5",
                      }}
                    >
                      ✕ non accettiamo di {v.refuse}
                    </span>
                  </div>
                </article>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>
      <section
        data-dark="1"
        style={{ position: "relative", background: "var(--fill-accent)", color: "var(--on-fill)", overflow: "hidden" }}
      >
        <div
          style={{
            position: "absolute",
            inset: "0",
            backgroundImage: "radial-gradient(rgba(255,255,255,.18) 1px,transparent 1px)",
            backgroundSize: "24px 24px",
            pointerEvents: "none",
          }}
        ></div>
        <div style={{ position: "relative", maxWidth: "1280px", margin: "0 auto", padding: "clamp(80px,12vh,136px) clamp(20px,4vw,48px)" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,380px),1fr))",
              gap: "40px 64px",
              alignItems: "start",
            }}
          >
            <div>
              <div data-reveal="1" style={{ fontFamily: "var(--mono)", fontSize: "12px" }}>
                il filtro — provalo sul tuo prossimo progetto_
              </div>
              <h2
                data-rise-group="1"
                style={{
                  fontWeight: "700",
                  fontSize: "clamp(36px,4.8vw,72px)",
                  lineHeight: "1",
                  letterSpacing: "-.045em",
                  margin: "18px 0 20px",
                }}
              >
                <span style={{ display: "block", overflow: "hidden", paddingBottom: ".08em" }}>
                  <span data-rise="1" style={{ display: "block" }}>
                    Quattro domande
                  </span>
                </span>
                <span style={{ display: "block", overflow: "hidden", paddingBottom: ".08em" }}>
                  <span data-rise="1" style={{ display: "block" }}>
                    prima di iniziare_
                  </span>
                </span>
              </h2>
              <p data-reveal="1" style={{ margin: "0", fontSize: "18px", lineHeight: "1.5", maxWidth: "460px" }}>
                Ce le facciamo ad alta voce, con te, al sopralluogo.
              </p>
              <div data-reveal="1" style={{ marginTop: "36px" }}>
                <div style={{ display: "flex", gap: "6px" }}>
                  {(meter || []).map((m, m_i) => (
                    <React.Fragment key={m_i}>
                      <span style={{ flex: "1", height: "8px", background: m.c, transition: "background .4s" }}></span>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {(questions || []).map((q, q_i) => (
                <React.Fragment key={q_i}>
                  <button
                    onClick={q.toggle}
                    style={{
                      textAlign: "left",
                      border: `1px solid ${q.bd}`,
                      background: q.bg,
                      color: q.fg,
                      padding: "20px",
                      cursor: "pointer",
                      display: "grid",
                      gridTemplateColumns: "minmax(0,1fr) 36px",
                      gap: "16px",
                      alignItems: "center",
                      transition: "background .3s,color .3s,border-color .3s",
                    }}
                  >
                    <span>
                      <span style={{ display: "block", fontFamily: "var(--mono)", fontSize: "12px", opacity: ".85" }}>
                        {q.num} · {q.short}
                      </span>
                      <span
                        style={{
                          display: "block",
                          fontWeight: "700",
                          fontSize: "clamp(18px,1.6vw,22px)",
                          letterSpacing: "-.015em",
                          lineHeight: "1.25",
                          marginTop: "8px",
                        }}
                      >
                        {q.question}
                      </span>
                    </span>
                    <span
                      style={{
                        width: "36px",
                        height: "36px",
                        border: `1.5px solid ${q.fg}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "700",
                      }}
                    >
                      {q.mark}
                    </span>
                  </button>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(80px,12vh,136px) clamp(20px,4vw,48px)" }}>
        <div
          data-reveal="1"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            fontFamily: "var(--mono)",
            fontSize: "12px",
            color: "var(--meta)",
          }}
        >
          e sotto questo non si scende
        </div>
        <h2
          data-rise-group="1"
          style={{ fontWeight: "700", fontSize: "clamp(34px,4.4vw,64px)", lineHeight: "1", letterSpacing: "-.04em", margin: "18px 0 40px" }}
        >
          <span style={{ display: "block", overflow: "hidden", paddingBottom: ".08em" }}>
            <span data-rise="1" style={{ display: "block" }}>
              Lo standard minimo_
            </span>
          </span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,340px),1fr))", gap: "12px" }}>
          <div
            data-reveal="1"
            style={{ border: "1px solid var(--line)", padding: "28px", display: "flex", flexDirection: "column", gap: "14px" }}
          >
            <span style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--accent)" }}>01</span>
            <span style={{ fontWeight: "700", fontSize: "26px", letterSpacing: "-.025em", textTransform: "uppercase" }}>Flessibilità_</span>
            <span style={{ fontSize: "16px", lineHeight: "1.5", color: "var(--body)" }}>
              Lo strumento si adatta al processo, mai viceversa. Nessuna soluzione preconfezionata.
            </span>
          </div>
          <div
            data-reveal="1"
            data-delay="120"
            style={{ border: "1px solid var(--line)", padding: "28px", display: "flex", flexDirection: "column", gap: "14px" }}
          >
            <span style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--accent)" }}>02</span>
            <span style={{ fontWeight: "700", fontSize: "26px", letterSpacing: "-.025em", textTransform: "uppercase" }}>
              Professionalità_
            </span>
            <span style={{ fontSize: "16px", lineHeight: "1.5", color: "var(--body)" }}>
              Tempi e costi previsti prima, non scoperti dopo. Codice e documentazione restano tuoi.
            </span>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>);
  }
}

export default ValoriPage;
