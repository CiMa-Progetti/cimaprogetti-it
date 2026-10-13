// @ts-nocheck — porting automatico di News.dc.html (logica originale quasi verbatim)
"use client";
/* eslint-disable */
import React from "react";
import Footer from "@/components/cp/Footer";
import { CP_DATA } from "@/lib/cp/data";
import { CP_QUIZ, CP_DIAG } from "@/lib/cp/quiz";

class NewsPage extends React.Component<any, any> {
  [key: string]: any;
  componentDidMount() {
    requestAnimationFrame(() => document.querySelectorAll('main img').forEach(img => {
      if (img.style.opacity !== '0' || !img.complete || img.dataset.swept) return;
      img.dataset.swept = '1';
      if (img.naturalWidth) this.shotLoad({ currentTarget: img }); else this.hideImg({ currentTarget: img });
    }));
    if (this.state && 'vw' in this.state) this.setState({ vw: window.innerWidth });
  }
  state = { f: 'all' };
  hideImg = e => { e.currentTarget.style.display = 'none'; };
  shotLoad = e => { const img = e.currentTarget; if (img.naturalWidth !== 400 || img.naturalHeight !== 300) { img.style.opacity = '1'; return; }
    img.style.opacity = '0'; const n = +(img.dataset.retry || 0); if (n >= 4) { img.style.display = 'none'; return; }
    img.dataset.retry = n + 1; setTimeout(() => { img.src = img.src.replace(/&r=\d+$/, '') + '&r=' + (n + 1); }, 3500); };
  renderVals(): any {
    const pad = n => String(n).padStart(2, '0');
    const shot = u => 'https://s0.wp.com/mshots/v1/' + encodeURIComponent(u) + '?w=1280&h=720';
    const N = [
      { id: 'univapp', cat: 'Progetti', date: 'Settembre 2026', title: 'UnivApp apre su invito', text: "Dal 21 settembre si entra con un codice d'invito. Brevetto depositato, una piattaforma per 5.000 utenti con tools per studiare, marketplace e area community: un progetto in cui siamo entrati come partner.", img: '/cp/univapp.png', label: 'univapp.ai', href: 'https://univapp.ai', cta: 'univapp.ai ↗' }
    ];    const f = this.state.f;
    const list = N.filter(n => f === 'all' || n.cat === f).map(n => ({ ...n, target: /^https?:/.test(n.href) ? '_blank' : undefined, shots: n.img ? [{ src: n.img, alt: n.title, hideImg: this.hideImg, shotLoad: this.shotLoad }] : [] }));
    const chips = [['all', 'Tutte'], ['Aggiornamenti', 'Aggiornamenti'], ['Press', 'Press'], ['Progetti', 'Progetti']].map(([id, label]) => { const on = f === id; return { label, count: pad(id === 'all' ? N.length : N.filter(n => n.cat === id).length), bg: on ? 'var(--fill-accent)' : 'var(--bg)', fg: on ? 'var(--on-fill)' : 'var(--ink)', bd: on ? 'var(--accent)' : 'var(--line)', pick: () => this.setState({ f: id }) }; });
    return { chips, feat: list.slice(0, 1), rest: list.slice(1), hasRest: list.length > 1, isEmpty: list.length === 0 };
  }

