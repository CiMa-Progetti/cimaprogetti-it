// @ts-nocheck — porting automatico di Servizi.dc.html (logica originale quasi verbatim)
"use client";
/* eslint-disable */
import React from "react";
import Link from "next/link";
import Footer from "@/components/cp/Footer";
import { CP_DATA } from "@/lib/cp/data";
import { CP_QUIZ, CP_DIAG } from "@/lib/cp/quiz";

class ServiziPage extends React.Component<any, any> {
  [key: string]: any;
  state = { fam: 'all', sel: null, ft: 0, dt: 0, rec: [] };
  componentDidMount() {
    if (this.state && 'vw' in this.state) this.setState({ vw: window.innerWidth });
    this.onDiag = () => this.readDiag(); window.addEventListener('cp-c-diagnosi', this.onDiag);
    this.onKey = e => { if (!this.state.sel) return; if (e.key === 'Escape') this.close(); else if (e.key === 'ArrowRight') this.step(1); else if (e.key === 'ArrowLeft') this.step(-1); };
    document.addEventListener('keydown', this.onKey); this.boot();
  }
  componentWillUnmount() { window.removeEventListener('cp-c-diagnosi', this.onDiag); document.removeEventListener('keydown', this.onKey); clearTimeout(this._w); this.lock(false); }
  boot() {
    const D = CP_DATA; if (!D || !CP_DIAG) { this._w = setTimeout(() => this.boot(), 30); return; }
    this.readDiag();
    const h = decodeURIComponent((location.hash || '').slice(1));
    if (h && D.services.some(s => s.id === h)) this.openS(h);
  }
  readDiag() { const d = CP_DIAG.read(); this.setState({ rec: CP_DIAG.done(d) ? CP_DIAG.top(d) : [] }); }
  scroller() { let el = document.querySelector('main'); while (el && el !== document.body) { const o = getComputedStyle(el).overflowY; if ((o === 'auto' || o === 'scroll') && el.scrollHeight > el.clientHeight) return el; el = el.parentElement; } return null; }
  lock(on) { if (on) this._sc = this.scroller(); const v = on ? 'hidden' : ''; document.documentElement.style.overflow = v; document.body.style.overflow = v; if (this._sc) this._sc.style.overflow = v; }
  openS(id) { this.setState(s => ({ sel: id, dt: s.dt + 1 })); this.lock(true); }
  close() { this.setState({ sel: null }); this.lock(false); }
  list() { const f = this.state.fam; return CP_DATA.services.filter(s => f === 'all' || s.family === f); }
  step(dir) { const L = this.list(); const i = L.findIndex(s => s.id === this.state.sel); const n = L[(i + dir + L.length) % L.length]; this.setState(s => ({ sel: n.id, dt: s.dt + 1 })); }
  renderVals(): any {
    const showPrices = this.props.showPrices ?? true;
    const D = CP_DATA; const base = { showPrices, openDiag: () => window.dispatchEvent(new Event('cp-open-diagnosi')) };
    if (!D) return base;
    const { fam, sel, ft, dt, rec } = this.state;
    const pad = n => String(n).padStart(2, '0');
    const famL = Object.fromEntries(D.families.map(f => [f.id, f.label]));
    const short = { costruire: 'costruire', automatizzare: 'automatizzare', proteggere: 'proteggere' };
    const proj = Object.fromEntries(D.projects.map(p => [p.id, p]));
    const pos = s => ({ left: (s.min / 50 * 100).toFixed(2) + '%', width: Math.max(2, (s.max - s.min) / 50 * 100).toFixed(2) + '%' });
    const services = this.list().map((s, i) => { const r = rec.includes(s.id); return { ...s, num: pad(D.services.indexOf(s) + 1), familyShort: short[s.family], rec: r, bd: r ? 'var(--accent)' : 'var(--line)',
      priceLine: showPrices ? s.range + ' · ' + s.duration : s.duration, anim: (ft % 2 ? 'cp-in' : 'cp-in2') + ' .5s cubic-bezier(.2,.7,.2,1) both ' + (i * 40) + 'ms', open: () => this.openS(s.id) }; });
    const tabs = [{ id: 'all', label: 'Tutti', count: pad(D.services.length) }].concat(D.families.map(f => ({ id: f.id, label: f.label.replace('_', '').replace(/^./, c => c.toUpperCase()), count: pad(D.services.filter(s => s.family === f.id).length) })))
      .map(t => ({ ...t, bg: fam === t.id ? 'var(--fill-accent)' : 'transparent', fg: fam === t.id ? 'var(--on-fill)' : 'var(--ink)', pick: () => this.setState(s => s.fam === t.id ? null : { fam: t.id, ft: s.ft + 1 }) }));
    const sd = sel ? D.services.find(s => s.id === sel) : null;
    const d = sd ? { ...sd, ...pos(sd), num: pad(D.services.indexOf(sd) + 1), familyLabel: famL[sd.family], projectHref: '/progetti#' + sd.project, projectTitle: proj[sd.project].title, projectStat: proj[sd.project].stat } : {};
    const svcT = Object.fromEntries(D.services.map(s => [s.id, s.title.toLowerCase()]));
    return { ...base, tabs, services, hasRec: rec.length > 0, noRec: rec.length === 0, recText: 'la tua diagnosi consiglia: ' + rec.map(id => svcT[id]).join(', '),
      scale: D.services.map((s, i) => ({ titleLower: s.title.toLowerCase(), range: s.range, ...pos(s), color: rec.includes(s.id) ? 'var(--ink)' : 'var(--accent)', delay: String(i * 60), open: () => this.openS(s.id) })),
      drawerOpen: !!sd, d, dAnim: (dt % 2 ? 'cp-in' : 'cp-in2') + ' .45s cubic-bezier(.2,.7,.2,1) both',
      close: () => this.close(), prev: () => this.step(-1), next: () => this.step(1) };
  }

