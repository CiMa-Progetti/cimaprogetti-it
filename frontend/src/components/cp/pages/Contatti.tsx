// @ts-nocheck — porting automatico di Contatti.dc.html (logica originale quasi verbatim)
"use client";
/* eslint-disable */
import React from "react";
import Footer from "@/components/cp/Footer";
import MaterialSymbolsFont from "@/components/MaterialSymbolsFont";
import { CP_DATA, waLink } from "@/lib/cp/data";
import { CP_QUIZ, CP_DIAG } from "@/lib/cp/quiz";

class ContattiPage extends React.Component<any, any> {
  [key: string]: any;
  state = { topics: [], budget: null, when: null, wide: true, diagTop: [], prefilled: false };
  componentDidMount() {
    if (this.state && 'vw' in this.state) this.setState({ vw: window.innerWidth });
    this.onResize = () => { const w = window.innerWidth >= 960; if (w !== this.state.wide) this.setState({ wide: w }); };
    this.onResize(); window.addEventListener('resize', this.onResize);
    this.onDiag = () => this.readDiag(); window.addEventListener('cp-c-diagnosi', this.onDiag);
    this.boot();
  }
  componentWillUnmount() { window.removeEventListener('resize', this.onResize); window.removeEventListener('cp-c-diagnosi', this.onDiag); clearTimeout(this._w); }
  boot() { if (!CP_DATA || !CP_DIAG) { this._w = setTimeout(() => this.boot(), 30); return; } this.readDiag(); }
  readDiag() {
    const d = CP_DIAG.read(); const top = CP_DIAG.done(d) ? CP_DIAG.top(d) : [];
    this.setState(s => ({ diagTop: top, topics: !s.prefilled && s.topics.length === 0 && top.length ? top.slice() : s.topics, prefilled: s.prefilled || top.length > 0 }));
  }
  renderVals(): any {
    const D = CP_DATA; const openDiag = () => window.dispatchEvent(new Event('cp-open-diagnosi'));
    if (!D) return { openDiag, grid: 'minmax(0,1fr)', leftPos: 'static' };
    const { topics, budget, when, wide, diagTop } = this.state;
    const svc = Object.fromEntries(D.services.map(s => [s.id, s]));
    const opt = (label, on, toggle) => ({ label: (on ? '✓ ' : '') + label, bg: on ? 'var(--fill-accent)' : 'var(--bg)', fg: on ? 'var(--on-fill)' : 'var(--ink)', bd: on ? 'var(--accent)' : 'var(--line)', toggle });
    const togTopic = id => () => this.setState(s => ({ topics: s.topics.includes(id) ? s.topics.filter(x => x !== id) : s.topics.filter(x => x !== 'nonso').concat(id) }));
    const topicOpts = D.services.map(s => opt(s.title, topics.includes(s.id), togTopic(s.id))).concat([opt('Non lo so ancora', topics.includes('nonso'), () => this.setState(s => ({ topics: s.topics.includes('nonso') ? [] : ['nonso'] })))]);
    const budgets = ['Fino a 15k €', '15–30k €', '30–50k €', 'Non lo so'];
    const whens = ['Subito', 'Entro 3 mesi', "Entro l'anno", 'Stiamo valutando'];
    const done = [topics.length > 0, !!budget, !!when];
    const badge = (i, ok) => ({ badge: ok ? '✓' : '0' + (i + 1), badgeBg: ok ? 'var(--fill-accent)' : 'var(--bg)', badgeFg: ok ? 'var(--on-fill)' : 'var(--ink)', badgeBd: ok ? 'var(--accent)' : 'var(--line-strong)', cardBd: ok ? 'var(--accent-line)' : 'var(--line)' });
    const steps = [
      { ...badge(0, done[0]), title: 'Di cosa vorresti parlare?', hint: 'anche più di una', opts: topicOpts, showNote: diagTop.length > 0, note: '● precompilato dalla tua diagnosi_', delay: '0' },
      { ...badge(1, done[1]), title: 'Budget indicativo', hint: 'una scelta', opts: budgets.map(b => opt(b, budget === b, () => this.setState(s => ({ budget: s.budget === b ? null : b })))), showNote: false, note: '', delay: '100' },
      { ...badge(2, done[2]), title: 'Quando vorresti partire?', hint: 'una scelta', opts: whens.map(w => opt(w, when === w, () => this.setState(s => ({ when: s.when === w ? null : w })))), showNote: false, note: '', delay: '200' }
    ];
    const topicText = topics.length ? topics.map(id => id === 'nonso' ? 'non lo sappiamo ancora, vorremmo capirlo con voi' : svc[id].title.toLowerCase()).join(', ') : '—';
    const body = 'Buongiorno,\n\nvorremmo parlare di: ' + topicText + '.\nBudget indicativo: ' + (budget || '—') + '.\nPartenza: ' + (when ? when.toLowerCase() : '—') + '.' + (diagTop.length ? '\nDiagnosi dal sito: ' + diagTop.map(id => svc[id].title.toLowerCase()).join(', ') + '.' : '') + '\n\nPossiamo fissare il sopralluogo gratuito?\n';
    const n = done.filter(Boolean).length;
    return { openDiag, steps, grid: wide ? 'minmax(0,1.15fr) minmax(0,.85fr)' : 'minmax(0,1fr)', leftPos: wide ? 'sticky' : 'static', gridRows: wide ? 'auto 1fr' : 'auto', rowGap: wide ? '28px' : 'clamp(40px,6vh,64px)', hdrGC: wide ? '1' : 'auto', hdrGR: wide ? '1' : 'auto', leftGC: wide ? '1' : 'auto', leftGR: wide ? '2' : 'auto', formGC: wide ? '2' : 'auto', formGR: wide ? '1 / span 2' : 'auto', doneCount: String(n), pct: (n / 3 * 100) + '%',
      preview: 'A: info@cimaprogetti.it\nOggetto: Sopralluogo\n\n' + body, noDiag: diagTop.length === 0,
      mail: 'mailto:info@cimaprogetti.it?subject=' + encodeURIComponent('Sopralluogo') + '&body=' + encodeURIComponent(body) };
  }

