// @ts-nocheck — porting automatico di ChiSiamo.dc.html (logica originale quasi verbatim)
"use client";
/* eslint-disable */
import React from "react";
import Link from "next/link";
import Footer from "@/components/cp/Footer";
import MaterialSymbolsFont from "@/components/MaterialSymbolsFont";
import { CP_DATA } from "@/lib/cp/data";
import { CP_QUIZ, CP_DIAG } from "@/lib/cp/quiz";

class ChiSiamoPage extends React.Component<any, any> {
  [key: string]: any;
  state = { vw: 1280 };
  componentDidMount() {
    if (this.state && 'vw' in this.state) this.setState({ vw: window.innerWidth }); this.boot(); this._r = () => this.setState({ vw: window.innerWidth }); window.addEventListener('resize', this._r); }
  componentWillUnmount() { clearTimeout(this._w); window.removeEventListener('resize', this._r); }
  boot() { if (!CP_DATA) { this._w = setTimeout(() => this.boot(), 30); return; } this.forceUpdate(); }
  renderVals(): any {
    const D = CP_DATA; if (!D) return {};
    const wide = this.state.vw >= 1000;
    return { trioCols: this.state.vw >= 860 ? 'repeat(3,minmax(0,1fr))' : 'minmax(0,1fr)', team: D.team.map((t, i) => ({ ...t, delay: String(i * 120), href: '/chi-siamo/' + t.slug })), chiCols: wide ? 'repeat(3,minmax(0,1fr))' : 'minmax(0,1fr)', m1: '0', m2: wide ? 'clamp(56px,9vh,104px) 0 0 0' : '0 0 0 8%', m3: wide ? 'clamp(112px,18vh,208px) 0 0 0' : '0 0 0 16%' };
  }