  render() {
    const { chips, isEmpty, feat, hasRest, rest } = this.renderVals();
    return (<>
    <main>
      <section style={{ padding: "calc(72px + clamp(48px,9vh,104px)) clamp(20px,4vw,48px) clamp(32px,5vh,56px)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <h1
            data-rise-group="1"
            style={{ fontWeight: "700", fontSize: "clamp(56px,7.6vw,124px)", lineHeight: ".88", letterSpacing: "-.055em", margin: "0" }}
          >
            <span style={{ display: "block", overflow: "hidden", paddingBottom: ".16em" }}>
              <span data-rise="1" style={{ display: "block" }}>
                News<span style={{ color: "var(--accent)" }}>_</span>
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
            Aggiornamenti, press e progetti.
          </p>
          <div
            data-reveal="1"
            data-delay="100"
            style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "clamp(28px,4vh,44px)" }}
          >
            {(chips || []).map((ch, ch_i) => (
              <React.Fragment key={ch_i}>
                <button
                  onClick={ch.pick}
                  className="h-border-color"
                  style={{
                    flex: "none",
                    whiteSpace: "nowrap",
                    height: "44px",
                    padding: "0 16px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    border: `1px solid ${ch.bd}`,
                    background: ch.bg,
                    color: ch.fg,
                    fontWeight: "700",
                    fontSize: "14px",
                    cursor: "pointer",
                    transition: "border-color .2s",
                    "--h-border-color": "var(--accent)",
                  }}
                >
                  {ch.label}
                  <span style={{ fontFamily: "var(--mono)", fontSize: "11px", fontWeight: "400", opacity: ".75" }}>{ch.count}</span>
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>
      <section style={{ padding: "0 clamp(20px,4vw,48px) clamp(80px,12vh,136px)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "12px" }}>
          {isEmpty ? (
            <>
              <div
                style={{
                  border: "1px dashed var(--line-strong)",
                  padding: "clamp(28px,4vw,48px)",
                  fontFamily: "var(--mono)",
                  fontSize: "13px",
                  color: "var(--meta)",
                }}
              >
                nessuna news in questa sezione, per ora_
              </div>
            </>
          ) : null}

          {(feat || []).map((n, n_i) => (
            <React.Fragment key={n_i}>
              <a
                href={n.href}
                target={n.target}
                rel="noopener"
                className="h-border-color h-color"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,440px),1fr))",
                  border: "1px solid var(--line)",
                  background: "var(--bg)",
                  color: "var(--ink)",
                  textDecoration: "none",
                  transition: "border-color .3s",
                  "--h-border-color": "var(--accent)",
                  "--h-color": "var(--ink)",
                }}
              >
                <div style={{ borderRight: "1px solid var(--line-soft)" }}>
                  <div
                    style={{
                      position: "relative",
                      aspectRatio: "16/10",
                      background: "repeating-linear-gradient(135deg,var(--subtle-3) 0 8px,var(--subtle-2) 8px 16px)",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "flex-end",
                      padding: "10px",
                    }}
                  >
                    <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--meta)" }}>{n.label}_</span>
                    {(n.shots || []).map((s, s_i) => (
                      <React.Fragment key={s_i}>
                        <img
                          src={s.src}
                          alt={s.alt}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          onError={s.hideImg}
                          onLoad={s.shotLoad}
                          style={{
                            position: "absolute",
                            inset: "0",
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "top center",
                            display: "block",
                            background: "var(--bg)",
                            opacity: "0",
                            transition: "opacity .4s",
                          }}
                        />
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                <div style={{ padding: "clamp(24px,3vw,44px)", display: "flex", flexDirection: "column", gap: "18px" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px 12px" }}>
                    <span
                      style={{
                        background: "var(--fill-accent)",
                        color: "var(--on-fill)",
                        fontWeight: "700",
                        fontSize: "12px",
                        lineHeight: "1",
                        padding: "7px 10px",
                      }}
                    >
                      {n.cat}
                    </span>
                    {n.date ? (
                      <>
                        <span style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--meta)", whiteSpace: "nowrap" }}>
                          {n.date}
                        </span>
                      </>
                    ) : null}
                  </div>
                  <h2
                    style={{
                      fontWeight: "700",
                      fontSize: "clamp(30px,3.4vw,52px)",
                      lineHeight: "1",
                      letterSpacing: "-.045em",
                      margin: "0",
                      textWrap: "balance",
                    }}
                  >
                    {n.title}
                  </h2>
                  <p
                    style={{
                      margin: "0",
                      fontSize: "clamp(16px,1.25vw,19px)",
                      lineHeight: "1.5",
                      color: "var(--body)",
                      textWrap: "pretty",
                      maxWidth: "46ch",
                    }}
                  >
                    {n.text}
                  </p>
                  <span style={{ marginTop: "auto", fontFamily: "var(--mono)", fontSize: "13px", color: "var(--accent)" }}>{n.cta}</span>
                </div>
              </a>
            </React.Fragment>
          ))}

          {hasRest ? (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,340px),1fr))", gap: "12px" }}>
                {(rest || []).map((n, n_i) => (
                  <React.Fragment key={n_i}>
                    <a
                      href={n.href}
                      target={n.target}
                      rel="noopener"
                      className="h-border-color h-transform h-color"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        border: "1px solid var(--line)",
                        background: "var(--bg)",
                        color: "var(--ink)",
                        textDecoration: "none",
                        transition: "border-color .3s,transform .45s cubic-bezier(.2,.7,.2,1)",
                        "--h-border-color": "var(--accent)",
                        "--h-transform": "translateY(-5px)",
                        "--h-color": "var(--ink)",
                      }}
                    >
                      <div style={{ borderBottom: "1px solid var(--line-soft)" }}>
                        <div
                          style={{
                            position: "relative",
                            aspectRatio: "16/9",
                            background: "repeating-linear-gradient(135deg,var(--subtle-3) 0 8px,var(--subtle-2) 8px 16px)",
                            overflow: "hidden",
                            display: "flex",
                            alignItems: "flex-end",
                            padding: "10px",
                          }}
                        >
                          <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--meta)" }}>{n.label}_</span>
                          {(n.shots || []).map((s, s_i) => (
                            <React.Fragment key={s_i}>
                              <img
                                src={s.src}
                                alt={s.alt}
                                loading="lazy"
                                referrerPolicy="no-referrer"
                                onError={s.hideImg}
                                onLoad={s.shotLoad}
                                style={{
                                  position: "absolute",
                                  inset: "0",
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                  objectPosition: "top center",
                                  display: "block",
                                  background: "var(--bg)",
                                  opacity: "0",
                                  transition: "opacity .4s",
                                }}
                              />
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                      <div style={{ padding: "22px", display: "flex", flexDirection: "column", gap: "14px", flex: "1" }}>
                        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px 12px" }}>
                          <span
                            style={{
                              background: "var(--fill-accent)",
                              color: "var(--on-fill)",
                              fontWeight: "700",
                              fontSize: "12px",
                              lineHeight: "1",
                              padding: "7px 10px",
                            }}
                          >
                            {n.cat}
                          </span>
                          {n.date ? (
                            <>
                              <span style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--meta)", whiteSpace: "nowrap" }}>
                                {n.date}
                              </span>
                            </>
                          ) : null}
                        </div>
                        <h3
                          style={{
                            fontWeight: "700",
                            fontSize: "22px",
                            lineHeight: "1.1",
                            letterSpacing: "-.03em",
                            margin: "0",
                            textWrap: "balance",
                          }}
                        >
                          {n.title}
                        </h3>
                        <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.5", color: "var(--body)", textWrap: "pretty" }}>
                          {n.text}
                        </p>
                        <span
                          style={{
                            marginTop: "auto",
                            paddingTop: "6px",
                            fontFamily: "var(--mono)",
                            fontSize: "12px",
                            color: "var(--accent)",
                          }}
                        >
                          {n.cta}
                        </span>
                      </div>
                    </a>
                  </React.Fragment>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </section>
    </main>
    <Footer cta={false} index={false} />
  </>);
  }
}

export default NewsPage;
