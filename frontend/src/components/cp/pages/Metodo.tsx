// @ts-nocheck — porting automatico di Metodo.dc.html (logica originale quasi verbatim)
"use client";
/* eslint-disable */
import React from "react";
import Footer from "@/components/cp/Footer";
import { CP_DATA } from "@/lib/cp/data";
import { CP_QUIZ, CP_DIAG } from "@/lib/cp/quiz";

class MetodoPage extends React.Component<any, any> {
  [key: string]: any;
  state = { faq: 0, act: 0, vw: 1280 };
  navRef = React.createRef();
  componentDidMount() {
    if (this.state && 'vw' in this.state) this.setState({ vw: window.innerWidth });
    this.boot(); this._r = () => this.setState({ vw: window.innerWidth }); window.addEventListener('resize', this._r);
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    this._t = setInterval(() => { if (!this._hold) this.setState(s => ({ act: (s.act + 1) % 6 })); }, 1700);
    this._m = e => { if (this._f) return; this._f = requestAnimationFrame(() => { this._f = 0; const n = this.navRef.current; if (!n || window.innerWidth < 1000) return;
      const nx = e.clientX / window.innerWidth - .5, ny = e.clientY / window.innerHeight - .5;
      n.querySelectorAll('[data-depth]').forEach(el => { const d = +el.getAttribute('data-depth'); el.style.translate = (nx * d).toFixed(1) + 'px ' + (ny * d).toFixed(1) + 'px'; }); }); };
    window.addEventListener('mousemove', this._m);
  }
  componentWillUnmount() { clearTimeout(this._w); clearInterval(this._t); cancelAnimationFrame(this._f); window.removeEventListener('resize', this._r); window.removeEventListener('mousemove', this._m); }
  boot() { if (!CP_DATA) { this._w = setTimeout(() => this.boot(), 30); return; } this.forceUpdate(); }
  renderVals(): any {
    const D = CP_DATA; if (!D) return {};
    const { faq } = this.state;
    const { vw, act } = this.state, wide = vw >= 1000, tiny = vw < 560;
    const place = [['1 / 7', '1 / 5'], ['7 / 11', '1 / 3'], ['7 / 13', '3 / 5'], ['2 / 6', '5 / 8'], ['6 / 13', '5 / 7'], ['6 / 11', '7 / 9']];
    const tinyPlace = [['1 / 3', 'span 2'], ['1 / 2', 'auto'], ['2 / 3', 'auto'], ['1 / 3', 'auto'], ['1 / 2', 'auto'], ['2 / 3', 'auto']];
    const depth = [4, 10, 16, 7, 13, 19];
    const cards = D.method.map((m, i) => { const hi = i === 0, on = i === act, p = (tiny ? tinyPlace : place)[i]; return { num: m.num, title: m.title, time: m.time, delay: String(120 + i * 70), depth: String(depth[i]), gc: p[0], gr: p[1],
      bd: on ? 'var(--accent)' : 'var(--line)', bar: on ? 'scaleX(1)' : 'scaleX(0)', barT: on ? 'transform 1.7s linear' : 'transform .3s', tintW: on ? '1.05em' : '.6em',
      numSize: hi ? 'clamp(52px,4.6vw,76px)' : 'clamp(28px,2.4vw,38px)', titleSize: hi ? 'clamp(18px,1.6vw,24px)' : 'clamp(13px,1.05vw,15px)',
      enter: () => { this._hold = true; this.setState({ act: i }); }, leave: () => { this._hold = false; } }; });
    return { steps: D.method, cards, navRef: this.navRef, heroCols: wide ? 'minmax(0,1fr) minmax(0,1fr)' : 'minmax(0,1fr)', bentoCols: 'repeat(' + (tiny ? 2 : 12) + ',minmax(0,1fr))', bentoRows: tiny ? 'minmax(96px,auto)' : 'clamp(50px,6.4vh,60px)',
      faq: D.faq.map((f, i) => { const on = faq === i; return { ...f, rows: on ? '1fr' : '0fr', rot: on ? 'rotate(45deg)' : 'none', iconBg: on ? 'var(--fill-ink)' : 'var(--fill-accent)', toggle: () => this.setState(s => ({ faq: s.faq === i ? -1 : i })) }; }) };
  }