  render() {
    const { rowGap, steps, doneCount, preview, mail, noDiag, openDiag, formGC, formGR, grid, gridRows, hdrGC, hdrGR, leftGC, leftGR, leftPos, pct } = this.renderVals();
    return (<>
<MaterialSymbolsFont />
    <main>
      <section style={{ padding: "calc(72px + clamp(48px,9vh,104px)) clamp(20px,4vw,48px) clamp(80px,12vh,136px)" }}>
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: grid,
            gridTemplateRows: gridRows,
            gap: `${rowGap} clamp(40px,6vw,96px)`,
            alignItems: "start",
          }}
        >
          <div style={{ gridColumn: hdrGC, gridRow: hdrGR }}>
            <h1
              data-rise-group="1"
              style={{ fontWeight: "700", fontSize: "clamp(56px,7.6vw,124px)", lineHeight: ".88", letterSpacing: "-.055em", margin: "0" }}
            >
              <span style={{ display: "block", overflow: "hidden", paddingBottom: ".16em" }}>
                <span data-rise="1" style={{ display: "block" }}>
                  Contatti<span style={{ color: "var(--accent)" }}>_</span>
                </span>
              </span>
            </h1>
            <p
              data-reveal="1"
              style={{
                fontSize: "clamp(18px,1.6vw,24px)",
                lineHeight: "1.45",
                color: "var(--body)",
                maxWidth: "640px",
                margin: "clamp(20px,3vh,32px) 0 0",
                textWrap: "pretty",
              }}
            >
              Parliamo del tuo prossimo progetto.
              <br />
              Nessun impegno, solo una conversazione.
            </p>
          </div>
          <div style={{ gridColumn: leftGC, gridRow: leftGR, position: leftPos, top: "120px", display: "flex", flexDirection: "column" }}>
            <a
              data-reveal="1"
              href="mailto:info@cimaprogetti.it"
              className="h-color"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                padding: "0 0 clamp(24px,3.6vh,36px)",
                color: "var(--ink)",
                "--h-color": "var(--accent)",
              }}
            >
              <span style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--meta)", display: "flex", gap: "10px" }}>
                <span style={{ color: "var(--accent)" }}>01</span>email
              </span>
              <span
                style={{
                  fontWeight: "700",
                  fontSize: "clamp(28px,3.4vw,50px)",
                  lineHeight: "1.05",
                  letterSpacing: "-.035em",
                  color: "var(--ink)",
                  overflowWrap: "anywhere",
                  transition: "color .2s",
                }}
              >
                info@cimaprogetti.it
              </span>
            </a>
            <a
              data-reveal="1"
              data-delay="100"
              href="tel:+393382451171"
              className="h-color"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                padding: "clamp(24px,3.6vh,36px) 0",
                borderTop: "1px solid var(--line)",
                color: "var(--ink)",
                "--h-color": "var(--accent)",
              }}
            >
              <span style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--meta)", display: "flex", gap: "10px" }}>
                <span style={{ color: "var(--accent)" }}>02</span>telefono sede centrale
              </span>
              <span
                style={{
                  fontWeight: "700",
                  fontSize: "clamp(28px,3.4vw,50px)",
                  lineHeight: "1.05",
                  letterSpacing: "-.035em",
                  color: "var(--ink)",
                  overflowWrap: "anywhere",
                  transition: "color .2s",
                }}
              >
                +39 338 245 1171
              </span>
            </a>
            <div
              data-reveal="1"
              data-delay="200"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "18px",
                paddingTop: "clamp(24px,3.6vh,36px)",
                borderTop: "1px solid var(--line)",
              }}
            >
              <span style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--meta)", display: "flex", gap: "10px" }}>
                <span style={{ color: "var(--accent)" }}>03</span>parla direttamente con i founder
              </span>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,240px),1fr))",
                  gridTemplateRows: "repeat(5,auto)",
                  gap: "0 32px",
                }}
              >
                <div style={{ display: "grid", gridTemplateRows: "subgrid", gridRow: "span 5", rowGap: "6px", marginBottom: "24px" }}>
                  <span style={{ fontWeight: "700", fontSize: "clamp(20px,1.7vw,24px)", letterSpacing: "-.03em", lineHeight: "1.1" }}>
                    Nicola Leone Ciardi
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: "12px",
                      color: "var(--accent)",
                      textTransform: "uppercase",
                      letterSpacing: ".04em",
                    }}
                  >
                    Co-founder & CEO
                  </span>
                  <p style={{ margin: "4px 0 6px", fontSize: "15px", lineHeight: "1.45", color: "var(--body)", textWrap: "pretty" }}>
                    Management e computer science.
                  </p>
                  <a
                    href={waLink("+39 338 245 1178")}
                    target="_blank"
                    rel="noopener"
                    className="h-color"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      minHeight: "44px",
                      fontSize: "15px",
                      color: "var(--ink)",
                      overflowWrap: "anywhere",
                      "--h-color": "var(--accent)",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        width: "20px",
                        height: "20px",
                        flex: "none",
                        color: "var(--accent)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "'Material Symbols Sharp'",
                        fontSize: "20px",
                        lineHeight: "1",
                        fontFeatureSettings: "'liga'",
                        overflow: "hidden",
                      }}
                    >
                      call
                    </span>
                    <span style={{ minWidth: "0" }}>+39 338 245 1178</span>
                  </a>
                  <a
                    href="mailto:nicolaleone.ciardi@cimaprogetti.it"
                    className="h-color"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      minHeight: "44px",
                      fontSize: "15px",
                      color: "var(--ink)",
                      overflowWrap: "anywhere",
                      "--h-color": "var(--accent)",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        width: "20px",
                        height: "20px",
                        flex: "none",
                        color: "var(--accent)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "'Material Symbols Sharp'",
                        fontSize: "20px",
                        lineHeight: "1",
                        fontFeatureSettings: "'liga'",
                        overflow: "hidden",
                      }}
                    >
                      mail
                    </span>
                    <span style={{ minWidth: "0" }}>nicolaleone.ciardi@cimaprogetti.it</span>
                  </a>
                </div>
                <div style={{ display: "grid", gridTemplateRows: "subgrid", gridRow: "span 5", rowGap: "6px", marginBottom: "24px" }}>
                  <span style={{ fontWeight: "700", fontSize: "clamp(20px,1.7vw,24px)", letterSpacing: "-.03em", lineHeight: "1.1" }}>
                    Valentina Madaudo
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: "12px",
                      color: "var(--accent)",
                      textTransform: "uppercase",
                      letterSpacing: ".04em",
                    }}
                  >
                    Co-founder & CFO
                  </span>
                  <p style={{ margin: "4px 0 6px", fontSize: "15px", lineHeight: "1.45", color: "var(--body)", textWrap: "pretty" }}>
                    Jr Engineer & economist for sustainable development.
                  </p>
                  <a
                    href={waLink("+39 339 358 0805")}
                    target="_blank"
                    rel="noopener"
                    className="h-color"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      minHeight: "44px",
                      fontSize: "15px",
                      color: "var(--ink)",
                      overflowWrap: "anywhere",
                      "--h-color": "var(--accent)",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        width: "20px",
                        height: "20px",
                        flex: "none",
                        color: "var(--accent)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "'Material Symbols Sharp'",
                        fontSize: "20px",
                        lineHeight: "1",
                        fontFeatureSettings: "'liga'",
                        overflow: "hidden",
                      }}
                    >
                      call
                    </span>
                    <span style={{ minWidth: "0" }}>+39 339 358 0805</span>
                  </a>
                  <a
                    href="mailto:valentina.madaudo@cimaprogetti.it"
                    className="h-color"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      minHeight: "44px",
                      fontSize: "15px",
                      color: "var(--ink)",
                      overflowWrap: "anywhere",
                      "--h-color": "var(--accent)",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        width: "20px",
                        height: "20px",
                        flex: "none",
                        color: "var(--accent)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "'Material Symbols Sharp'",
                        fontSize: "20px",
                        lineHeight: "1",
                        fontFeatureSettings: "'liga'",
                        overflow: "hidden",
                      }}
                    >
                      mail
                    </span>
                    <span style={{ minWidth: "0" }}>valentina.madaudo@cimaprogetti.it</span>
                  </a>
                </div>
              </div>
            </div>
            <div
              data-reveal="1"
              data-delay="300"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                marginTop: "clamp(24px,3.6vh,36px)",
                paddingTop: "clamp(24px,3.6vh,36px)",
                borderTop: "1px solid var(--line)",
              }}
            >
              <span style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--meta)", display: "flex", gap: "10px" }}>
                <span style={{ color: "var(--accent)" }}>04</span>seguici
              </span>
              <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.5", color: "var(--body)", maxWidth: "48ch", textWrap: "pretty" }}>
                Progetti, dietro le quinte e novità: segui CiMa Progetti sui social.
              </p>
              <div style={{ display: "flex", flexDirection: "column", borderTop: "1px solid var(--line)" }}>
                <a
                  href="https://www.instagram.com/cimaprogetti"
                  target="_blank"
                  rel="noopener"
                  className="h-color"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    gap: "16px",
                    minHeight: "44px",
                    padding: "12px 0",
                    borderBottom: "1px solid var(--line)",
                    color: "var(--ink)",
                    transition: "color .2s",
                    "--h-color": "var(--accent)",
                  }}
                >
                  <span style={{ fontWeight: "700", fontSize: "clamp(20px,1.7vw,24px)", letterSpacing: "-.03em", lineHeight: "1.1" }}>
                    Instagram
                  </span>
                  <span style={{ fontFamily: "var(--mono)", fontSize: "13px", color: "var(--accent)", overflowWrap: "anywhere" }}>
                    @cimaprogetti ↗
                  </span>
                </a>
                <a
                  href="https://www.tiktok.com/@cima.progetti"
                  target="_blank"
                  rel="noopener"
                  className="h-color"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    gap: "16px",
                    minHeight: "44px",
                    padding: "12px 0",
                    borderBottom: "1px solid var(--line)",
                    color: "var(--ink)",
                    transition: "color .2s",
                    "--h-color": "var(--accent)",
                  }}
                >
                  <span style={{ fontWeight: "700", fontSize: "clamp(20px,1.7vw,24px)", letterSpacing: "-.03em", lineHeight: "1.1" }}>
                    TikTok
                  </span>
                  <span style={{ fontFamily: "var(--mono)", fontSize: "13px", color: "var(--accent)", overflowWrap: "anywhere" }}>
                    @cima.progetti ↗
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div style={{ gridColumn: formGC, gridRow: formGR, display: "flex", flexDirection: "column", gap: "12px" }}>
            {(steps || []).map((st, st_i) => (
              <React.Fragment key={st_i}>
                <div
                  data-reveal="1"
                  data-delay={st.delay}
                  style={{ border: `1px solid ${st.cardBd}`, padding: "20px", transition: "border-color .3s" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px", flexWrap: "wrap" }}>
                    <span
                      style={{
                        width: "28px",
                        height: "28px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "var(--mono)",
                        fontSize: "11px",
                        background: st.badgeBg,
                        color: st.badgeFg,
                        border: `1px solid ${st.badgeBd}`,
                        transition: "background .3s,color .3s,border-color .3s",
                      }}
                    >
                      {st.badge}
                    </span>
                    <span style={{ fontWeight: "700", fontSize: "18px", letterSpacing: "-.02em" }}>{st.title}</span>
                    <span style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--meta)", marginLeft: "auto" }}>{st.hint}</span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {(st.opts || []).map((o, o_i) => (
                      <React.Fragment key={o_i}>
                        <button
                          onClick={o.toggle}
                          className="h-border-color"
                          style={{
                            minHeight: "44px",
                            padding: "0 14px",
                            border: `1px solid ${o.bd}`,
                            background: o.bg,
                            color: o.fg,
                            fontSize: "15px",
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            transition: "background .2s,color .2s,border-color .2s",
                            "--h-border-color": "var(--accent)",
                          }}
                        >
                          {o.label}
                        </button>
                      </React.Fragment>
                    ))}
                  </div>
                  {st.showNote ? (
                    <>
                      <div style={{ marginTop: "12px", fontFamily: "var(--mono)", fontSize: "12px", color: "var(--accent)" }}>
                        {st.note}
                      </div>
                    </>
                  ) : null}
                </div>
              </React.Fragment>
            ))}
            <div
              data-reveal="1"
              style={{
                background: "var(--subtle)",
                border: "1px solid var(--line-soft)",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                marginTop: "12px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
                <span style={{ fontWeight: "700", fontSize: "16px" }}>Il tuo messaggio</span>
                <span style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--meta)" }}>{doneCount} / 3 scelte</span>
              </div>
              <div style={{ height: "3px", background: "var(--track)" }}>
                <div
                  style={{ height: "100%", width: pct, background: "var(--fill-accent)", transition: "width .5s cubic-bezier(.2,.7,.2,1)" }}
                ></div>
              </div>
              <div
                style={{
                  background: "var(--bg)",
                  border: "1px solid var(--line)",
                  padding: "18px",
                  fontFamily: "var(--mono)",
                  fontSize: "13px",
                  lineHeight: "1.75",
                  whiteSpace: "pre-wrap",
                  minHeight: "220px",
                  color: "var(--ink)",
                }}
              >
                {preview}
              </div>
              <a
                href={mail}
                data-magnetic="1"
                className="h-background h-color"
                style={{
                  height: "56px",
                  padding: "0 20px",
                  background: "var(--fill-accent)",
                  color: "var(--on-fill)",
                  fontWeight: "700",
                  fontSize: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                  transition: "background .25s",
                  "--h-background": "var(--fill-ink)",
                  "--h-color": "var(--on-fill)",
                }}
              >
                Invia dalla tua email
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M4 12h15M12 5l7 7-7 7" style={{ stroke: "var(--on-fill)", strokeWidth: "2.4px", strokeLinecap: "square" }} />
                </svg>
              </a>
              {noDiag ? (
                <>
                  <button
                    onClick={openDiag}
                    className="h-color"
                    style={{
                      background: "transparent",
                      border: "0",
                      padding: "6px 0",
                      textAlign: "left",
                      cursor: "pointer",
                      fontFamily: "var(--mono)",
                      fontSize: "12px",
                      color: "var(--accent)",
                      "--h-color": "var(--ink)",
                    }}
                  >
                    non sai cosa scegliere? fai prima la diagnosi →
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </section>
      <section style={{ borderTop: "1px solid var(--line-soft)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(80px,12vh,136px) clamp(20px,4vw,48px)" }}>
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
            cosa succede dopo
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,280px),1fr))", gap: "12px", marginTop: "28px" }}
          >
            <div
              data-reveal="1"
              style={{ border: "1px solid var(--line)", padding: "26px", display: "flex", flexDirection: "column", gap: "14px" }}
            >
              <span style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--accent)" }}>01 · entro 2 giorni</span>
              <span style={{ fontWeight: "700", fontSize: "22px", letterSpacing: "-.02em" }}>Ti proponiamo una data</span>
              <span style={{ fontSize: "15px", lineHeight: "1.5", color: "var(--body)" }}>
                Una risposta da una persona, non da un sistema automatico.
              </span>
            </div>
            <div
              data-reveal="1"
              data-delay="120"
              style={{ border: "1px solid var(--line)", padding: "26px", display: "flex", flexDirection: "column", gap: "14px" }}
            >
              <span style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--accent)" }}>02 · gratuito</span>
              <span style={{ fontWeight: "700", fontSize: "22px", letterSpacing: "-.02em" }}>Sopralluogo in azienda o call dedicata</span>
              <span style={{ fontSize: "15px", lineHeight: "1.5", color: "var(--body)" }}>
                Guardiamo come lavori e parliamo con chi fa il lavoro. Può essere applicato un rimborso spese.
              </span>
            </div>
            <div
              data-reveal="1"
              data-delay="240"
              style={{ border: "1px solid var(--accent)", padding: "26px", display: "flex", flexDirection: "column", gap: "14px" }}
            >
              <span style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--accent)" }}>03 · cosa ottieni</span>
              <span style={{ fontWeight: "700", fontSize: "22px", letterSpacing: "-.02em" }}>Una fotografia dei tuoi processi</span>
              <span style={{ fontSize: "15px", lineHeight: "1.5", color: "var(--body)" }}>
                Dove si inceppano e quanto ti costa. Resta tua anche se poi non lavori con noi.
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer cta={false} />
  </>);
  }
}

export default ContattiPage;
