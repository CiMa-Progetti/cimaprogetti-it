// @ts-nocheck — porting automatico di Progetti.dc.html (logica originale quasi verbatim)
"use client";
/* eslint-disable */
import React from "react";
import Link from "next/link";
import Footer from "@/components/cp/Footer";
import CaseUI from "@/components/cp/CaseUI";
import { CP_DATA } from "@/lib/cp/data";
import { CP_QUIZ, CP_DIAG } from "@/lib/cp/quiz";

class ProgettiPage extends React.Component<any, any> {
  [key: string]: any;
  state = { filter: 'all', sel: null, ft: 0, kt: 0 };
  gRef = { online: React.createRef(), demo: React.createRef(), sim: React.createRef() };
  ov = {};
  measure() { let ch = false; ['online', 'demo', 'sim'].forEach(k => { const el = this.gRef[k].current; const v = el ? { l: el.scrollLeft > 4, r: el.scrollLeft + el.clientWidth < el.scrollWidth - 4 } : { l: false, r: false }; const o = this.ov[k]; if (!o || o.l !== v.l || o.r !== v.r) { this.ov[k] = v; ch = true; } }); if (ch) this.forceUpdate(); }
  componentDidUpdate() { cancelAnimationFrame(this._mf); this._mf = requestAnimationFrame(() => this.measure()); }
  scrollG(k, dir) { const el = this.gRef[k].current; if (!el) return; const c = el.querySelector('[data-card]'); const w = c ? c.getBoundingClientRect().width + 12 : 360; el.scrollBy({ left: dir * w, behavior: 'smooth' }); }
  componentDidMount() {
    requestAnimationFrame(() => document.querySelectorAll('main img').forEach(img => {
      if (img.style.opacity !== '0' || !img.complete || img.dataset.swept) return;
      img.dataset.swept = '1';
      if (img.naturalWidth) this.shotLoad({ currentTarget: img }); else this.hideImg({ currentTarget: img });
    }));
    if (this.state && 'vw' in this.state) this.setState({ vw: window.innerWidth });
    this.onKey = e => { const L = !!this.state.live; if (!this.state.sel && !L) return; if (e.key === 'Escape') this.close(); else if (e.key === 'ArrowRight') L ? this.stepL(1) : this.step(1); else if (e.key === 'ArrowLeft') L ? this.stepL(-1) : this.step(-1); };
    document.addEventListener('keydown', this.onKey); this.boot();
    this._rs = () => this.measure(); window.addEventListener('resize', this._rs); setTimeout(this._rs, 400);
  }
  componentWillUnmount() { window.removeEventListener('resize', this._rs); cancelAnimationFrame(this._mf); document.removeEventListener('keydown', this.onKey); clearTimeout(this._w); this.lock(false); }
  boot() {
    const D = CP_DATA; if (!D) { this._w = setTimeout(() => this.boot(), 30); return; }
    const h = decodeURIComponent((location.hash || '').slice(1));
    if (h && D.projects.some(p => p.id === h)) this.openP(h); else this.forceUpdate();
  }
  scroller() { let el = document.querySelector('main'); while (el && el !== document.body) { const o = getComputedStyle(el).overflowY; if ((o === 'auto' || o === 'scroll') && el.scrollHeight > el.clientHeight) return el; el = el.parentElement; } return null; }
  lock(on) { if (on) this._sc = this.scroller(); const v = on ? 'hidden' : ''; document.documentElement.style.overflow = v; document.body.style.overflow = v; if (this._sc) this._sc.style.overflow = v; }
  openP(id) { this.setState(s => ({ sel: id, kt: s.kt + 1 })); this.lock(true); }
  close() { this.setState({ sel: null, live: null }); this.lock(false); }
  hideImg = e => { e.currentTarget.style.display = 'none'; };
  shotLoad = e => { const img = e.currentTarget; if (img.naturalWidth !== 400 || img.naturalHeight !== 300) { img.style.opacity = '1'; return; }
    img.style.opacity = '0'; const n = +(img.dataset.retry || 0); if (n >= 4) { img.style.display = 'none'; return; }
    img.dataset.retry = n + 1; setTimeout(() => { img.src = img.src.replace(/&r=\d+$/, '') + '&r=' + (n + 1); }, 3500); };
  mkUi(u) { if (!u) return null; const warn = ['in attesa', 'da verificare'];
    return { app: u.app, date: u.date, nav0: u.nav[0], nav: u.nav.map((x, i) => ({ t: x, bg: i === 0 ? 'rgba(255,255,255,.18)' : 'transparent' })), kpis: u.kpis.map(q => ({ l: q[0], v: q[1], c: q[2] ? 'var(--accent)' : 'var(--ink)' })), cols: u.cols,
      rows: u.rows.map(r => { const w = warn.includes(r[3]); return { a: r[0], b: r[1], c: r[2], s: r[3], sbg: w ? 'var(--bg)' : 'var(--fill-accent)', sfg: w ? 'var(--ink)' : 'var(--on-fill)', sbd: w ? 'var(--ink)' : 'var(--accent)' }; }) }; }
  liveList() { const f = this.state.filter; return (CP_DATA.live || []).filter(p => f === 'all' || (p.services || []).includes(f)); }
  openL(id) { this.setState(s => ({ live: id, kt: s.kt + 1 })); this.lock(true); }
  stepL(dir) { const L = this.liveList(); const i = L.findIndex(p => p.id === this.state.live); const n = L[(i + dir + L.length) % L.length]; this.setState(s => ({ live: n.id, kt: s.kt + 1 })); }
  list() { const f = this.state.filter, o = { online: 0, sim: 1, demo: 2 }; return CP_DATA.projects.filter(p => p.kind !== 'archived' && (f === 'all' || p.services.includes(f))).sort((x, y) => (o[x.kind] ?? 3) - (o[y.kind] ?? 3)); }
  step(dir) { const L = this.list(); const i = L.findIndex(p => p.id === this.state.sel); const n = L[(i + dir + L.length) % L.length]; this.setState(s => ({ sel: n.id, kt: s.kt + 1 })); }
  renderVals(): any {
    const showPrices = this.props.showPrices ?? true;
    const D = CP_DATA; const base = { showPrices, openDiag: () => { this.close(); window.dispatchEvent(new Event('cp-open-diagnosi')); } };
    if (!D) return base;
    const { filter, sel, ft, kt, live } = this.state;
    const pad = n => String(n).padStart(2, '0');
    const svc = Object.fromEntries(D.services.map(s => [s.id, s])); const val = Object.fromEntries(D.values.map(v => [v.id, v]));
    const visIds = (() => { const o = { sim: 0, demo: 1 }; return D.projects.filter(p => p.kind !== 'archived').sort((x, y) => (o[x.kind] ?? 3) - (o[y.kind] ?? 3)).map(p => p.id); })();
    const num = p => pad(visIds.indexOf(p.id) + 1);
    const SK = ['affitti', 'estetica', 'circolo', 'legale', 'distributore', 'startup'];
    const projects = this.list().map(p => ({ ...p, num: num(p), line: p.idea ? p.services.map(id => svc[id] ? svc[id].title.toLowerCase().replace(/\bia\b/g, 'IA') : id).join(' · ') : (showPrices && p.invest ? p.duration + ' · ' + p.invest : p.duration), hasUi: SK.includes(p.id), noUi: !SK.includes(p.id), open: () => this.openP(p.id) }));
    const VP = D.projects.filter(p => p.kind !== 'archived');
    const G = {};
    const mkLive = (p, i) => ({ ...p, num: pad(i + 1), href: p.url, isLink: !!p.url, cta: p.url ? p.domain : 'uso interno · non pubblico', ctaC: p.url ? 'var(--accent)' : 'var(--meta)',
      hasShot: !!p.img || (!!p.url && !p.noShot), shot: p.img ? p.img : p.url ? 'https://s0.wp.com/mshots/v1/' + encodeURIComponent(p.url) + '?w=1280&h=720' : '', shotAlt: 'Anteprima di ' + (p.domain || p.title), open: () => this.openL(p.id), hideImg: this.hideImg, shotLoad: this.shotLoad });
    const liveAll = this.liveList(), liveItems = liveAll.map(mkLive);
    const li = live ? liveAll.findIndex(p => p.id === live) : -1, lv = li >= 0 ? liveItems[li] : {};
    ['online', 'demo', 'sim'].forEach(k => { const src = k === 'online' ? liveItems : projects.filter(p => p.kind === k);
      const items = src.map((p, i) => ({ ...p, anim: (ft % 2 ? 'cp-in' : 'cp-in2') + ' .5s cubic-bezier(.2,.7,.2,1) both ' + (i * 60) + 'ms' }));
      G[k + 'Items'] = items; G[k + 'Has'] = items.length > 0; G[k + 'Count'] = pad(items.length) + (items.length === 1 ? ' progetto' : ' progetti'); G[k + 'Ref'] = this.gRef[k]; G[k + 'Prev'] = () => this.scrollG(k, -1); G[k + 'Next'] = () => this.scrollG(k, 1); G[k + 'Scroll'] = () => this.measure();
      const o = this.ov[k] || { l: false, r: false }; [['Prev', o.l], ['Next', o.r]].forEach(([n, on]) => { G[k + n + 'Off'] = !on; G[k + n + 'Op'] = on ? '1' : '.35'; G[k + n + 'Cur'] = on ? 'pointer' : 'default'; }); });
    const used = D.services.filter(s => D.projects.some(p => p.kind !== 'archived' && p.services.includes(s.id)) || (D.live || []).some(p => (p.services || []).includes(s.id)));
    const LV = D.live || [];
    const chips = [{ id: 'all', label: 'Tutti', count: pad(D.projects.filter(p => p.kind !== 'archived').length + LV.length) }].concat(used.map(s => ({ id: s.id, label: s.title, count: pad(D.projects.filter(p => p.kind !== 'archived' && p.services.includes(s.id)).length + LV.filter(p => (p.services || []).includes(s.id)).length) })))
      .map(c => { const on = filter === c.id; return { ...c, bg: on ? 'var(--fill-accent)' : 'var(--bg)', fg: on ? 'var(--on-fill)' : 'var(--ink)', bd: on ? 'var(--accent)' : 'var(--line)', pick: () => this.setState(s => s.filter === c.id ? null : { filter: c.id, ft: s.ft + 1 }) }; });
    const kp = sel ? D.projects.find(p => p.id === sel) : null;
    const kx = kp ? { hasGains: !!(kp.gains && kp.gains.length), hasProduct: !!kp.productLine, hasIdea: !!kp.idea, noIdea: !kp.idea, probList: (kp.problems || []).map((q, i) => ({ n: pad(i + 1), t: q })), stepList: (kp.steps || []).map((q, i) => ({ n: pad(i + 1), t: q[0], d: q[1] })), hasUi: SK.includes(kp.id), noUi: !SK.includes(kp.id), hasWins: !!(kp.wins && kp.wins.length), winList: (kp.wins || []).map(w => ({ num: val[w.v].num, title: val[w.v].title, t: w.t, href: '/valori#' + w.v })), hasInvest: showPrices && !!kp.invest, hasDeliver: !!(kp.deliver && kp.deliver.length) } : {};
    const k = kp ? { ...kp, ...kx, num: num(kp), serviceLinks: kp.services.map(id => ({ title: svc[id].title.toLowerCase(), href: '/servizi#' + id })), valueLinks: kp.values.map(id => ({ num: val[id].num, title: val[id].title.toLowerCase(), href: '/valori#' + id })) } : {};
    return { ...base, ...G,  chips, projects, total: pad(VP.length), caseOpen: !!kp, k, eqShots: [{ shot: '/cp/univapp.png', hideImg: this.hideImg, shotLoad: this.shotLoad }], liveOpen: li >= 0, lv, lvShots: lv.hasShot ? [lv] : [], liveTotal: pad(liveAll.length), prevL: () => this.stepL(-1), nextL: () => this.stepL(1), kAnim: (kt % 2 ? 'cp-in' : 'cp-in2') + ' .45s cubic-bezier(.2,.7,.2,1) both',
      close: () => this.close(), prev: () => this.step(-1), next: () => this.step(1), backdrop: e => { if (e.target === e.currentTarget) this.close(); } };
  }