  render() {
    const { navRef, cards, steps, faq, bentoCols, bentoRows, heroCols } = this.renderVals();
    return (<>
    <main>
      <section
        style={{
          minHeight: "100svh",
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          padding: "calc(72px + clamp(32px,6vh,72px)) clamp(20px,4vw,48px) clamp(48px,8vh,88px)",
          backgroundImage: "radial-gradient(var(--dot) 1px,transparent 1px)",
          backgroundSize: "24px 24px",
          borderBottom: "1px solid var(--line-soft)",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            width: "100%",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: heroCols,
            gap: "48px 64px",
            alignItems: "center",
          }}
        >
          <div>
            <div
              data-reveal="1"
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: "var(--bg)",
                border: "1px solid var(--line)",
                padding: "8px 12px",
                fontFamily: "var(--mono)",
                fontSize: "12px",
                color: "var(--body)",
              }}
            >
              Un risultato solido parte da un metodo
            </div>
            <h1
              data-rise-group="1"
              style={{
                fontWeight: "700",
                fontSize: "clamp(48px,6.6vw,104px)",
                lineHeight: ".95",
                letterSpacing: "-.05em",
                margin: "28px 0 0",
              }}
            >
              <span style={{ display: "block", overflow: "hidden", paddingBottom: ".08em" }}>
                <span data-rise="1" style={{ display: "block" }}>
                  Passaggi chiari.
                </span>
              </span>
              <span style={{ display: "block", overflow: "hidden", paddingBottom: ".08em" }}>
                <span data-rise="1" style={{ display: "block", color: "var(--accent)" }}>
                  Nessuna sorpresa_
                </span>
              </span>
            </h1>
            <p
              data-reveal="1"
              style={{
                fontSize: "clamp(17px,1.35vw,20px)",
                lineHeight: "1.5",
                color: "var(--body)",
                maxWidth: "560px",
                margin: "28px 0 0",
                textWrap: "pretty",
              }}
            >
              Il primo passo è gratuito e ti lascia qualcosa di concreto in mano.
              <br />
              Ogni passo successivo si decide sapendo perché serve, cosa si ottiene e quanto costa.
            </p>
          </div>
          <nav
            ref={navRef}
            aria-label="Fasi"
            style={{ display: "grid", gridTemplateColumns: bentoCols, gridAutoRows: bentoRows, gap: "8px" }}
          >
            {(cards || []).map((c, c_i) => (
              <React.Fragment key={c_i}>
                <div data-reveal="1" data-delay={c.delay} style={{ gridColumn: c.gc, gridRow: c.gr, display: "flex", minWidth: "0" }}>
                  <a
                    data-depth={c.depth}
                    href={`#fase-${c.num}`}
                    onMouseEnter={c.enter}
                    onMouseLeave={c.leave}
                    className="h-transform"
                    style={{
                      flex: "1",
                      position: "relative",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      gap: "8px",
                      padding: "12px 14px",
                      background: "var(--bg)",
                      color: "var(--ink)",
                      border: `1px solid ${c.bd}`,
                      textDecoration: "none",
                      minWidth: "0",
                      transition: "transform .25s cubic-bezier(.2,.7,.2,1),border-color .3s,translate .6s cubic-bezier(.2,.7,.2,1)",
                      "--h-transform": "translateY(-3px)",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        top: "-1px",
                        left: "-1px",
                        right: "-1px",
                        height: "3px",
                        background: "var(--fill-accent)",
                        transformOrigin: "left",
                        transform: c.bar,
                        transition: c.barT,
                      }}
                    ></span>
                    <span
                      style={{
                        position: "relative",
                        alignSelf: "flex-start",
                        display: "inline-block",
                        fontWeight: "700",
                        fontSize: c.numSize,
                        lineHeight: ".8",
                        letterSpacing: "-.06em",
                        color: "var(--accent)",
                        padding: ".14em 0 0 .12em",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          left: "0",
                          top: "0",
                          width: c.tintW,
                          height: c.tintW,
                          background: "var(--accent-tint)",
                          transition: "width .5s cubic-bezier(.2,.7,.2,1),height .5s cubic-bezier(.2,.7,.2,1)",
                        }}
                      ></span>
                      <span style={{ position: "relative" }}>{c.num}</span>
                    </span>
                    <span style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                      <span
                        style={{
                          fontWeight: "700",
                          fontSize: c.titleSize,
                          letterSpacing: "-.02em",
                          lineHeight: "1.05",
                          textTransform: "uppercase",
                        }}
                      >
                        {c.title}_
                      </span>
                      <span style={{ fontFamily: "var(--mono)", fontSize: "11px", lineHeight: "1.35", color: "var(--meta)" }}>
                        {c.time}
                      </span>
                    </span>
                  </a>
                </div>
              </React.Fragment>
            ))}
          </nav>
        </div>
      </section>
      <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 clamp(20px,4vw,48px) clamp(80px,12vh,136px)" }}>
        <div data-vtrack="1" style={{ position: "relative", paddingLeft: "clamp(40px,5vw,72px)" }}>
          <div style={{ position: "absolute", left: "7px", top: "0", bottom: "0", width: "2px", background: "var(--track)" }}></div>
          <div
            data-vfill="1"
            style={{
              position: "absolute",
              left: "7px",
              top: "0",
              bottom: "0",
              width: "2px",
              background: "var(--fill-accent)",
              transformOrigin: "top",
              transform: "scaleY(0)",
            }}
          ></div>
          {(steps || []).map((m, m_i) => (
            <React.Fragment key={m_i}>
              <div
                id={`fase-${m.num}`}
                style={{
                  position: "relative",
                  scrollMarginTop: "72px",
                  minHeight: "60vh",
                  padding: "clamp(48px,8vh,88px) 0",
                  borderBottom: "1px solid var(--line-soft)",
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))",
                  gap: "24px 56px",
                  alignItems: "start",
                }}
              >
                <span
                  data-vdot="1"
                  style={{
                    position: "absolute",
                    left: "calc(-1 * clamp(40px,5vw,72px))",
                    top: "calc(clamp(48px,8vh,88px) + 6px)",
                    width: "16px",
                    height: "16px",
                    background: "var(--bg)",
                    border: "2px solid var(--line-strong)",
                    transition: "background .3s,border-color .3s",
                  }}
                ></span>
                <div>
                  <div
                    data-reveal="1"
                    style={{
                      display: "inline-flex",
                      fontFamily: "var(--mono)",
                      fontSize: "12px",
                      color: "var(--accent)",
                      border: "1px solid var(--accent)",
                      padding: "6px 10px",
                    }}
                  >
                    {m.time}
                  </div>
                  <div
                    data-reveal="1"
                    data-delay="100"
                    style={{
                      fontWeight: "700",
                      fontSize: "clamp(96px,11vw,170px)",
                      letterSpacing: "-.075em",
                      lineHeight: ".8",
                      marginTop: "22px",
                    }}
                  >
                    {m.num}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <h2
                    data-reveal="1"
                    style={{
                      fontWeight: "700",
                      fontSize: "clamp(30px,3.6vw,52px)",
                      letterSpacing: "-.04em",
                      lineHeight: "1",
                      margin: "0",
                      textTransform: "uppercase",
                    }}
                  >
                    {m.title}_
                  </h2>
                  <p
                    data-reveal="1"
                    data-delay="100"
                    style={{
                      margin: "0",
                      fontSize: "clamp(17px,1.35vw,20px)",
                      lineHeight: "1.5",
                      color: "var(--body)",
                      maxWidth: "560px",
                      textWrap: "pretty",
                    }}
                  >
                    {m.body}
                  </p>
                  <div
                    data-reveal="1"
                    data-delay="200"
                    style={{
                      background: "var(--subtle)",
                      border: "1px solid var(--line-soft)",
                      padding: "18px 20px",
                      display: "grid",
                      gridTemplateColumns: "28px minmax(0,1fr)",
                      gap: "14px",
                      alignItems: "center",
                      maxWidth: "560px",
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
                        <path d="M4 12h15M12 5l7 7-7 7" style={{ stroke: "var(--on-fill)", strokeWidth: "3px", strokeLinecap: "square" }} />
                      </svg>
                    </span>
                    <div style={{ fontSize: "17px", lineHeight: "1.45", textWrap: "pretty" }}>{m.outcome}</div>
                  </div>
                  {m.note ? (
                    <>
                      <p
                        style={{
                          margin: "0",
                          fontFamily: "var(--mono)",
                          fontSize: "12px",
                          lineHeight: "1.5",
                          color: "var(--meta)",
                          maxWidth: "560px",
                        }}
                      >
                        {m.note}
                      </p>
                    </>
                  ) : null}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </section>
      <section
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "clamp(80px,12vh,136px) clamp(20px,4vw,48px)",
          display: "flex",
          flexWrap: "wrap",
          gap: "32px 64px",
          alignItems: "start",
        }}
      >
        <div style={{ flex: "0 1 260px" }}>
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
            le prime cose che ci chiedi
          </div>
          <h2
            data-rise-group="1"
            style={{ fontWeight: "700", fontSize: "clamp(34px,4.4vw,64px)", lineHeight: "1", letterSpacing: "-.04em", margin: "18px 0 0" }}
          >
            <span style={{ display: "block", overflow: "hidden", paddingBottom: ".08em" }}>
              <span data-rise="1" style={{ display: "block" }}>
                Domande_
              </span>
            </span>
          </h2>
        </div>
        <div style={{ flex: "1 1 560px", minWidth: "0", borderTop: "1px solid var(--line)" }}>
          {(faq || []).map((f, f_i) => (
            <React.Fragment key={f_i}>
              <div style={{ borderBottom: "1px solid var(--line)" }}>
                <button
                  onClick={f.toggle}
                  className="h-color"
                  style={{
                    width: "100%",
                    background: "transparent",
                    border: "0",
                    padding: "22px 0",
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "20px",
                    alignItems: "center",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "color .2s",
                    "--h-color": "var(--accent)",
                  }}
                >
                  <span style={{ fontWeight: "700", fontSize: "clamp(18px,1.5vw,21px)", letterSpacing: "-.01em" }}>{f.q}</span>
                  <span
                    style={{
                      width: "36px",
                      height: "36px",
                      background: f.iconBg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flex: "none",
                      transition: "background .3s",
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      style={{ transform: f.rot, transition: "transform .35s cubic-bezier(.2,.7,.2,1)" }}
                    >
                      <path d="M5 12h14M12 5v14" style={{ stroke: "var(--on-fill)", strokeWidth: "2.6px", strokeLinecap: "square" }} />
                    </svg>
                  </span>
                </button>
                <div style={{ display: "grid", gridTemplateRows: f.rows, transition: "grid-template-rows .45s cubic-bezier(.2,.7,.2,1)" }}>
                  <div style={{ overflow: "hidden" }}>
                    <p
                      style={{
                        margin: "0 0 24px",
                        fontSize: "16px",
                        lineHeight: "1.55",
                        color: "var(--body)",
                        maxWidth: "760px",
                        textWrap: "pretty",
                      }}
                    >
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </section>
    </main>
    <Footer />
  </>);
  }
}

export default MetodoPage;