  render() {
    const { tabs, hasRec, recText, noRec, openDiag, services, showPrices, scale, drawerOpen, close, d, prev, next, dAnim } = this.renderVals();
    return (<>
    <main>
      <section
        style={{
          padding: "calc(72px + clamp(48px,9vh,104px)) clamp(20px,4vw,48px) 40px",
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
            Sono solo spunti: spesso la vera risposta è un ecosistema più completo
          </div>
          <h1
            data-rise-group="1"
            style={{ fontWeight: "700", fontSize: "clamp(44px,6vw,92px)", lineHeight: "1", letterSpacing: "-.045em", margin: "24px 0 0" }}
          >
            <span style={{ display: "block", overflow: "hidden", paddingBottom: ".08em" }}>
              <span data-rise="1" style={{ display: "block" }}>
                Dieci servizi.
              </span>
            </span>
            <span style={{ display: "block", overflow: "hidden", paddingBottom: ".08em" }}>
              <span data-rise="1" style={{ display: "block", color: "var(--accent)" }}>
                Si parte da un sintomo_
              </span>
            </span>
          </h1>
          <p
            data-reveal="1"
            style={{
              fontSize: "clamp(17px,1.35vw,20px)",
              lineHeight: "1.5",
              color: "var(--body)",
              maxWidth: "620px",
              margin: "24px 0 0",
              textWrap: "pretty",
            }}
          >
            Ogni servizio nasce da una frase che sentiamo spesso in azienda.
            <br />
            Se ti suona familiare, quello è il problema. Nessun pacchetto: si parte da come lavori oggi.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "16px",
              marginTop: "40px",
            }}
          >
            <div
              data-reveal="1"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "4px",
                background: "var(--bg)",
                border: "1px solid var(--line)",
                padding: "4px",
              }}
            >
              {(tabs || []).map((t, t_i) => (
                <React.Fragment key={t_i}>
                  <button
                    onClick={t.pick}
                    style={{
                      height: "44px",
                      padding: "0 16px",
                      border: "0",
                      background: t.bg,
                      color: t.fg,
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "700",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      transition: "background .3s,color .3s",
                    }}
                  >
                    {t.label}
                    <span style={{ fontFamily: "var(--mono)", fontSize: "11px", fontWeight: "400", opacity: ".75" }}>{t.count}</span>
                  </button>
                </React.Fragment>
              ))}
            </div>
            {hasRec ? (
              <>
                <div
                  data-reveal="1"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    fontFamily: "var(--mono)",
                    fontSize: "12px",
                    color: "var(--accent)",
                    background: "var(--bg)",
                    border: "1px solid var(--accent)",
                    padding: "12px 14px",
                  }}
                >
                  <span style={{ width: "8px", height: "8px", background: "var(--fill-accent)" }}></span>
                  {recText}
                </div>
              </>
            ) : null}

            {noRec ? (
              <>
                <button
                  data-reveal="1"
                  onClick={openDiag}
                  className="h-background h-color"
                  style={{
                    height: "52px",
                    padding: "0 18px",
                    border: "1px solid var(--accent)",
                    background: "var(--bg)",
                    color: "var(--accent)",
                    fontWeight: "700",
                    fontSize: "14px",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    transition: "background .25s,color .25s",
                    "--h-background": "var(--fill-accent)",
                    "--h-color": "var(--on-fill)",
                  }}
                >
                  Non sai quale ti serve? Diagnosi in 60s →
                </button>
              </>
            ) : null}
          </div>
        </div>
      </section>
      <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px clamp(20px,4vw,48px) clamp(80px,12vh,136px)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,300px),1fr))", gap: "12px" }}>
          {(services || []).map((s, s_i) => (
            <React.Fragment key={s_i}>
              <div style={{ animation: s.anim }}>
                <div
                  role="button"
                  onClick={s.open}
                  data-spot="1"
                  className="h-border-color h-transform"
                  style={{
                    height: "100%",
                    minHeight: "240px",
                    background:
                      "radial-gradient(420px circle at var(--mx,-999px) var(--my,-999px),var(--accent-wash),transparent 60%),var(--bg)",
                    border: `1px solid ${s.bd}`,
                    padding: "22px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    cursor: "pointer",
                    transition: "border-color .3s,transform .45s cubic-bezier(.2,.7,.2,1)",
                    "--h-border-color": "var(--accent)",
                    "--h-transform": "translateY(-4px)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "8px",
                      fontFamily: "var(--mono)",
                      fontSize: "12px",
                      color: "var(--meta)",
                    }}
                  >
                    <span>
                      {s.num} · {s.familyShort}
                    </span>
                    {s.rec ? (
                      <>
                        <span style={{ color: "var(--on-fill)", background: "var(--fill-accent)", padding: "3px 7px" }}>consigliato</span>
                      </>
                    ) : null}
                  </div>
                  <div
                    style={{
                      color: "var(--accent)",
                      fontWeight: "700",
                      fontSize: "22px",
                      letterSpacing: "-.02em",
                      textTransform: "uppercase",
                      lineHeight: "1.05",
                    }}
                  >
                    {s.title}
                  </div>
                  <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.5", color: "var(--body)", textWrap: "pretty" }}>{s.desc}</p>
                  <div
                    style={{
                      marginTop: "auto",
                      paddingTop: "14px",
                      borderTop: "1px solid var(--line-soft)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "12px",
                      fontFamily: "var(--mono)",
                      fontSize: "12px",
                    }}
                  >
                    <span style={{ color: "var(--accent)", whiteSpace: "nowrap" }}>dettagli →</span>
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </section>
      {showPrices ? (
        <>
          <section style={{ background: "var(--subtle)", borderTop: "1px solid var(--line-soft)" }}>
            <div
              style={{
                maxWidth: "1280px",
                margin: "0 auto",
                padding: "clamp(80px,12vh,136px) clamp(20px,4vw,48px)",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,360px),1fr))",
                gap: "48px 64px",
                alignItems: "start",
              }}
            >
              <div>
                <h2
                  data-rise-group="1"
                  style={{
                    fontWeight: "700",
                    fontSize: "clamp(34px,4.4vw,64px)",
                    lineHeight: "1",
                    letterSpacing: "-.04em",
                    margin: "0 0 22px",
                  }}
                >
                  <span style={{ display: "block", overflow: "hidden", paddingBottom: ".08em" }}>
                    <span data-rise="1" style={{ display: "block" }}>
                      Quanto costa_
                    </span>
                  </span>
                </h2>
                <div data-reveal="1" style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "flex-start" }}>
                  <p
                    style={{
                      margin: "0",
                      fontSize: "clamp(16px,1.25vw,19px)",
                      lineHeight: "1.5",
                      color: "var(--body)",
                      textWrap: "pretty",
                    }}
                  >
                    Nella tabella puoi osservare le medie dei lavori fatti finora, ogni prestazione ha però il suo valore che nasce da
                    esigenze e obiettivi concordati: mai da un listino.
                  </p>
                  <p
                    style={{
                      margin: "0",
                      fontSize: "clamp(16px,1.25vw,19px)",
                      lineHeight: "1.5",
                      color: "var(--body)",
                      textWrap: "pretty",
                    }}
                  >
                    {
                      "Spesso il risultato è proporzionato al dimensionamento dell'attività, non per penalizzare grandi realtà ma perché prestazioni e dimensionamento stesso dell'infrastruttura incidono direttamente sui costi."
                    }
                  </p>
                  <Link
                    href="/contatti"
                    className="h-color"
                    style={{
                      marginTop: "8px",
                      minHeight: "44px",
                      display: "inline-flex",
                      alignItems: "center",
                      fontWeight: "700",
                      fontSize: "clamp(16px,1.25vw,19px)",
                      letterSpacing: "-.01em",
                      color: "var(--accent)",
                      "--h-color": "var(--ink)",
                    }}
                  >
                    Per un preventivo contattaci →
                  </Link>
                </div>
              </div>
              <div style={{ fontFamily: "var(--mono)", fontSize: "12px" }}>
                {(scale || []).map((b, b_i) => (
                  <React.Fragment key={b_i}>
                    <div
                      data-reveal="1"
                      data-delay={b.delay}
                      role="button"
                      onClick={b.open}
                      className="h-color"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "minmax(110px,170px) minmax(0,1fr)",
                        gap: "14px",
                        alignItems: "center",
                        padding: "10px 0",
                        borderTop: "1px solid var(--line)",
                        color: "var(--ink)",
                        cursor: "pointer",
                        transition: "color .2s",
                        "--h-color": "var(--accent)",
                      }}
                    >
                      <span style={{ fontSize: "13px", lineHeight: "1.3" }}>{b.titleLower}</span>
                      <span style={{ position: "relative", height: "8px", background: "var(--track)" }}>
                        <span
                          style={{ position: "absolute", top: "0", bottom: "0", left: b.left, width: b.width, background: b.color }}
                        ></span>
                      </span>
                    </div>
                  </React.Fragment>
                ))}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "minmax(110px,170px) minmax(0,1fr)",
                    gap: "14px",
                    color: "var(--meta)",
                    paddingTop: "10px",
                    borderTop: "1px solid var(--line)",
                  }}
                >
                  <span></span>
                  <span style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>0</span>
                    <span>25k</span>
                    <span>50k</span>
                  </span>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : null}
    </main>
    <Footer />
    {drawerOpen ? (
      <>
        <div style={{ position: "fixed", inset: "0", zIndex: "150" }}>
          <div
            onClick={close}
            style={{
              position: "absolute",
              inset: "0",
              background: "var(--scrim)",
              backdropFilter: "blur(2px)",
              animation: "cp-fade .3s both",
            }}
          ></div>
          <aside
            style={{
              position: "absolute",
              top: "0",
              right: "0",
              bottom: "0",
              width: "min(100%,640px)",
              background: "var(--bg)",
              overflowY: "auto",
              animation: "cp-drawer .45s cubic-bezier(.2,.7,.2,1) both",
              boxShadow: "var(--shadow-drawer)",
            }}
          >
            <div
              style={{
                position: "sticky",
                top: "0",
                zIndex: "1",
                background: "var(--glass-strong)",
                backdropFilter: "blur(10px)",
                borderBottom: "1px solid var(--line-soft)",
                padding: "0 clamp(20px,3vw,32px)",
                height: "72px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <span style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--meta)" }}>servizio {d.num} / 10 · ← → · esc</span>
              <div style={{ display: "flex", gap: "6px" }}>
                <button
                  onClick={prev}
                  aria-label="precedente"
                  className="h-border-color"
                  style={{
                    width: "44px",
                    height: "44px",
                    border: "1px solid var(--line)",
                    background: "var(--bg)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "border-color .2s",
                    "--h-border-color": "var(--ink)",
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M20 12H5M12 5l-7 7 7 7" style={{ stroke: "currentColor", strokeWidth: "2.4px", strokeLinecap: "square" }} />
                  </svg>
                </button>
                <button
                  onClick={next}
                  aria-label="successivo"
                  className="h-border-color"
                  style={{
                    width: "44px",
                    height: "44px",
                    border: "1px solid var(--line)",
                    background: "var(--bg)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "border-color .2s",
                    "--h-border-color": "var(--ink)",
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M4 12h15M12 5l7 7-7 7" style={{ stroke: "currentColor", strokeWidth: "2.4px", strokeLinecap: "square" }} />
                  </svg>
                </button>
                <button
                  onClick={close}
                  aria-label="chiudi"
                  className="h-background"
                  style={{
                    width: "44px",
                    height: "44px",
                    border: "0",
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
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M6 6l12 12M18 6L6 18" style={{ stroke: "currentColor", strokeWidth: "2.4px", strokeLinecap: "square" }} />
                  </svg>
                </button>
              </div>
            </div>
            <div
              style={{
                padding: "clamp(24px,4vw,40px) clamp(20px,3vw,32px) 48px",
                display: "flex",
                flexDirection: "column",
                gap: "28px",
                animation: dAnim,
              }}
            >
              <div>
                <div style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--accent)" }}>{d.familyLabel}</div>
                <h2
                  style={{
                    fontWeight: "700",
                    fontSize: "clamp(32px,3.6vw,48px)",
                    letterSpacing: "-.04em",
                    lineHeight: "1",
                    margin: "12px 0 12px",
                    textTransform: "uppercase",
                  }}
                >
                  {d.title}
                </h2>
                <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.5", color: "var(--body)" }}>{d.desc}</p>
              </div>
              <div style={{ borderTop: "1px solid var(--line-soft)" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "120px minmax(0,1fr)",
                    gap: "16px",
                    padding: "18px 0",
                    borderBottom: "1px solid var(--line-soft)",
                  }}
                >
                  <span style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--meta)" }}>il sintomo_</span>
                  <span style={{ fontSize: "16px", lineHeight: "1.5" }}>{d.symptom}</span>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "120px minmax(0,1fr)",
                    gap: "16px",
                    padding: "18px 0",
                    borderBottom: "1px solid var(--line-soft)",
                  }}
                >
                  <span style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--meta)" }}>cosa facciamo_</span>
                  <span style={{ fontSize: "16px", lineHeight: "1.5" }}>{d.action}</span>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "120px minmax(0,1fr)",
                    gap: "16px",
                    padding: "18px 0",
                    borderBottom: "1px solid var(--line-soft)",
                  }}
                >
                  <span style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--meta)" }}>cosa ricevete_</span>
                  <span style={{ fontSize: "16px", lineHeight: "1.5" }}>{d.deliver}</span>
                </div>
              </div>
              <a
                href={d.projectHref}
                className="h-border-color h-color"
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0,1fr) auto",
                  gap: "16px",
                  alignItems: "center",
                  border: "1px solid var(--line)",
                  padding: "20px",
                  color: "var(--ink)",
                  transition: "border-color .2s",
                  "--h-border-color": "var(--accent)",
                  "--h-color": "var(--ink)",
                }}
              >
                <span>
                  <span style={{ display: "block", fontFamily: "var(--mono)", fontSize: "12px", color: "var(--meta)" }}>
                    {"dove l'abbiamo fatto_"}
                  </span>
                  <span style={{ display: "block", fontWeight: "700", fontSize: "17px", textTransform: "uppercase", marginTop: "8px" }}>
                    {d.projectTitle}
                  </span>
                </span>
                <span style={{ color: "var(--accent)", fontWeight: "700", fontSize: "28px", letterSpacing: "-.04em" }}>
                  {d.projectStat}
                </span>
              </a>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                <Link
                  href="/contatti"
                  className="h-background h-color"
                  style={{
                    height: "52px",
                    padding: "0 20px",
                    background: "var(--fill-accent)",
                    color: "var(--on-fill)",
                    fontWeight: "700",
                    fontSize: "15px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    transition: "background .25s",
                    "--h-background": "var(--fill-ink)",
                    "--h-color": "var(--on-fill)",
                  }}
                >
                  Parliamone →
                </Link>
                <button
                  onClick={openDiag}
                  className="h-border-color"
                  style={{
                    height: "52px",
                    padding: "0 20px",
                    border: "1px solid var(--line-strong)",
                    background: "var(--bg)",
                    fontWeight: "700",
                    fontSize: "15px",
                    cursor: "pointer",
                    transition: "border-color .2s",
                    "--h-border-color": "var(--ink)",
                  }}
                >
                  Fai la diagnosi
                </button>
              </div>
            </div>
          </aside>
        </div>
      </>
    ) : null}
  </>);
  }
}

export default ServiziPage;