  render() {
    const { chips, onlineHas, onlineCount, onlinePrev, onlinePrevOff, onlineNext, onlineNextOff, onlineRef, onlineScroll, onlineItems, simHas, simCount, simPrev, simPrevOff, simNext, simNextOff, simRef, simScroll, simItems, eqShots, demoHas, demoCount, demoPrev, demoPrevOff, demoNext, demoNextOff, demoRef, demoScroll, demoItems, caseOpen, backdrop, prev, next, close, k, openDiag, liveOpen, prevL, nextL, lv, lvShots, demoNextCur, demoNextOp, demoPrevCur, demoPrevOp, kAnim, onlineNextCur, onlineNextOp, onlinePrevCur, onlinePrevOp, simNextCur, simNextOp, simPrevCur, simPrevOp } = this.renderVals();
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
            progetti · lavori veri, nomi omessi
          </div>
          <h1
            data-rise-group="1"
            style={{ fontWeight: "700", fontSize: "clamp(44px,6vw,92px)", lineHeight: "1", letterSpacing: "-.045em", margin: "24px 0 0" }}
          >
            <span style={{ display: "block", overflow: "hidden", paddingBottom: ".08em" }}>
              <span data-rise="1" style={{ display: "block" }}>
                Un problema.
              </span>
            </span>
            <span style={{ display: "block", overflow: "hidden", paddingBottom: ".08em" }}>
              <span data-rise="1" style={{ display: "block" }}>
                Un intervento. <span style={{ color: "var(--accent)" }}>Un numero_</span>
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
            {"Per ogni progetto: com'era, cosa abbiamo fatto, cosa è cambiato."}
            <br />
            Con durata e investimento, perché è la prima domanda che ci fai.
          </p>
          <div data-reveal="1" style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "40px" }}>
            {(chips || []).map((c, c_i) => (
              <React.Fragment key={c_i}>
                <button
                  onClick={c.pick}
                  className="h-border-color"
                  style={{
                    height: "44px",
                    padding: "0 14px",
                    border: `1px solid ${c.bd}`,
                    background: c.bg,
                    color: c.fg,
                    cursor: "pointer",
                    fontSize: "14px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "background .25s,color .25s,border-color .25s",
                    "--h-border-color": "var(--accent)",
                  }}
                >
                  {c.label}
                  <span style={{ fontFamily: "var(--mono)", fontSize: "11px", opacity: ".7" }}>{c.count}</span>
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>
      {onlineHas ? (
        <>
          <section style={{ padding: "clamp(48px,7vh,72px) 0 clamp(24px,4vh,40px)" }}>
            <div
              style={{
                maxWidth: "1280px",
                margin: "0 auto",
                padding: "0 clamp(20px,4vw,48px)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                gap: "24px",
                flexWrap: "wrap",
              }}
            >
              <div style={{ maxWidth: "640px" }}>
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
                  01 · online
                </div>
                <h2
                  data-rise-group="1"
                  style={{
                    fontWeight: "700",
                    fontSize: "clamp(34px,4.4vw,64px)",
                    lineHeight: "1",
                    letterSpacing: "-.04em",
                    margin: "16px 0 0",
                  }}
                >
                  <span style={{ display: "block", overflow: "hidden", paddingBottom: ".08em" }}>
                    <span data-rise="1" style={{ display: "block" }}>
                      Progetti online_
                    </span>
                  </span>
                </h2>
                <p
                  data-reveal="1"
                  style={{
                    margin: "16px 0 0",
                    fontSize: "clamp(16px,1.25vw,19px)",
                    lineHeight: "1.5",
                    color: "var(--body)",
                    textWrap: "pretty",
                  }}
                >
                  Siti e gestionali in produzione, usati ogni giorno.
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginLeft: "auto" }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--meta)" }}>{onlineCount}</span>
                <div style={{ display: "flex", gap: "6px" }}>
                  <button
                    onClick={onlinePrev}
                    disabled={onlinePrevOff}
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
                      cursor: onlinePrevCur,
                      opacity: onlinePrevOp,
                      transition: "border-color .2s,background .2s",
                      "--h-border-color": "var(--accent)",
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M20 12H5M12 5l-7 7 7 7" style={{ stroke: "var(--accent)", strokeWidth: "2.4px", strokeLinecap: "square" }} />
                    </svg>
                  </button>
                  <button
                    onClick={onlineNext}
                    disabled={onlineNextOff}
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
                      cursor: onlineNextCur,
                      opacity: onlineNextOp,
                      transition: "border-color .2s,background .2s",
                      "--h-border-color": "var(--accent)",
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M4 12h15M12 5l7 7-7 7" style={{ stroke: "var(--accent)", strokeWidth: "2.4px", strokeLinecap: "square" }} />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div
              ref={onlineRef}
              onScroll={onlineScroll}
              style={{
                display: "flex",
                gap: "12px",
                overflowX: "auto",
                scrollSnapType: "x mandatory",
                scrollPaddingLeft: "calc(max(calc((100vw - 1280px) / 2), 0px) + clamp(20px,4vw,48px))",
                padding: "28px calc(max(calc((100vw - 1280px) / 2), 0px) + clamp(20px,4vw,48px)) 24px",
                scrollbarWidth: "thin",
                scrollbarColor: "var(--accent) var(--line-soft)",
              }}
            >
              {(onlineItems || []).map((p, p_i) => (
                <React.Fragment key={p_i}>
                  <div
                    data-card="1"
                    style={{
                      flex: "0 0 clamp(290px,40vw,480px)",
                      scrollSnapAlign: "start",
                      display: "flex",
                      flexDirection: "column",
                      animation: p.anim,
                    }}
                  >
                    <div
                      role="button"
                      onClick={p.open}
                      className="h-border-color h-transform h-color"
                      style={{
                        flex: "1",
                        background: "var(--bg)",
                        border: "1px solid var(--line)",
                        display: "flex",
                        flexDirection: "column",
                        color: "var(--ink)",
                        textDecoration: "none",
                        cursor: "pointer",
                        transition: "border-color .3s,transform .45s cubic-bezier(.2,.7,.2,1)",
                        "--h-border-color": "var(--accent)",
                        "--h-transform": "translateY(-5px)",
                        "--h-color": "var(--ink)",
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          aspectRatio: "16/9",
                          background: "repeating-linear-gradient(135deg,var(--subtle-3) 0 8px,var(--subtle-2) 8px 16px)",
                          borderBottom: "1px solid var(--line-soft)",
                          display: "flex",
                          alignItems: "flex-end",
                          padding: "10px",
                          overflow: "hidden",
                        }}
                      >
                        <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--meta)" }}>{p.domain}_</span>
                        {p.hasShot ? (
                          <>
                            <img
                              src={p.shot}
                              alt={p.shotAlt}
                              loading="lazy"
                              referrerPolicy="no-referrer"
                              onError={p.hideImg}
                              onLoad={p.shotLoad}
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
                          </>
                        ) : null}
                      </div>
                      <div style={{ padding: "22px", display: "flex", flexDirection: "column", gap: "28px", flex: "1" }}>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                          {(p.tags || []).map((tg, tg_i) => (
                            <React.Fragment key={tg_i}>
                              <span
                                style={{
                                  background: "var(--fill-accent)",
                                  color: "var(--on-fill)",
                                  fontWeight: "700",
                                  fontSize: "12px",
                                  letterSpacing: "-.005em",
                                  lineHeight: "1",
                                  padding: "7px 10px",
                                }}
                              >
                                {tg}
                              </span>
                            </React.Fragment>
                          ))}
                        </div>
                        <div
                          style={{
                            marginTop: "auto",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-end",
                            gap: "12px",
                            borderTop: "1px solid var(--line-soft)",
                            paddingTop: "16px",
                          }}
                        >
                          <div style={{ minWidth: "0" }}>
                            <div
                              style={{
                                fontWeight: "700",
                                fontSize: "19px",
                                letterSpacing: "-.02em",
                                textTransform: "uppercase",
                                lineHeight: "1.1",
                                textWrap: "balance",
                              }}
                            >
                              {p.title}
                            </div>
                            <div
                              style={{
                                fontFamily: "var(--mono)",
                                fontSize: "12px",
                                color: p.ctaC,
                                marginTop: "8px",
                                overflowWrap: "anywhere",
                              }}
                            >
                              {p.cta}
                            </div>
                          </div>
                          <span
                            style={{
                              width: "44px",
                              height: "44px",
                              background: "var(--fill-accent)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flex: "none",
                            }}
                          >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                              <path
                                d="M4 12h15M12 5l7 7-7 7"
                                style={{ stroke: "var(--on-fill)", strokeWidth: "2.6px", strokeLinecap: "square" }}
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </section>
        </>
      ) : null}

      {simHas ? (
        <>
          <section style={{ padding: "clamp(56px,9vh,96px) 0 clamp(24px,4vh,40px)", borderTop: "1px solid var(--line-soft)" }}>
            <div
              style={{
                maxWidth: "1280px",
                margin: "0 auto",
                padding: "0 clamp(20px,4vw,48px)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                gap: "24px",
                flexWrap: "wrap",
              }}
            >
              <div style={{ maxWidth: "640px" }}>
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
                  02 · casi riservati
                </div>
                <h2
                  data-rise-group="1"
                  style={{
                    fontWeight: "700",
                    fontSize: "clamp(34px,4.4vw,64px)",
                    lineHeight: "1",
                    letterSpacing: "-.04em",
                    margin: "16px 0 0",
                  }}
                >
                  <span style={{ display: "block", overflow: "hidden", paddingBottom: ".08em" }}>
                    <span data-rise="1" style={{ display: "block" }}>
                      Casi riservati_
                    </span>
                  </span>
                </h2>
                <p
                  data-reveal="1"
                  style={{
                    margin: "16px 0 0",
                    fontSize: "clamp(16px,1.25vw,19px)",
                    lineHeight: "1.5",
                    color: "var(--body)",
                    textWrap: "pretty",
                  }}
                >
                  Simulazioni di progetti svolti: nomi, dati e dettagli sono cambiati per tutelare il cliente. Problema, metodo e risultati
                  sono quelli veri.
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginLeft: "auto" }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--meta)" }}>{simCount}</span>
                <div style={{ display: "flex", gap: "6px" }}>
                  <button
                    onClick={simPrev}
                    disabled={simPrevOff}
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
                      cursor: simPrevCur,
                      opacity: simPrevOp,
                      transition: "border-color .2s,background .2s",
                      "--h-border-color": "var(--accent)",
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M20 12H5M12 5l-7 7 7 7" style={{ stroke: "var(--accent)", strokeWidth: "2.4px", strokeLinecap: "square" }} />
                    </svg>
                  </button>
                  <button
                    onClick={simNext}
                    disabled={simNextOff}
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
                      cursor: simNextCur,
                      opacity: simNextOp,
                      transition: "border-color .2s,background .2s",
                      "--h-border-color": "var(--accent)",
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M4 12h15M12 5l7 7-7 7" style={{ stroke: "var(--accent)", strokeWidth: "2.4px", strokeLinecap: "square" }} />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div
              ref={simRef}
              onScroll={simScroll}
              style={{
                display: "flex",
                gap: "12px",
                overflowX: "auto",
                scrollSnapType: "x mandatory",
                scrollPaddingLeft: "calc(max(calc((100vw - 1280px) / 2), 0px) + clamp(20px,4vw,48px))",
                padding: "28px calc(max(calc((100vw - 1280px) / 2), 0px) + clamp(20px,4vw,48px)) 24px",
                scrollbarWidth: "thin",
                scrollbarColor: "var(--accent) var(--line-soft)",
              }}
            >
              {(simItems || []).map((p, p_i) => (
                <React.Fragment key={p_i}>
                  <div
                    data-card="1"
                    style={{
                      flex: "0 0 clamp(290px,40vw,480px)",
                      scrollSnapAlign: "start",
                      display: "flex",
                      flexDirection: "column",
                      animation: p.anim,
                    }}
                  >
                    <div
                      role="button"
                      onClick={p.open}
                      data-spot="1"
                      className="h-border-color h-transform"
                      style={{
                        flex: "1",
                        background:
                          "radial-gradient(480px circle at var(--mx,-999px) var(--my,-999px),var(--accent-wash),transparent 60%),var(--bg)",
                        border: "1px solid var(--line)",
                        display: "flex",
                        flexDirection: "column",
                        cursor: "pointer",
                        transition: "border-color .3s,transform .45s cubic-bezier(.2,.7,.2,1)",
                        "--h-border-color": "var(--accent)",
                        "--h-transform": "translateY(-5px)",
                      }}
                    >
                      {p.hasUi ? (
                        <>
                          <div style={{ borderBottom: "1px solid var(--line-soft)" }}>
                            <div
                              style={{
                                position: "relative",
                                aspectRatio: "16/9",
                                containerType: "inline-size",
                                overflow: "hidden",
                                background: "var(--subtle)",
                              }}
                            >
                              <CaseUI skin={p.id} style={{ position: "absolute", inset: "0" }} />
                            </div>
                          </div>
                        </>
                      ) : null}

                      {p.noUi ? (
                        <>
                          <div
                            style={{
                              aspectRatio: "16/8",
                              background: "repeating-linear-gradient(135deg,var(--subtle-3) 0 8px,var(--subtle-2) 8px 16px)",
                              borderBottom: "1px solid var(--line-soft)",
                              display: "flex",
                              alignItems: "flex-end",
                              padding: "10px",
                            }}
                          >
                            <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--meta)" }}>{p.image}_</span>
                          </div>
                        </>
                      ) : null}
                      <div style={{ padding: "22px", display: "flex", flexDirection: "column", gap: "22px", flex: "1" }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "12px",
                            fontFamily: "var(--mono)",
                            fontSize: "12px",
                            color: "var(--meta)",
                          }}
                        >
                          <span>{p.meta}</span>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                          <div
                            style={{
                              color: "var(--accent)",
                              fontWeight: "700",
                              fontSize: "clamp(24px,2.1vw,32px)",
                              letterSpacing: "-.035em",
                              lineHeight: "1.1",
                              textWrap: "balance",
                            }}
                          >
                            {p.productLine}
                          </div>
                        </div>
                        <div
                          style={{
                            marginTop: "auto",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-end",
                            gap: "12px",
                            borderTop: "1px solid var(--line-soft)",
                            paddingTop: "16px",
                          }}
                        >
                          <div>
                            <div
                              style={{
                                fontWeight: "700",
                                fontSize: "19px",
                                letterSpacing: "-.02em",
                                textTransform: "uppercase",
                                lineHeight: "1.1",
                                textWrap: "balance",
                              }}
                            >
                              {p.title}
                            </div>
                            <div style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--meta)", marginTop: "8px" }}>
                              {p.line}
                            </div>
                          </div>
                          <span
                            style={{
                              width: "44px",
                              height: "44px",
                              background: "var(--fill-accent)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flex: "none",
                            }}
                          >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                              <path
                                d="M4 12h15M12 5l7 7-7 7"
                                style={{ stroke: "var(--on-fill)", strokeWidth: "2.6px", strokeLinecap: "square" }}
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </section>
        </>
      ) : null}
      <section style={{ padding: "clamp(56px,9vh,96px) 0 clamp(24px,4vh,40px)", borderTop: "1px solid var(--line-soft)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 clamp(20px,4vw,48px)" }}>
          <div style={{ maxWidth: "680px" }}>
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
              03 · equity
            </div>
            <h2
              data-rise-group="1"
              style={{
                fontWeight: "700",
                fontSize: "clamp(34px,4.4vw,64px)",
                lineHeight: "1",
                letterSpacing: "-.04em",
                margin: "16px 0 0",
              }}
            >
              <span style={{ display: "block", overflow: "hidden", paddingBottom: ".08em" }}>
                <span data-rise="1" style={{ display: "block" }}>
                  Non solo partner tecnici_
                </span>
              </span>
            </h2>
            <p
              data-reveal="1"
              style={{
                margin: "16px 0 0",
                fontSize: "clamp(16px,1.25vw,19px)",
                lineHeight: "1.5",
                color: "var(--body)",
                textWrap: "pretty",
              }}
            >
              Progetti in cui crediamo al punto da entrarci come soci: oltre al software ci mettiamo capitale, tempo e responsabilità.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,320px),1fr))",
              gap: "12px",
              marginTop: "28px",
              paddingBottom: "24px",
            }}
          >
            <a
              data-reveal="1"
              href="https://univapp.ai"
              target="_blank"
              rel="noopener"
              className="h-border-color h-transform h-color"
              style={{
                background: "var(--bg)",
                border: "1px solid var(--line)",
                display: "flex",
                flexDirection: "column",
                color: "var(--ink)",
                textDecoration: "none",
                transition: "border-color .3s,transform .45s cubic-bezier(.2,.7,.2,1)",
                "--h-border-color": "var(--accent)",
                "--h-transform": "translateY(-5px)",
                "--h-color": "var(--ink)",
              }}
            >
              <div
                style={{
                  aspectRatio: "16/8",
                  background: "repeating-linear-gradient(135deg,var(--subtle-3) 0 8px,var(--subtle-2) 8px 16px)",
                  borderBottom: "1px solid var(--line-soft)",
                  display: "flex",
                  alignItems: "flex-end",
                  padding: "10px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--meta)" }}>univapp.ai_</span>
                {(eqShots || []).map((s, s_i) => (
                  <React.Fragment key={s_i}>
                    <img
                      src={s.shot}
                      alt="Anteprima di univapp.ai"
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
              <div style={{ padding: "22px", display: "flex", flexDirection: "column", gap: "28px", flex: "1" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "12px",
                    fontFamily: "var(--mono)",
                    fontSize: "12px",
                    color: "var(--meta)",
                  }}
                >
                  <span>startup · intelligenza artificiale</span>
                  <span style={{ background: "var(--fill-accent)", color: "var(--on-fill)", padding: "5px 9px" }}>Partner</span>
                </div>
                <div style={{ marginTop: "auto", borderTop: "1px solid var(--line-soft)", paddingTop: "16px" }}>
                  <div
                    style={{ fontWeight: "700", fontSize: "19px", letterSpacing: "-.02em", textTransform: "uppercase", lineHeight: "1.1" }}
                  >
                    UnivApp
                  </div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--accent)", marginTop: "8px" }}>univapp.ai ↗</div>
                </div>
              </div>
            </a>
            <div
              data-reveal="1"
              data-delay="100"
              style={{
                border: "1px dashed var(--line-strong)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "28px",
                padding: "22px",
                minHeight: "280px",
                backgroundImage: "radial-gradient(var(--dot) 1px,transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "12px",
                  fontFamily: "var(--mono)",
                  fontSize: "12px",
                  color: "var(--meta)",
                }}
              >
                <span>nuovo progetto</span>
              </div>
              <div
                style={{
                  fontWeight: "700",
                  fontSize: "clamp(36px,4vw,60px)",
                  lineHeight: ".95",
                  letterSpacing: "-.05em",
                  color: "var(--accent)",
                }}
              >
                Available
                <br />
                soon<span style={{ animation: "cp-blink 1.1s steps(1) infinite" }}>_</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {demoHas ? (
        <>
          <section style={{ padding: "clamp(56px,9vh,96px) 0 clamp(24px,4vh,40px)", borderTop: "1px solid var(--line-soft)" }}>
            <div
              style={{
                maxWidth: "1280px",
                margin: "0 auto",
                padding: "0 clamp(20px,4vw,48px)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                gap: "24px",
                flexWrap: "wrap",
              }}
            >
              <div style={{ maxWidth: "640px" }}>
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
                  04 · demo
                </div>
                <h2
                  data-rise-group="1"
                  style={{
                    fontWeight: "700",
                    fontSize: "clamp(34px,4.4vw,64px)",
                    lineHeight: "1",
                    letterSpacing: "-.04em",
                    margin: "16px 0 0",
                  }}
                >
                  <span style={{ display: "block", overflow: "hidden", paddingBottom: ".08em" }}>
                    <span data-rise="1" style={{ display: "block" }}>
                      Demo_
                    </span>
                  </span>
                </h2>
                <p
                  data-reveal="1"
                  style={{
                    margin: "16px 0 0",
                    fontSize: "clamp(16px,1.25vw,19px)",
                    lineHeight: "1.5",
                    color: "var(--body)",
                    textWrap: "pretty",
                  }}
                >
                  Prototipi funzionanti, costruiti per mostrare come lavoriamo. Si possono provare.
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginLeft: "auto" }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--meta)" }}>{demoCount}</span>
                <div style={{ display: "flex", gap: "6px" }}>
                  <button
                    onClick={demoPrev}
                    disabled={demoPrevOff}
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
                      cursor: demoPrevCur,
                      opacity: demoPrevOp,
                      transition: "border-color .2s,background .2s",
                      "--h-border-color": "var(--accent)",
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M20 12H5M12 5l-7 7 7 7" style={{ stroke: "var(--accent)", strokeWidth: "2.4px", strokeLinecap: "square" }} />
                    </svg>
                  </button>
                  <button
                    onClick={demoNext}
                    disabled={demoNextOff}
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
                      cursor: demoNextCur,
                      opacity: demoNextOp,
                      transition: "border-color .2s,background .2s",
                      "--h-border-color": "var(--accent)",
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M4 12h15M12 5l7 7-7 7" style={{ stroke: "var(--accent)", strokeWidth: "2.4px", strokeLinecap: "square" }} />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div
              ref={demoRef}
              onScroll={demoScroll}
              style={{
                display: "flex",
                gap: "12px",
                overflowX: "auto",
                scrollSnapType: "x mandatory",
                scrollPaddingLeft: "calc(max(calc((100vw - 1280px) / 2), 0px) + clamp(20px,4vw,48px))",
                padding: "28px calc(max(calc((100vw - 1280px) / 2), 0px) + clamp(20px,4vw,48px)) 24px",
                scrollbarWidth: "thin",
                scrollbarColor: "var(--accent) var(--line-soft)",
              }}
            >
              {(demoItems || []).map((p, p_i) => (
                <React.Fragment key={p_i}>
                  <div
                    data-card="1"
                    style={{
                      flex: "0 0 clamp(290px,40vw,480px)",
                      scrollSnapAlign: "start",
                      display: "flex",
                      flexDirection: "column",
                      animation: p.anim,
                    }}
                  >
                    <div
                      role="button"
                      onClick={p.open}
                      data-spot="1"
                      className="h-border-color h-transform"
                      style={{
                        flex: "1",
                        background:
                          "radial-gradient(480px circle at var(--mx,-999px) var(--my,-999px),var(--accent-wash),transparent 60%),var(--bg)",
                        border: "1px solid var(--line)",
                        display: "flex",
                        flexDirection: "column",
                        cursor: "pointer",
                        transition: "border-color .3s,transform .45s cubic-bezier(.2,.7,.2,1)",
                        "--h-border-color": "var(--accent)",
                        "--h-transform": "translateY(-5px)",
                      }}
                    >
                      {p.hasUi ? (
                        <>
                          <div style={{ borderBottom: "1px solid var(--line-soft)" }}>
                            <div
                              style={{
                                position: "relative",
                                aspectRatio: "16/9",
                                containerType: "inline-size",
                                overflow: "hidden",
                                background: "var(--subtle)",
                              }}
                            >
                              <CaseUI skin={p.id} style={{ position: "absolute", inset: "0" }} />
                            </div>
                          </div>
                        </>
                      ) : null}

                      {p.noUi ? (
                        <>
                          <div
                            style={{
                              aspectRatio: "16/8",
                              background: "repeating-linear-gradient(135deg,var(--subtle-3) 0 8px,var(--subtle-2) 8px 16px)",
                              borderBottom: "1px solid var(--line-soft)",
                              display: "flex",
                              alignItems: "flex-end",
                              padding: "10px",
                            }}
                          >
                            <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--meta)" }}>{p.image}_</span>
                          </div>
                        </>
                      ) : null}
                      <div style={{ padding: "22px", display: "flex", flexDirection: "column", gap: "22px", flex: "1" }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "12px",
                            fontFamily: "var(--mono)",
                            fontSize: "12px",
                            color: "var(--meta)",
                          }}
                        >
                          <span>{p.meta}</span>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                          <div
                            style={{
                              color: "var(--accent)",
                              fontWeight: "700",
                              fontSize: "clamp(24px,2.1vw,32px)",
                              letterSpacing: "-.035em",
                              lineHeight: "1.1",
                              textWrap: "balance",
                            }}
                          >
                            {p.productLine}
                          </div>
                        </div>
                        <div
                          style={{
                            marginTop: "auto",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-end",
                            gap: "12px",
                            borderTop: "1px solid var(--line-soft)",
                            paddingTop: "16px",
                          }}
                        >
                          <div>
                            <div
                              style={{
                                fontWeight: "700",
                                fontSize: "19px",
                                letterSpacing: "-.02em",
                                textTransform: "uppercase",
                                lineHeight: "1.1",
                                textWrap: "balance",
                              }}
                            >
                              {p.title}
                            </div>
                            <div style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--meta)", marginTop: "8px" }}>
                              {p.line}
                            </div>
                          </div>
                          <span
                            style={{
                              width: "44px",
                              height: "44px",
                              background: "var(--fill-accent)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flex: "none",
                            }}
                          >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                              <path
                                d="M4 12h15M12 5l7 7-7 7"
                                style={{ stroke: "var(--on-fill)", strokeWidth: "2.6px", strokeLinecap: "square" }}
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </section>
        </>
      ) : null}
    </main>
    <Footer />
    {caseOpen ? (
      <>
        <div
          onClick={backdrop}
          style={{
            position: "fixed",
            inset: "0",
            zIndex: "150",
            background: "var(--scrim)",
            backdropFilter: "blur(3px)",
            overflowY: "auto",
            animation: "cp-fade .3s both",
            padding: "clamp(12px,4vh,48px) clamp(12px,3vw,32px)",
          }}
        >
          <div
            style={{ maxWidth: "1040px", margin: "0 auto", background: "var(--bg)", animation: "cp-pop .5s cubic-bezier(.2,.7,.2,1) both" }}
          >
            <div
              style={{
                position: "sticky",
                top: "0",
                zIndex: "1",
                background: "var(--glass-strong)",
                backdropFilter: "blur(10px)",
                borderBottom: "1px solid var(--line-soft)",
                padding: "0 clamp(20px,3vw,36px)",
                height: "68px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <span style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--meta)" }}>← → · esc</span>
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
                padding: "clamp(24px,4vw,48px) clamp(20px,3vw,36px) 48px",
                display: "flex",
                flexDirection: "column",
                gap: "32px",
                animation: kAnim,
              }}
            >
              <div>
                <div style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--meta)" }}>{k.meta}</div>
                <h2
                  style={{
                    fontWeight: "700",
                    fontSize: "clamp(32px,4.2vw,60px)",
                    letterSpacing: "-.045em",
                    lineHeight: "1",
                    margin: "14px 0 0",
                    textWrap: "balance",
                  }}
                >
                  {k.title}
                </h2>
                {k.hasProduct ? (
                  <>
                    <div
                      style={{
                        color: "var(--accent)",
                        fontWeight: "700",
                        fontSize: "clamp(24px,2.6vw,38px)",
                        letterSpacing: "-.035em",
                        lineHeight: "1.1",
                        textWrap: "balance",
                        maxWidth: "28ch",
                        marginTop: "18px",
                      }}
                    >
                      {k.productLine}
                    </div>
                  </>
                ) : null}
              </div>
              {k.hasUi ? (
                <>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <span style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--meta)" }}>
                      {"l'interfaccia_ · dati di esempio"}
                    </span>
                    <div style={{ border: "1px solid var(--line)" }}>
                      <div
                        style={{
                          position: "relative",
                          aspectRatio: "16/9",
                          containerType: "inline-size",
                          overflow: "hidden",
                          background: "var(--subtle)",
                        }}
                      >
                        <CaseUI skin={k.id} style={{ position: "absolute", inset: "0" }} />
                      </div>
                    </div>
                  </div>
                </>
              ) : null}

              {k.hasIdea ? (
                <>
                  <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "780px" }}>
                      <span style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--meta)" }}>{"l'idea_"}</span>
                      <p style={{ margin: "0", fontSize: "clamp(18px,1.6vw,22px)", lineHeight: "1.45", textWrap: "pretty" }}>{k.idea}</p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      <span style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--meta)" }}>i problemi che risolve_</span>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,240px),1fr))", gap: "12px" }}>
                        {(k.probList || []).map((q, q_i) => (
                          <React.Fragment key={q_i}>
                            <div
                              style={{
                                border: "1px solid var(--line)",
                                padding: "20px",
                                display: "flex",
                                flexDirection: "column",
                                gap: "14px",
                              }}
                            >
                              <span style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--accent)" }}>{q.n}</span>
                              <span style={{ fontSize: "16px", lineHeight: "1.45", textWrap: "pretty" }}>{q.t}</span>
                            </div>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      <span style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--meta)" }}>come funziona_</span>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,200px),1fr))",
                          gap: "0 24px",
                          borderTop: "2px solid var(--accent)",
                        }}
                      >
                        {(k.stepList || []).map((st, st_i) => (
                          <React.Fragment key={st_i}>
                            <div style={{ padding: "18px 0 4px", display: "flex", flexDirection: "column", gap: "8px" }}>
                              <span
                                style={{
                                  fontWeight: "700",
                                  fontSize: "28px",
                                  letterSpacing: "-.05em",
                                  color: "var(--accent)",
                                  lineHeight: "1",
                                }}
                              >
                                {st.n}
                              </span>
                              <span style={{ fontWeight: "700", fontSize: "15px", textTransform: "uppercase", letterSpacing: "-.01em" }}>
                                {st.t}
                              </span>
                              <span style={{ fontSize: "15px", lineHeight: "1.45", color: "var(--body)", textWrap: "pretty" }}>{st.d}</span>
                            </div>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : null}

              {k.noIdea ? (
                <>
                  <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,280px),1fr))", gap: "12px" }}>
                      <div
                        style={{
                          background: "var(--fill-accent)",
                          color: "var(--on-fill)",
                          padding: "24px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          gap: "28px",
                          minHeight: "220px",
                        }}
                      >
                        <span style={{ fontFamily: "var(--mono)", fontSize: "12px" }}>risultato_</span>
                        <span>
                          <span
                            style={{
                              display: "block",
                              fontWeight: "700",
                              fontSize: "clamp(52px,6vw,88px)",
                              letterSpacing: "-.055em",
                              lineHeight: ".9",
                            }}
                          >
                            {k.stat}
                          </span>
                          <span style={{ display: "block", fontFamily: "var(--mono)", fontSize: "13px", marginTop: "12px" }}>
                            {k.statLabel}
                          </span>
                        </span>
                      </div>
                      {k.noUi ? (
                        <>
                          <div
                            style={{
                              background: "repeating-linear-gradient(135deg,var(--subtle-3) 0 10px,var(--subtle-2) 10px 20px)",
                              border: "1px solid var(--line-soft)",
                              minHeight: "220px",
                              display: "flex",
                              alignItems: "flex-end",
                              padding: "12px",
                              gridColumn: "span 1",
                            }}
                          >
                            <span style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--meta)" }}>
                              {k.image} — immagine da sostituire_
                            </span>
                          </div>
                        </>
                      ) : null}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,240px),1fr))", gap: "12px" }}>
                      <div style={{ border: "1px solid var(--line)", padding: "22px" }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontFamily: "var(--mono)",
                            fontSize: "12px",
                            color: "var(--meta)",
                            marginBottom: "14px",
                          }}
                        >
                          <span>01 · il problema</span>
                        </div>
                        <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.5", textWrap: "pretty" }}>{k.problem}</p>
                      </div>
                      <div style={{ border: "1px solid var(--line)", padding: "22px" }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontFamily: "var(--mono)",
                            fontSize: "12px",
                            color: "var(--meta)",
                            marginBottom: "14px",
                          }}
                        >
                          <span>02 · cosa abbiamo fatto</span>
                        </div>
                        <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.5", textWrap: "pretty" }}>{k.did}</p>
                      </div>
                      <div style={{ border: "1px solid var(--accent)", padding: "22px" }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontFamily: "var(--mono)",
                            fontSize: "12px",
                            color: "var(--accent)",
                            marginBottom: "14px",
                          }}
                        >
                          <span>03 · cosa è cambiato</span>
                        </div>
                        <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.5", textWrap: "pretty" }}>{k.result}</p>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}

              {k.hasGains ? (
                <>
                  <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    <span style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--meta)" }}>
                      il valore aggiunto_ · cosa rende alla tua attività
                    </span>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,220px),1fr))", gap: "12px" }}>
                      {(k.gains || []).map((g, g_i) => (
                        <React.Fragment key={g_i}>
                          <div
                            style={{
                              border: "1px solid var(--line)",
                              padding: "22px",
                              display: "flex",
                              flexDirection: "column",
                              gap: "12px",
                            }}
                          >
                            <span
                              style={{
                                color: "var(--accent)",
                                fontWeight: "700",
                                fontSize: "clamp(22px,2.2vw,30px)",
                                letterSpacing: "-.04em",
                                lineHeight: "1.05",
                                textWrap: "balance",
                              }}
                            >
                              {g.h}
                            </span>
                            <span style={{ fontSize: "15px", lineHeight: "1.45", color: "var(--body)", textWrap: "pretty" }}>{g.t}</span>
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                    {k.gainsNote ? (
                      <>
                        <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--meta)" }}>* {k.gainsNote}</span>
                      </>
                    ) : null}
                  </div>
                </>
              ) : null}

              {k.hasDeliver ? (
                <>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <span style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--meta)" }}>cosa abbiamo costruito_</span>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {(k.deliver || []).map((x, x_i) => (
                        <React.Fragment key={x_i}>
                          <span
                            style={{
                              border: "1px solid var(--accent)",
                              color: "var(--accent)",
                              padding: "8px 12px",
                              fontSize: "14px",
                              fontWeight: "700",
                              letterSpacing: "-.01em",
                            }}
                          >
                            ✓ {x}
                          </span>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </>
              ) : null}

              {k.noIdea ? (
                <>
                  <blockquote style={{ margin: "0", padding: "8px 0 8px 24px", borderLeft: "3px solid var(--accent)" }}>
                    <div
                      style={{
                        fontWeight: "700",
                        fontSize: "clamp(22px,2.4vw,34px)",
                        letterSpacing: "-.03em",
                        lineHeight: "1.15",
                        textWrap: "balance",
                      }}
                    >
                      “{k.quote}”
                    </div>
                    <div style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--meta)", marginTop: "12px" }}>
                      — {k.quoteBy}_
                    </div>
                  </blockquote>
                </>
              ) : null}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,200px),1fr))",
                  gap: "24px",
                  borderTop: "1px solid var(--line-soft)",
                  paddingTop: "22px",
                  fontFamily: "var(--mono)",
                  fontSize: "12px",
                }}
              >
                {k.noIdea ? (
                  <>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <span style={{ color: "var(--meta)" }}>durata_</span>
                      <span style={{ fontSize: "14px" }}>{k.duration}</span>
                    </div>
                  </>
                ) : null}

                {k.users ? (
                  <>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <span style={{ color: "var(--meta)" }}>chi lo usa_</span>
                      <span style={{ fontSize: "14px", fontFamily: "inherit" }}>{k.users}</span>
                    </div>
                  </>
                ) : null}

                {k.hasInvest ? (
                  <>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <span style={{ color: "var(--meta)" }}>investimento_</span>
                      <span style={{ fontSize: "14px" }}>{k.invest}</span>
                    </div>
                  </>
                ) : null}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ color: "var(--meta)" }}>servizi_</span>
                  {(k.serviceLinks || []).map((l, l_i) => (
                    <React.Fragment key={l_i}>
                      <a href={l.href} className="h-color" style={{ color: "var(--accent)", fontSize: "14px", "--h-color": "var(--ink)" }}>
                        {l.title} →
                      </a>
                    </React.Fragment>
                  ))}
                </div>
              </div>
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
                    transition: "background .25s",
                    "--h-background": "var(--fill-ink)",
                    "--h-color": "var(--on-fill)",
                  }}
                >
                  Un problema simile? Parliamone →
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
                    "--h-border-color": "var(--ink)",
                  }}
                >
                  Fai la diagnosi
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    ) : null}

    {liveOpen ? (
      <>
        <div
          onClick={backdrop}
          style={{
            position: "fixed",
            inset: "0",
            zIndex: "150",
            background: "var(--scrim)",
            backdropFilter: "blur(3px)",
            overflowY: "auto",
            animation: "cp-fade .3s both",
            padding: "clamp(12px,4vh,48px) clamp(12px,3vw,32px)",
          }}
        >
          <div
            style={{ maxWidth: "1040px", margin: "0 auto", background: "var(--bg)", animation: "cp-pop .5s cubic-bezier(.2,.7,.2,1) both" }}
          >
            <div
              style={{
                position: "sticky",
                top: "0",
                zIndex: "1",
                background: "var(--glass-strong)",
                backdropFilter: "blur(10px)",
                borderBottom: "1px solid var(--line-soft)",
                padding: "0 clamp(20px,3vw,36px)",
                height: "68px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <span style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--meta)" }}>← → · esc</span>
              <div style={{ display: "flex", gap: "6px" }}>
                <button
                  onClick={prevL}
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
                    "--h-border-color": "var(--ink)",
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M20 12H5M12 5l-7 7 7 7" style={{ stroke: "currentColor", strokeWidth: "2.4px", strokeLinecap: "square" }} />
                  </svg>
                </button>
                <button
                  onClick={nextL}
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
                padding: "clamp(24px,4vw,48px) clamp(20px,3vw,36px) 48px",
                display: "flex",
                flexDirection: "column",
                gap: "28px",
                animation: kAnim,
              }}
            >
              <div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {(lv.tags || []).map((tg, tg_i) => (
                    <React.Fragment key={tg_i}>
                      <span
                        style={{
                          background: "var(--fill-accent)",
                          color: "var(--on-fill)",
                          fontWeight: "700",
                          fontSize: "12px",
                          letterSpacing: "-.005em",
                          lineHeight: "1",
                          padding: "7px 10px",
                        }}
                      >
                        {tg}
                      </span>
                    </React.Fragment>
                  ))}
                </div>
                <h2
                  style={{
                    fontWeight: "700",
                    fontSize: "clamp(32px,4.2vw,60px)",
                    letterSpacing: "-.045em",
                    lineHeight: "1",
                    margin: "14px 0 0",
                    textWrap: "balance",
                  }}
                >
                  {lv.title}
                </h2>
              </div>
              <div
                style={{
                  position: "relative",
                  aspectRatio: "16/9",
                  background: "repeating-linear-gradient(135deg,var(--subtle-3) 0 10px,var(--subtle-2) 10px 20px)",
                  border: "1px solid var(--line)",
                  display: "flex",
                  alignItems: "flex-end",
                  padding: "12px",
                  overflow: "hidden",
                }}
              >
                <span style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--meta)" }}>{lv.domain}_</span>
                {(lvShots || []).map((s, s_i) => (
                  <React.Fragment key={s_i}>
                    <img
                      src={s.shot}
                      alt={s.shotAlt}
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "16px 24px",
                  flexWrap: "wrap",
                  paddingTop: "20px",
                  borderTop: "1px solid var(--line-soft)",
                }}
              >
                <span style={{ fontFamily: "var(--mono)", fontSize: "13px", color: lv.ctaC, overflowWrap: "anywhere" }}>{lv.cta}</span>
                {lv.isLink ? (
                  <>
                    <a
                      data-magnetic="1"
                      href={lv.href}
                      target="_blank"
                      rel="noopener"
                      className="h-background h-color"
                      style={{
                        height: "56px",
                        padding: "0 24px",
                        background: "var(--fill-accent)",
                        color: "var(--on-fill)",
                        fontWeight: "700",
                        fontSize: "16px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "12px",
                        transition: "background .25s",
                        "--h-background": "var(--fill-ink)",
                        "--h-color": "var(--on-fill)",
                      }}
                    >
                      Apri sito{" "}
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M7 17L17 7M8 7h9v9" style={{ stroke: "currentColor", strokeWidth: "2.6px", strokeLinecap: "square" }} />
                      </svg>
                    </a>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </>
    ) : null}
  </>);
  }
}

export default ProgettiPage;