  render() {
    const { team, chiCols, m1, m2, m3, trioCols } = this.renderVals();
    return (<>
<MaterialSymbolsFont />
    <main>
      <section
        style={{
          backgroundImage: "radial-gradient(var(--dot) 1px,transparent 1px)",
          backgroundSize: "24px 24px",
          borderBottom: "1px solid var(--line-soft)",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "calc(72px + clamp(48px,9vh,104px)) clamp(20px,4vw,48px) clamp(80px,12vh,136px)",
          }}
        >
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
            Chi siamo
          </div>
          <p data-reveal="1" style={{ fontSize: "clamp(17px,1.35vw,20px)", lineHeight: "1.5", color: "var(--body)", margin: "24px 0 0" }}>
            Abbiamo ribadito più e più volte che
          </p>
          <h1
            data-rise-group="1"
            style={{
              fontWeight: "700",
              fontSize: "clamp(40px,6.4vw,104px)",
              lineHeight: ".95",
              letterSpacing: "-.05em",
              textTransform: "uppercase",
              margin: "14px 0 0",
            }}
          >
            <span style={{ display: "block", overflow: "hidden", paddingBottom: ".08em" }}>
              <span data-rise="1" style={{ display: "block" }}>
                Ogni azienda
              </span>
            </span>
            <span style={{ display: "block", overflow: "hidden", paddingBottom: ".08em" }}>
              <span data-rise="1" style={{ display: "block", color: "var(--accent)" }}>
                nasce dalle persone_
              </span>
            </span>
          </h1>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: chiCols,
              gap: "24px clamp(20px,2.4vw,36px)",
              alignItems: "start",
              marginTop: "clamp(48px,7vh,80px)",
            }}
          >
            <div
              data-reveal="1"
              style={{
                margin: m1,
                padding: "28px 0 0",
                borderTop: "2px solid var(--ink)",
                display: "flex",
                flexDirection: "column",
                gap: "18px",
              }}
            >
              <p style={{ margin: "0", fontSize: "clamp(16px,1.2vw,18px)", lineHeight: "1.55", color: "var(--body)", textWrap: "pretty" }}>
                La tecnologia è una leva, non il fine. Il vero valore aggiunto sono le persone: la loro esperienza, la cura per il dettaglio
                e la responsabilità di costruire soluzioni che restano solide nel tempo. È la{" "}
                <strong
                  style={{
                    fontWeight: "700",
                    fontSize: "clamp(28px,2.8vw,44px)",
                    lineHeight: "1.08",
                    letterSpacing: "-.04em",
                    color: "var(--accent)",
                  }}
                >
                  completezza del team
                </strong>{" "}
                — non un singolo strumento — a fare la differenza.
              </p>
            </div>
            <div
              data-reveal="1"
              style={{ margin: m2, padding: "28px", background: "var(--subtle)", display: "flex", flexDirection: "column", gap: "18px" }}
            >
              <p style={{ margin: "0", fontSize: "clamp(16px,1.2vw,18px)", lineHeight: "1.55", color: "var(--body)", textWrap: "pretty" }}>
                Ogni giorno tessiamo la nostra{" "}
                <strong
                  style={{
                    fontWeight: "700",
                    fontSize: "clamp(28px,2.8vw,44px)",
                    lineHeight: "1.08",
                    letterSpacing: "-.04em",
                    color: "var(--accent)",
                  }}
                >
                  rete di consulenti e specialisti
                </strong>{" "}
                per offrirti la miglior competenza tecnica ed esperienza per i tuoi lavori.
              </p>
            </div>
            <div
              data-reveal="1"
              style={{
                margin: m3,
                padding: "28px",
                background: "var(--bg)",
                border: "1px solid var(--accent)",
                display: "flex",
                flexDirection: "column",
                gap: "18px",
              }}
            >
              <p style={{ margin: "0", fontSize: "clamp(16px,1.2vw,18px)", lineHeight: "1.55", color: "var(--body)", textWrap: "pretty" }}>
                Non siamo un fornitore, ma un{" "}
                <strong
                  style={{
                    fontWeight: "700",
                    fontSize: "clamp(28px,2.8vw,44px)",
                    lineHeight: "1.08",
                    letterSpacing: "-.04em",
                    color: "var(--accent)",
                  }}
                >
                  partner tecnico
                </strong>{" "}
                e strategico: ascoltiamo, progettiamo e costruiamo soluzioni solide nel tempo, mettendo sempre il valore umano al centro.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section style={{ background: "var(--subtle)" }}>
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
            complementari per natura
          </div>
          <h2
            data-rise-group="1"
            style={{
              fontWeight: "700",
              fontSize: "clamp(34px,4.4vw,64px)",
              lineHeight: "1",
              letterSpacing: "-.04em",
              margin: "18px 0 16px",
            }}
          >
            <span style={{ display: "block", overflow: "hidden", paddingBottom: ".08em" }}>
              <span data-rise="1" style={{ display: "block" }}>
                I founder_
              </span>
            </span>
          </h2>
          <p
            data-reveal="1"
            style={{
              fontSize: "clamp(17px,1.35vw,20px)",
              lineHeight: "1.5",
              color: "var(--body)",
              maxWidth: "620px",
              margin: "0 0 40px",
              textWrap: "pretty",
            }}
          >
            Tecnica e visione, processo e creatività, velocità e consapevolezza. Chi ti ascolta al sopralluogo è chi poi costruisce lo
            strumento.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,360px),1fr))",
              gap: "48px clamp(40px,6vw,96px)",
            }}
          >
            {(team || []).map((t, t_i) => (
              <React.Fragment key={t_i}>
                <div data-reveal="1" data-delay={t.delay} style={{ display: "flex", flexDirection: "column" }}>
                  <div
                    style={{
                      flex: "1",
                      padding: "24px 0 0",
                      borderTop: "2px solid var(--ink)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--mono)",
                          fontSize: "12px",
                          color: "var(--accent)",
                          textTransform: "uppercase",
                          letterSpacing: ".04em",
                        }}
                      >
                        {t.title}
                      </div>
                      <Link
                        href={t.href}
                        className="h-color"
                        style={{
                          display: "inline-flex",
                          alignItems: "baseline",
                          gap: "12px",
                          fontWeight: "700",
                          fontSize: "clamp(22px,2vw,28px)",
                          letterSpacing: "-.03em",
                          lineHeight: "1.05",
                          marginTop: "10px",
                          color: "var(--ink)",
                          textDecoration: "none",
                          transition: "color .2s",
                          "--h-color": "var(--accent)",
                        }}
                      >
                        {t.name}
                        <span style={{ color: "var(--accent)", fontSize: ".8em" }}>→</span>
                      </Link>
                      <p style={{ margin: "12px 0 0", fontSize: "15px", lineHeight: "1.55", color: "var(--body)", textWrap: "pretty" }}>
                        {t.bio}
                      </p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", borderTop: "1px solid var(--line-soft)" }}>
                      {(t.skills || []).map((s, s_i) => (
                        <React.Fragment key={s_i}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "12px",
                              padding: "10px 0",
                              borderBottom: "1px solid var(--line-soft)",
                            }}
                          >
                            <span
                              style={{
                                width: "24px",
                                height: "24px",
                                flex: "none",
                                color: "var(--accent)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontFamily: "'Material Symbols Sharp'",
                                fontSize: "22px",
                                lineHeight: "1",
                                fontFeatureSettings: "'liga'",
                                WebkitFontSmoothing: "antialiased",
                                overflow: "hidden",
                              }}
                            >
                              {s.icon}
                            </span>
                            <span style={{ fontWeight: "700", fontSize: "15px", letterSpacing: "-.01em" }}>{s.label}</span>
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                    <div style={{ marginTop: "auto", display: "flex", flexWrap: "wrap", gap: "4px 24px" }}>
                      <Link
                        href={t.href}
                        className="h-color"
                        style={{
                          minHeight: "44px",
                          display: "inline-flex",
                          alignItems: "center",
                          fontFamily: "var(--mono)",
                          fontSize: "13px",
                          color: "var(--accent)",
                          "--h-color": "var(--ink)",
                        }}
                      >
                        profilo e contatti →
                      </Link>
                      <a
                        href={t.linkedin}
                        target="_blank"
                        rel="noopener"
                        className="h-color"
                        style={{
                          minHeight: "44px",
                          display: "inline-flex",
                          alignItems: "center",
                          fontFamily: "var(--mono)",
                          fontSize: "13px",
                          color: "var(--accent)",
                          "--h-color": "var(--ink)",
                        }}
                      >
                        LinkedIn ↗
                      </a>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>
      <section style={{ borderTop: "1px solid var(--line-soft)" }}>
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "clamp(80px,12vh,136px) clamp(20px,4vw,48px)",
            display: "grid",
            gridTemplateColumns: trioCols,
            gap: "56px clamp(32px,4vw,72px)",
          }}
        >
          <div data-reveal="1" data-delay="0" style={{ display: "grid", gridTemplateRows: "subgrid", gridRow: "span 4", rowGap: "16px" }}>
            <div style={{ height: "clamp(110px,12vw,150px)", display: "flex", alignItems: "center", marginBottom: "8px" }}>
              <svg viewBox="0 0 240 200" fill="none" style={{ height: "100%", width: "auto", display: "block" }}>
                <circle cx="100" cy="115" r="80" fill="none" style={{ strokeWidth: "1.6px", stroke: "var(--ink)" }} />
                <circle cx="100" cy="115" r="40" fill="none" style={{ strokeWidth: "1.6px", stroke: "var(--accent)" }} />
                <circle cx="196" cy="34" r="22" fill="none" style={{ strokeWidth: "1.6px", stroke: "var(--ink)" }} />
              </svg>
            </div>
            <h3
              style={{
                margin: "0 0 8px",
                fontWeight: "700",
                fontSize: "clamp(24px,2.2vw,32px)",
                letterSpacing: "-.035em",
                lineHeight: "1.05",
                alignSelf: "end",
              }}
            >
              Competenze complementari
            </h3>
            <ul style={{ margin: "0", padding: "0", listStyle: "none", display: "contents" }}>
              <li
                style={{
                  display: "grid",
                  gridTemplateColumns: "8px minmax(0,1fr)",
                  gap: "16px",
                  alignItems: "baseline",
                  fontSize: "clamp(16px,1.2vw,18px)",
                  lineHeight: "1.55",
                  color: "var(--body)",
                  textWrap: "pretty",
                }}
              >
                <span style={{ width: "8px", height: "8px", background: "var(--fill-accent)", transform: "translateY(-2px)" }}></span>
                <span>Tecnica e visione che si completano, senza zone grigie tra i ruoli.</span>
              </li>
              <li
                style={{
                  display: "grid",
                  gridTemplateColumns: "8px minmax(0,1fr)",
                  gap: "16px",
                  alignItems: "baseline",
                  fontSize: "clamp(16px,1.2vw,18px)",
                  lineHeight: "1.55",
                  color: "var(--body)",
                  textWrap: "pretty",
                }}
              >
                <span style={{ width: "8px", height: "8px", background: "var(--fill-accent)", transform: "translateY(-2px)" }}></span>
                <span>{"Un team che copre l'intero arco: dall'idea ai processi, dalla visione al sistema."}</span>
              </li>
            </ul>
          </div>
          <div data-reveal="1" data-delay="120" style={{ display: "grid", gridTemplateRows: "subgrid", gridRow: "span 4", rowGap: "16px" }}>
            <div style={{ height: "clamp(110px,12vw,150px)", display: "flex", alignItems: "center", marginBottom: "8px" }}>
              <svg viewBox="0 0 290 170" fill="none" style={{ height: "100%", width: "auto", display: "block" }}>
                <circle cx="80" cy="85" r="74" fill="none" style={{ strokeWidth: "1.6px", stroke: "var(--line-strong)" }} />
                <circle cx="118" cy="85" r="74" fill="none" style={{ strokeWidth: "1.6px", stroke: "var(--meta)" }} />
                <circle cx="156" cy="85" r="74" fill="none" style={{ strokeWidth: "1.6px", stroke: "var(--meta)" }} />
                <circle cx="198" cy="85" r="74" fill="none" style={{ strokeWidth: "1.6px", stroke: "var(--accent)" }} />
              </svg>
            </div>
            <h3
              style={{
                margin: "0 0 8px",
                fontWeight: "700",
                fontSize: "clamp(24px,2.2vw,32px)",
                letterSpacing: "-.035em",
                lineHeight: "1.05",
                alignSelf: "end",
              }}
            >
              Relazione diretta
            </h3>
            <ul style={{ margin: "0", padding: "0", listStyle: "none", display: "contents" }}>
              <li
                style={{
                  display: "grid",
                  gridTemplateColumns: "8px minmax(0,1fr)",
                  gap: "16px",
                  alignItems: "baseline",
                  fontSize: "clamp(16px,1.2vw,18px)",
                  lineHeight: "1.55",
                  color: "var(--body)",
                  textWrap: "pretty",
                }}
              >
                <span style={{ width: "8px", height: "8px", background: "var(--fill-accent)", transform: "translateY(-2px)" }}></span>
                <span>Parli con chi progetta e realizza davvero, senza filtri o intermediari.</span>
              </li>
              <li
                style={{
                  display: "grid",
                  gridTemplateColumns: "8px minmax(0,1fr)",
                  gap: "16px",
                  alignItems: "baseline",
                  fontSize: "clamp(16px,1.2vw,18px)",
                  lineHeight: "1.55",
                  color: "var(--body)",
                  textWrap: "pretty",
                }}
              >
                <span style={{ width: "8px", height: "8px", background: "var(--fill-accent)", transform: "translateY(-2px)" }}></span>
                <span>Un rapporto di fiducia che cresce e dura nel tempo.</span>
              </li>
            </ul>
          </div>
          <div data-reveal="1" data-delay="240" style={{ display: "grid", gridTemplateRows: "subgrid", gridRow: "span 4", rowGap: "16px" }}>
            <div style={{ height: "clamp(110px,12vw,150px)", display: "flex", alignItems: "center", marginBottom: "8px" }}>
              <svg viewBox="0 0 270 210" fill="none" style={{ height: "100%", width: "auto", display: "block" }}>
                <circle cx="92" cy="125" r="80" fill="none" style={{ strokeWidth: "1.6px", stroke: "var(--ink)" }} />
                <circle cx="176" cy="84" r="80" fill="none" style={{ strokeWidth: "1.6px", stroke: "var(--accent)" }} />
              </svg>
            </div>
            <h3
              style={{
                margin: "0 0 8px",
                fontWeight: "700",
                fontSize: "clamp(24px,2.2vw,32px)",
                letterSpacing: "-.035em",
                lineHeight: "1.05",
                alignSelf: "end",
              }}
            >
              Il valore umano
            </h3>
            <ul style={{ margin: "0", padding: "0", listStyle: "none", display: "contents" }}>
              <li
                style={{
                  display: "grid",
                  gridTemplateColumns: "8px minmax(0,1fr)",
                  gap: "16px",
                  alignItems: "baseline",
                  fontSize: "clamp(16px,1.2vw,18px)",
                  lineHeight: "1.55",
                  color: "var(--body)",
                  textWrap: "pretty",
                }}
              >
                <span style={{ width: "8px", height: "8px", background: "var(--fill-accent)", transform: "translateY(-2px)" }}></span>
                <span>Le persone al centro: progettiamo pensando a chi (e come) userà il sistema.</span>
              </li>
              <li
                style={{
                  display: "grid",
                  gridTemplateColumns: "8px minmax(0,1fr)",
                  gap: "16px",
                  alignItems: "baseline",
                  fontSize: "clamp(16px,1.2vw,18px)",
                  lineHeight: "1.55",
                  color: "var(--body)",
                  textWrap: "pretty",
                }}
              >
                <span style={{ width: "8px", height: "8px", background: "var(--fill-accent)", transform: "translateY(-2px)" }}></span>
                <span>{"Se usiamo l'IA lo dichiariamo sempre, e non le deleghiamo la progettazione."}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>);
  }
}

export default ChiSiamoPage;
