/* ============================================================
   CiMa OS — desktop shell controller
   • window manager: open / focus / drag / resize / min / max / close
   • dock: macOS magnification, Ubuntu running-indicators & click
     behaviour, launch bounce, tooltips
   • launcher: Windows-Start ergonomics (search, pinned tiles,
     all-apps, session controls)
   • settings: live chrome / theme / dock options
   ============================================================ */
(function () {
  "use strict";
  const $  = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const desk = $("#desk");
  const workarea = $("#workarea");
  const dock = $("#dock");
  const dockWrap = $("#dock-wrap");
  const launcher = $("#launcher");
  const tip = $("#dock-tip");

  /* -------------------------------------------------- app registry */
  const APPS = {
    documenti:    { name: "documenti",    icon: "folder",         sub: "~/progetti",  w: 560, h: 420, single: 1, body: docBody },
    terminale:    { name: "terminale",    icon: "terminal",       sub: "zsh",         w: 540, h: 360, body: termBody },
    compilatore:  { name: "compilatore",  icon: "memory",         sub: "libcima.so",  w: 520, h: 380, busy: 1, body: buildBody },
    monitor:      { name: "monitor",      icon: "monitor_heart",  sub: "sistema",     w: 460, h: 430, single: 1, body: monBody },
    note:         { name: "note",         icon: "edit_note",      sub: "appunti.md",  w: 480, h: 400, body: noteBody },
    cima:         { name: "cima.it",      icon: "public",         sub: "browser",     w: 600, h: 470, single: 1, body: brzBody },
    impostazioni: { name: "impostazioni", icon: "tune",           sub: "sistema",     w: 480, h: 560, single: 1, body: setBody },
    posta:        { name: "posta",        icon: "mail",           w: 460, h: 360, single: 1, body: genBody },
    calendario:   { name: "calendario",   icon: "calendar_month", w: 460, h: 360, single: 1, body: genBody },
    galleria:     { name: "galleria",     icon: "photo_library",  w: 460, h: 360, single: 1, body: genBody },
    contatti:     { name: "contatti",     icon: "contacts",       w: 420, h: 360, single: 1, body: genBody },
    calcolatrice: { name: "calcolatrice", icon: "calculate",      w: 300, h: 380, single: 1, body: genBody },
    cestino:      { name: "cestino",      icon: "delete",         sub: "vuoto",       w: 420, h: 320, single: 1, body: trashBody }
  };
  const PINNED = ["documenti", "terminale", "compilatore", "monitor", "note", "cima", "impostazioni"];

  /* -------------------------------------------------- window manager */
  let z = 10, focused = null, cascade = 0;
  const wins = []; // {el, app, prev}

  const appOf = id => APPS[id];
  const winsOf = id => wins.filter(w => w.app === id);

  function openApp(id) {
    const a = appOf(id); if (!a) return;
    if (a.single) {
      const ex = winsOf(id)[0];
      if (ex) { if (ex.el.classList.contains("is-min")) restore(ex); else focus(ex); return ex; }
    }
    const w = createWindow(id);
    bounce(id);
    return w;
  }

  function createWindow(id) {
    const a = appOf(id);
    const el = document.createElement("section");
    el.className = "win is-focused is-anim";
    el.dataset.app = id;
    el.setAttribute("data-screen-label", a.name);
    const w = Math.min(a.w, workarea.clientWidth - 40);
    const h = Math.min(a.h, workarea.clientHeight - 30);
    const x = Math.max(12, Math.min(60 + cascade * 26, workarea.clientWidth - w - 12));
    const y = Math.max(10, Math.min(28 + cascade * 22, workarea.clientHeight - h - 70));
    cascade = (cascade + 1) % 7;
    el.style.cssText = `left:${x}px;top:${y}px;width:${w}px;height:${h}px;z-index:${++z};opacity:0;transform:scale(.97)`;
    el.innerHTML = winChrome(a) + `<div class="win-busy"></div><div class="win-body">${a.body(id)}</div><div class="win-resize"></div>`;
    if (a.busy) el.classList.add("is-busy");
    workarea.appendChild(el);
    requestAnimationFrame(() => { el.style.opacity = ""; el.style.transform = ""; });
    setTimeout(() => el.classList.remove("is-anim"), 320);
    const rec = { el, app: id, prev: null };
    wins.push(rec);
    wireWindow(rec);
    focus(rec);
    ensureRunningDockItem(id);
    afterApp(id, rec);
    return rec;
  }

  function winChrome(a) {
    return `<div class="win-bar">
      <span class="win-ctl win-dots">
        <button class="dot close" data-act="close" title="chiudi" aria-label="chiudi"></button>
        <button class="dot" data-act="min" title="riduci" aria-label="riduci"></button>
        <button class="dot" data-act="max" title="ingrandisci" aria-label="ingrandisci"></button>
      </span>
      <span class="win-blk"></span>
      <span class="material-symbols-outlined win-ico">${a.icon}</span>
      <span class="win-title">${a.name}<span class="dim">${a.sub ? " — " + a.sub : ""}</span></span>
      <span class="win-ctl win-btns">
        <button class="cbtn" data-act="min" title="riduci" aria-label="riduci"><span class="material-symbols-outlined">remove</span><span class="glyph">_</span></button>
        <button class="cbtn" data-act="max" title="ingrandisci" aria-label="ingrandisci"><span class="material-symbols-outlined">crop_square</span><span class="glyph">□</span></button>
        <button class="cbtn close" data-act="close" title="chiudi" aria-label="chiudi"><span class="material-symbols-outlined">close</span><span class="glyph">×</span></button>
      </span>
    </div>`;
  }

  function focus(rec) {
    if (focused && focused !== rec) { focused.el.classList.add("is-unfocused"); focused.el.classList.remove("is-focused"); }
    rec.el.classList.remove("is-unfocused"); rec.el.classList.add("is-focused");
    rec.el.style.zIndex = ++z;
    focused = rec;
    $("#tb-appname").textContent = appOf(rec.app).name;
    syncDock();
  }

  function closeWin(rec) {
    const i = wins.indexOf(rec); if (i < 0) return;
    rec.el.classList.add("is-anim"); rec.el.style.opacity = "0"; rec.el.style.transform = "scale(.96)";
    setTimeout(() => rec.el.remove(), 190);
    wins.splice(i, 1);
    if (focused === rec) { focused = null; const top = topWindow(); if (top) focus(top); else { $("#tb-appname").textContent = "scrivania"; syncDock(); } }
    removeRunningDockItem(rec.app);
    syncDock();
  }
  function topWindow() {
    let best = null, bz = -1;
    wins.forEach(w => { if (!w.el.classList.contains("is-min")) { const zz = +w.el.style.zIndex; if (zz > bz) { bz = zz; best = w; } } });
    return best;
  }

  function minimize(rec) {
    const item = dockItem(rec.app);
    rec.el.classList.add("is-anim");
    if (item) {
      const wr = rec.el.getBoundingClientRect(), ir = item.getBoundingClientRect();
      const dx = (ir.left + ir.width / 2) - (wr.left + wr.width / 2);
      const dy = (ir.top + ir.height / 2) - (wr.top + wr.height / 2);
      rec.el.style.transformOrigin = "center";
      rec.el.style.transform = `translate(${dx}px,${dy}px) scale(.08)`;
    }
    rec.el.classList.add("is-min");
    if (focused === rec) { focused = null; const t = topWindow(); if (t) focus(t); else { $("#tb-appname").textContent = "scrivania"; } }
    syncDock();
  }
  function restore(rec) {
    rec.el.classList.add("is-anim"); rec.el.classList.remove("is-min");
    rec.el.style.transform = ""; rec.el.style.opacity = "";
    focus(rec);
    setTimeout(() => rec.el.classList.remove("is-anim"), 320);
  }

  function toggleMax(rec) {
    rec.el.classList.add("is-anim");
    if (rec.el.classList.contains("is-max")) {
      rec.el.classList.remove("is-max");
      const p = rec.prev; if (p) { rec.el.style.left = p.l + "px"; rec.el.style.top = p.t + "px"; rec.el.style.width = p.w + "px"; rec.el.style.height = p.h + "px"; }
    } else {
      rec.prev = { l: rec.el.offsetLeft, t: rec.el.offsetTop, w: rec.el.offsetWidth, h: rec.el.offsetHeight };
      rec.el.classList.add("is-max");
      rec.el.style.left = "0"; rec.el.style.top = "0"; rec.el.style.width = "100%"; rec.el.style.height = "100%";
    }
    setTimeout(() => rec.el.classList.remove("is-anim"), 320);
  }

  function wireWindow(rec) {
    const el = rec.el, bar = $(".win-bar", el);
    el.addEventListener("pointerdown", () => { if (focused !== rec) focus(rec); }, true);
    el.addEventListener("click", e => {
      const b = e.target.closest("[data-act]"); if (!b) return;
      e.stopPropagation();
      const act = b.dataset.act;
      if (act === "close") closeWin(rec);
      else if (act === "min") minimize(rec);
      else if (act === "max") toggleMax(rec);
    });
    bar.addEventListener("pointerdown", e => {
      if (e.target.closest("[data-act]") || rec.el.classList.contains("is-max")) return;
      const sx = e.clientX, sy = e.clientY, ol = el.offsetLeft, ot = el.offsetTop;
      bar.setPointerCapture(e.pointerId);
      const mv = ev => {
        let nl = ol + (ev.clientX - sx), nt = ot + (ev.clientY - sy);
        nl = Math.max(-el.offsetWidth + 90, Math.min(nl, workarea.clientWidth - 90));
        nt = Math.max(0, Math.min(nt, workarea.clientHeight - 38));
        el.style.left = nl + "px"; el.style.top = nt + "px";
      };
      const up = () => { try { bar.releasePointerCapture(e.pointerId); } catch (x) {} bar.removeEventListener("pointermove", mv); bar.removeEventListener("pointerup", up); };
      bar.addEventListener("pointermove", mv); bar.addEventListener("pointerup", up);
    });
    bar.addEventListener("dblclick", e => { if (!e.target.closest("[data-act]")) toggleMax(rec); });
    const rz = $(".win-resize", el);
    rz.addEventListener("pointerdown", e => {
      e.stopPropagation(); const sx = e.clientX, sy = e.clientY, ow = el.offsetWidth, oh = el.offsetHeight;
      rz.setPointerCapture(e.pointerId);
      const mv = ev => { el.style.width = Math.max(260, ow + ev.clientX - sx) + "px"; el.style.height = Math.max(150, oh + ev.clientY - sy) + "px"; };
      const up = () => { try { rz.releasePointerCapture(e.pointerId); } catch (x) {} rz.removeEventListener("pointermove", mv); rz.removeEventListener("pointerup", up); };
      rz.addEventListener("pointermove", mv); rz.addEventListener("pointerup", up);
    });
  }

  /* -------------------------------------------------- dock build */
  function tileInner(id) {
    if (id === "launcher") return `<span class="lmark">cima</span>`;
    return `<span class="material-symbols-outlined">${appOf(id).icon}</span>`;
  }
  function makeItem(id, launcherFlag) {
    const el = document.createElement("button");
    el.className = "dock-item" + (launcherFlag ? " is-launcher" : "");
    el.dataset.app = id;
    el.setAttribute("aria-label", id === "launcher" ? "avvio applicazioni" : appOf(id).name);
    el.innerHTML = `<span class="dock-tile">${tileInner(id)}</span><span class="dock-dot"></span>`;
    return el;
  }
  function divider() { const d = document.createElement("span"); d.className = "dock-div"; return d; }

  const launcherItem = makeItem("launcher", true);
  dock.appendChild(launcherItem);
  dock.appendChild(divider());
  PINNED.forEach(id => dock.appendChild(makeItem(id)));
  const div2 = divider(); dock.appendChild(div2);
  dock.appendChild(makeItem("cestino"));

  const dockItem = id => dock.querySelector(`.dock-item[data-app="${id}"]`);
  function afterApp(id) { syncDock(); }
  function ensureRunningDockItem(id) {
    if (PINNED.includes(id) || id === "cestino") return;
    if (!dockItem(id)) dock.insertBefore(makeItem(id), div2);
  }
  function removeRunningDockItem(id) {
    if (PINNED.includes(id) || id === "cestino") return;
    if (winsOf(id).length === 0) { const it = dockItem(id); if (it) it.remove(); }
  }
  function syncDock() {
    $$(".dock-item", dock).forEach(it => {
      const id = it.dataset.app; if (id === "launcher" || id === "cestino") return;
      const list = winsOf(id);
      it.classList.toggle("is-running", list.length > 0);
      it.classList.toggle("is-focused", !!focused && focused.app === id && !focused.el.classList.contains("is-min"));
    });
  }
  function bounce(id) {
    const it = dockItem(id); if (!it) return;
    const t = $(".dock-tile", it); t.classList.remove("bounce"); void t.offsetWidth; t.classList.add("bounce");
    setTimeout(() => t.classList.remove("bounce"), 950);
  }

  dock.addEventListener("click", e => {
    const it = e.target.closest(".dock-item"); if (!it) return;
    const id = it.dataset.app;
    if (id === "launcher") { toggleLauncher(); return; }
    closeLauncher();
    if (id === "cestino") { openApp("cestino"); return; }
    const list = winsOf(id);
    if (list.length === 0) { openApp(id); return; }
    const vis = list.filter(w => !w.el.classList.contains("is-min"));
    if (focused && focused.app === id && vis.includes(focused)) minimize(focused);
    else { const target = vis[0] || list[0]; if (target.el.classList.contains("is-min")) restore(target); else focus(target); }
  });

  /* -------------------------------------------------- dock magnification (macOS) */
  let rafQ = null, curX = null;
  const MAXS = 1.6, RANGE = 110;
  dock.addEventListener("pointermove", e => { curX = e.clientX; if (!rafQ) rafQ = requestAnimationFrame(magnify); });
  dock.addEventListener("pointerleave", () => { curX = null; resetMagnify(); });

  function magnify() {
    rafQ = null;
    if (curX == null || desk.dataset.magnify !== "on") return;
    dock.classList.remove("settling");
    const kids = Array.from(dock.children);
    const wrapLeft = dock.getBoundingClientRect().left;
    const base = kids.map(k => ({ el: k, w: k.offsetWidth, c: wrapLeft + k.offsetLeft + k.offsetWidth / 2, item: k.classList.contains("dock-item") }));
    base.forEach(b => {
      if (!b.item) { b.s = 1; return; }
      const d = Math.abs(curX - b.c);
      b.s = d < RANGE ? 1 + (MAXS - 1) * Math.cos((d / RANGE) * (Math.PI / 2)) : 1;
    });
    const left0 = base[0].c - base[0].w / 2;
    let run = left0; const sc = [];
    base.forEach((b, i) => {
      const sw = b.w * b.s;
      sc[i] = run + sw / 2; run += sw;
      if (i < base.length - 1) { const gap = base[i + 1].c - base[i].c - (base[i].w + base[i + 1].w) / 2; run += gap; }
    });
    const lastB = base[base.length - 1];
    const baseMid = (left0 + (lastB.c + lastB.w / 2)) / 2;
    const scaledMid = (left0 + run) / 2;
    const shift = baseMid - scaledMid;
    let topItem = null, topS = 1;
    base.forEach((b, i) => {
      const tx = (sc[i] + shift) - b.c;
      b.el.style.transform = `translateX(${tx}px)`;
      if (b.item) { $(".dock-tile", b.el).style.transform = `scale(${b.s})`; if (b.s > topS) { topS = b.s; topItem = b.el; } }
    });
    if (topItem && topS > 1.04) showTip(topItem); else hideTip();
  }
  function resetMagnify() {
    dock.classList.add("settling");
    Array.from(dock.children).forEach(k => { k.style.transform = ""; const t = $(".dock-tile", k); if (t) t.style.transform = ""; });
    hideTip();
    setTimeout(() => dock.classList.remove("settling"), 260);
  }
  function showTip(item) {
    const id = item.dataset.app;
    tip.textContent = id === "launcher" ? "avvio applicazioni" : appOf(id).name;
    tip.classList.add("show");
    const r = item.getBoundingClientRect();
    tip.style.left = (r.left + r.width / 2) + "px";
    tip.style.top = (r.top - 8) + "px";
  }
  function hideTip() { tip.classList.remove("show"); }
  const settleStyle = document.createElement("style");
  settleStyle.textContent = ".dock.settling .dock-item,.dock.settling .dock-div{transition:transform .24s var(--ease-out)}.dock.settling .dock-tile{transition:transform .24s var(--ease-out)}";
  document.head.appendChild(settleStyle);

  /* -------------------------------------------------- launcher (Windows-Start) */
  let launcherOpen = false, kbdIdx = -1, kbdList = [];
  const lInput = $("#lnch-input"), lScroll = $("#lnch-scroll");
  const ALL = Object.keys(APPS).filter(id => id !== "cestino").sort((a, b) => appOf(a).name.localeCompare(appOf(b).name));

  function toggleLauncher() { launcherOpen ? closeLauncher() : openLauncher(); }
  function openLauncher() {
    launcherOpen = true; launcher.classList.add("is-open"); launcherItem.classList.add("is-open");
    lInput.value = ""; renderLauncher(""); setTimeout(() => lInput.focus(), 30);
  }
  function closeLauncher() { launcherOpen = false; launcher.classList.remove("is-open"); launcherItem.classList.remove("is-open"); kbdIdx = -1; }

  function renderLauncher(q) {
    q = (q || "").trim().toLowerCase();
    let html = "";
    if (!q) {
      html += `<div class="lnch-sec">in evidenza</div><div class="lnch-pins">`;
      PINNED.concat(["posta", "calendario", "galleria", "contatti", "calcolatrice"]).forEach(id => {
        html += `<button class="tile" data-app="${id}"><span class="ticon"><span class="material-symbols-outlined">${appOf(id).icon}</span></span><span class="tlabel">${appOf(id).name}</span></button>`;
      });
      html += `</div><div class="lnch-sec">tutte le applicazioni</div><div class="lnch-list">`;
      ALL.forEach(id => {
        html += `<div class="lrow" data-app="${id}"><span class="ric"><span class="material-symbols-outlined">${appOf(id).icon}</span></span><span class="rt">${appOf(id).name}</span><span class="rd">${appOf(id).sub || "app"}</span></div>`;
      });
      html += `</div>`;
    } else {
      const hits = ALL.filter(id => appOf(id).name.toLowerCase().includes(q) || (appOf(id).sub || "").toLowerCase().includes(q));
      if (hits.length === 0) html += `<div class="lnch-empty">nessun risultato per “${q}”</div>`;
      else {
        html += `<div class="lnch-sec">risultati · ${hits.length}</div><div class="lnch-list">`;
        hits.forEach(id => {
          html += `<div class="lrow" data-app="${id}"><span class="ric"><span class="material-symbols-outlined">${appOf(id).icon}</span></span><span class="rt">${appOf(id).name}</span><span class="rd">${appOf(id).sub || "app"}</span></div>`;
        });
        html += `</div>`;
      }
    }
    lScroll.innerHTML = html;
    kbdList = $$(".tile,.lrow", lScroll); kbdIdx = -1;
  }
  lInput.addEventListener("input", () => renderLauncher(lInput.value));
  lInput.addEventListener("keydown", e => {
    if (e.key === "Escape") { closeLauncher(); return; }
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault(); if (!kbdList.length) return;
      kbdList.forEach(n => n.classList.remove("kbd"));
      kbdIdx = e.key === "ArrowDown" ? Math.min(kbdList.length - 1, kbdIdx + 1) : Math.max(0, kbdIdx - 1);
      kbdList[kbdIdx].classList.add("kbd"); kbdList[kbdIdx].scrollIntoView ? null : null;
      const t = kbdList[kbdIdx], pr = t.offsetTop; lScroll.scrollTop = Math.max(0, pr - 120);
    } else if (e.key === "Enter") {
      const t = kbdList[kbdIdx] || kbdList[0]; if (t) { openApp(t.dataset.app); closeLauncher(); }
    }
  });
  lScroll.addEventListener("click", e => { const t = e.target.closest("[data-app]"); if (t) { openApp(t.dataset.app); closeLauncher(); } });

  $$(".lnch-pow button").forEach(b => b.addEventListener("click", () => {
    const a = b.dataset.pow;
    closeLauncher();
    if (a === "lock") flash("schermo bloccato");
    else if (a === "restart") flash("riavvio in corso…");
    else flash("arresto del sistema…");
  }));

  /* -------------------------------------------------- top-bar menus */
  const MENUS = {
    app: [
      { i: "info", t: "info su cima os", k: "" },
      { sep: 1 },
      { i: "tune", t: "impostazioni…", act: () => openApp("impostazioni"), k: "⌘," },
      { i: "lock", t: "blocca schermo", act: () => flash("schermo bloccato"), k: "⌘L" },
      { sep: 1 },
      { i: "logout", t: "termina sessione", danger: 1, act: () => flash("sessione terminata") }
    ],
    file: [
      { i: "add", t: "nuova finestra", act: () => openApp("note"), k: "⌘N" },
      { i: "folder_open", t: "apri documenti", act: () => openApp("documenti"), k: "⌘O" },
      { sep: 1 },
      { i: "close", t: "chiudi finestra", act: () => focused && closeWin(focused), k: "⌘W" }
    ],
    modifica: [
      { i: "undo", t: "annulla", dis: 1, k: "⌘Z" },
      { i: "redo", t: "ripeti", dis: 1, k: "⇧⌘Z" },
      { sep: 1 },
      { i: "content_copy", t: "copia", dis: 1, k: "⌘C" },
      { i: "content_paste", t: "incolla", dis: 1, k: "⌘V" }
    ],
    vista: [
      { head: "chrome finestre" },
      { i: "dashboard", t: "hairline recessed", act: () => setChrome("ac") },
      { i: "horizontal_rule", t: "hairline", act: () => setChrome("hairline") },
      { i: "terminal", t: "console", act: () => setChrome("console") },
      { i: "filter_none", t: "recessed", act: () => setChrome("recessed") },
      { sep: 1 },
      { i: "dark_mode", t: "alterna tema", act: () => setTheme(desk.dataset.theme === "dark" ? "light" : "dark"), k: "⌘T" },
      { i: "tune", t: "tutte le impostazioni…", act: () => openApp("impostazioni") }
    ]
  };
  let openDrop = null;
  function buildDrop(name, anchor) {
    closeDrop();
    const d = document.createElement("div"); d.className = "tb-drop is-open";
    MENUS[name].forEach(m => {
      if (m.sep) { const s = document.createElement("div"); s.className = "msep"; d.appendChild(s); return; }
      if (m.head) { const h = document.createElement("div"); h.className = "mhead"; h.textContent = m.head; d.appendChild(h); return; }
      const it = document.createElement("div");
      it.className = "mi" + (m.danger ? " danger" : "") + (m.dis ? " is-dis" : "");
      it.innerHTML = `<span class="material-symbols-outlined">${m.i}</span><span>${m.t}</span>${m.k ? `<span class="k">${m.k}</span>` : ""}`;
      if (m.act && !m.dis) it.addEventListener("click", () => { m.act(); closeDrop(); });
      d.appendChild(it);
    });
    desk.appendChild(d);   // inside #desk so themed CSS vars (--surface, --line-2…) cascade
    const r = anchor.getBoundingClientRect();
    d.style.left = Math.min(r.left, window.innerWidth - d.offsetWidth - 8) + "px";
    openDrop = { d, anchor, name }; anchor.classList.add("is-open");
  }
  function closeDrop() { if (openDrop) { openDrop.d.remove(); openDrop.anchor.classList.remove("is-open"); openDrop = null; } }
  $$(".tb-menu, .tb-cima").forEach(btn => {
    const name = btn.id === "tb-cima" ? "app" : btn.dataset.menu;
    if (!MENUS[name]) return;
    btn.addEventListener("click", e => {
      e.stopPropagation();
      if (openDrop && openDrop.name === name) { closeDrop(); return; }
      buildDrop(name, btn);
    });
    btn.addEventListener("pointerenter", () => { if (openDrop && openDrop.name !== name) buildDrop(name, btn); });
  });

  /* -------------------------------------------------- global click / keys */
  document.addEventListener("click", e => {
    if (!e.target.closest(".tb-drop") && !e.target.closest(".tb-menu") && !e.target.closest(".tb-cima")) closeDrop();
    if (launcherOpen && !e.target.closest("#launcher") && !e.target.closest(".dock-item.is-launcher")) closeLauncher();
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") { closeDrop(); if (launcherOpen) closeLauncher(); }
    if ((e.key === "Meta" || e.key === "OS") && !e.repeat) { /* reserved */ }
    if (e.metaKey && e.key.toLowerCase() === "t") { e.preventDefault(); setTheme(desk.dataset.theme === "dark" ? "light" : "dark"); }
    if (e.key === " " && document.activeElement === document.body) { /* no-op */ }
  });
  // super/cmd tap or click cima opens launcher already via dock; add keyboard:
  let metaTap = 0;
  document.addEventListener("keyup", e => {
    if (e.key === "Meta" || e.key === "OS") { const now = Date.now(); if (now - metaTap < 400) toggleLauncher(); metaTap = now; }
  });

  /* -------------------------------------------------- settings options API */
  function setChrome(v) { desk.dataset.chrome = v; save(); refreshSettings(); }
  function setTheme(v) { desk.dataset.theme = v; save(); refreshSettings(); }
  function setOpt(k, v) { desk.dataset[k] = v; save(); refreshSettings(); }
  function save() {
    try {
      localStorage.setItem("cmos.opts", JSON.stringify({
        chrome: desk.dataset.chrome, theme: desk.dataset.theme,
        magnify: desk.dataset.magnify, indicator: desk.dataset.indicator, autohide: desk.dataset.autohide
      }));
    } catch (x) {}
  }
  function load() {
    try {
      const o = JSON.parse(localStorage.getItem("cmos.opts") || "{}");
      ["chrome", "theme", "magnify", "indicator", "autohide"].forEach(k => { if (o[k]) desk.dataset[k] = o[k]; });
    } catch (x) {}
  }
  function refreshSettings() {
    winsOf("impostazioni").forEach(w => { const b = $(".win-body", w.el); if (b) { b.innerHTML = setBody(); wireSettings(b); } });
  }
  function wireSettings(root) {
    $$("[data-set]", root).forEach(btn => {
      btn.addEventListener("click", () => {
        const k = btn.dataset.set, v = btn.dataset.val;
        if (k === "chrome") setChrome(v);
        else if (k === "theme") setTheme(v);
        else setOpt(k, v);
      });
    });
  }

  /* -------------------------------------------------- flash toast */
  let toastEl = null;
  function flash(msg) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.style.cssText = "position:absolute;left:50%;top:46px;transform:translateX(-50%) translateY(-8px);z-index:700;background:var(--bar);color:var(--bar-ink);font-family:var(--font-mono);font-size:.74rem;padding:.5rem .9rem;border-radius:8px;box-shadow:var(--shadow-sm);opacity:0;transition:opacity .18s,transform .18s;pointer-events:none;border:1px solid rgba(255,255,255,.1)";
      desk.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    requestAnimationFrame(() => { toastEl.style.opacity = "1"; toastEl.style.transform = "translateX(-50%) translateY(0)"; });
    clearTimeout(toastEl._t);
    toastEl._t = setTimeout(() => { toastEl.style.opacity = "0"; toastEl.style.transform = "translateX(-50%) translateY(-8px)"; }, 1800);
  }

  /* -------------------------------------------------- clock */
  function tick() {
    const d = new Date();
    const days = ["dom", "lun", "mar", "mer", "gio", "ven", "sab"];
    const hh = String(d.getHours()).padStart(2, "0"), mm = String(d.getMinutes()).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0"), mo = String(d.getMonth() + 1).padStart(2, "0");
    $("#tb-clock").innerHTML = `<span class="d">${days[d.getDay()]} ${dd}/${mo}</span><b>${hh}:${mm}</b>`;
  }
  tick(); setInterval(tick, 1000 * 20);

  /* ============================================================
     App body templates
     ============================================================ */
  function docBody() {
    const files = [
      ["folder", "stazione_terni", "12 elementi", "cartella"],
      ["folder", "ponte_tevere", "31 elementi", "cartella"],
      ["description", "relazione_strutturale.pdf", "2.4 mb", "pdf"],
      ["table_chart", "carichi_sismici.xlsx", "880 kb", "foglio"],
      ["architecture", "pianta_fondazioni.dwg", "5.1 mb", "cad"],
      ["code", "libcima.so", "1.2 mb", "binario"],
      ["image", "render_facciata.png", "3.7 mb", "png"]
    ];
    return `<div class="doc-toolbar">
        <span class="material-symbols-outlined">chevron_left</span>
        <span class="material-symbols-outlined">chevron_right</span>
        <span class="path"><b>~</b> / progetti</span><span class="grow"></span>
        <span class="material-symbols-outlined">view_list</span>
        <span class="material-symbols-outlined">grid_view</span>
      </div>
      <div class="filelist">${files.map(f => `<div class="file"><span class="material-symbols-outlined">${f[0]}</span><span class="nm">${f[1]}</span><span class="meta">${f[2]}</span><span class="tag">${f[3]}</span></div>`).join("")}</div>`;
  }

  function termBody() {
    return `<div class="term"><span class="dm"># cima os · zsh — sessione locale</span>
<span class="pr">nicola@cima</span>:<span class="dm">~/progetti</span>$ make libcima
<span class="dm">cc -O2 -fPIC -c struttura.c calcolo.c sismica.c</span>
<span class="ok">✓</span> compilato 3 unità · 0 errori
<span class="pr">nicola@cima</span>:<span class="dm">~/progetti</span>$ ./solve --modello ponte_tevere
caricamento mesh … <span class="ok">ok</span> (48.2k nodi)
analisi modale … <span class="ok">ok</span>
<span class="wn">⚠</span> nodo 1192: spostamento 31mm &gt; soglia
report → <span class="dm">out/ponte_tevere.report</span>
<span class="pr">nicola@cima</span>:<span class="dm">~/progetti</span>$ <span class="cur"></span>
</div>`;
  }

  function buildBody() {
    return `<div class="app">
      <div class="eyebrow">libcima.so · build pipeline</div>
      <h3>compilazione in corso</h3>
      <div class="rule"></div>
      <div class="mon-row"><span class="lbl">struttura.c</span><div class="mon-bar"><i style="width:100%"></i></div><span class="val">ok</span></div>
      <div class="mon-row"><span class="lbl">calcolo.c</span><div class="mon-bar"><i style="width:100%"></i></div><span class="val">ok</span></div>
      <div class="mon-row"><span class="lbl">sismica.c</span><div class="mon-bar"><i style="width:64%"></i></div><span class="val">64%</span></div>
      <div class="mon-row"><span class="lbl">link .so</span><div class="mon-bar"><i style="width:8%"></i></div><span class="val">…</span></div>
      <p class="lead" style="margin-top:1rem;font-family:var(--font-mono);font-size:.74rem">cc -O2 -fPIC · target x86_64 · 3 unità</p>
      <div style="display:flex;gap:.5rem"><button class="btn ghost">log</button><button class="btn neutral">annulla</button></div>
    </div>`;
  }

  function monBody() {
    const spark = "M0,46 L18,40 36,44 54,30 72,34 90,18 108,26 126,12 144,22 162,8 180,16 198,6 216,14 234,4 252,12 270,2";
    return `<div class="mon">
      <div class="eyebrow">monitor di sistema</div>
      <h3>cima os · risorse</h3>
      <div class="rule"></div>
      <div class="mon-row"><span class="lbl">cpu</span><div class="mon-bar"><i style="width:42%"></i></div><span class="val">42%</span></div>
      <div class="mon-row"><span class="lbl">memoria</span><div class="mon-bar"><i style="width:61%"></i></div><span class="val">9.8g</span></div>
      <div class="mon-row"><span class="lbl">disco</span><div class="mon-bar"><i style="width:28%"></i></div><span class="val">28%</span></div>
      <div class="mon-row"><span class="lbl">rete</span><div class="mon-bar"><i style="width:14%"></i></div><span class="val">1.2m</span></div>
      <div class="mon-graph"><svg viewBox="0 0 270 52" preserveAspectRatio="none"><polyline points="${spark.replace(/[ML]/g, " ").trim()}" fill="none" stroke="var(--accent)" stroke-width="1.6" vector-effect="non-scaling-stroke"/></svg></div>
      <p class="lead" style="margin-top:.7rem;font-family:var(--font-mono);font-size:.72rem">uptime 4g 18h · 142 processi</p>
    </div>`;
  }

  function noteBody() {
    return `<div class="note">
      <h4># appunti — riunione strutture</h4>
      verificare carichi sismici zona 2 prima del<br>
      deposito al comune di terni.<br><br>
      - [ ] aggiornare relazione di calcolo<br>
      - [x] esportare pianta fondazioni dwg<br>
      - [ ] firmare e protocollare<br><br>
      nodo 1192 fuori soglia → ricontrollare<br>
      vincoli appoggio campata centrale<span class="cur"></span>
    </div>`;
  }

  function brzBody() {
    return `<div class="brz-bar">
        <span class="nav"><button><span class="material-symbols-outlined">arrow_back</span></button><button><span class="material-symbols-outlined">arrow_forward</span></button><button><span class="material-symbols-outlined">refresh</span></button></span>
        <span class="brz-url"><span class="material-symbols-outlined">lock</span>cima-progetti.it</span>
      </div>
      <div class="brz-page">
        <div class="brz-hero">
          <div class="eyebrow">cima progetti · ingegneria</div>
          <h2>strutture che<br><b>tengono.</b></h2>
          <p>studio di ingegneria strutturale e civile. calcolo, collaudo e direzione lavori dal 1998.</p>
          <div class="brz-cta"><button class="btn">contattaci</button><button class="btn ghost">progetti</button></div>
        </div>
        <div class="brz-services">
          <div class="brz-svc"><span class="material-symbols-outlined">foundation</span><div class="t">strutturale</div><div class="d">calcolo c.a., acciaio e legno.</div></div>
          <div class="brz-svc"><span class="material-symbols-outlined">earthquake</span><div class="t">sismica</div><div class="d">verifiche e adeguamento ntc.</div></div>
          <div class="brz-svc"><span class="material-symbols-outlined">engineering</span><div class="t">direzione</div><div class="d">cantiere e collaudo statico.</div></div>
          <div class="brz-svc"><span class="material-symbols-outlined">view_in_ar</span><div class="t">bim</div><div class="d">modellazione e coordinamento.</div></div>
        </div>
      </div>`;
  }

  function trashBody() {
    return `<div class="gen"><span class="material-symbols-outlined">delete</span><h3>cestino vuoto</h3><p>gli elementi che elimini compaiono qui prima di essere rimossi definitivamente.</p></div>`;
  }
  function genBody(id) {
    const a = appOf(id);
    return `<div class="gen"><span class="material-symbols-outlined">${a.icon}</span><h3>${a.name}</h3><p>applicazione dimostrativa di CiMa OS. la finestra usa il chrome attivo e tutti i comandi del gestore finestre.</p><div style="margin-top:1rem"><button class="btn ghost">azione</button></div></div>`;
  }

  /* ---- settings (options surface) ---- */
  function seg(key, current, opts) {
    return `<div class="seg">${opts.map(o =>
      `<button data-set="${key}" data-val="${o.v}" aria-pressed="${current === o.v}">${o.i ? `<span class="material-symbols-outlined">${o.i}</span>` : ""}${o.t}</button>`
    ).join("")}</div>`;
  }
  function setBody() {
    const d = desk.dataset;
    return `<div class="set">
      <div class="eyebrow">impostazioni · aspetto</div>
      <h3>chrome &amp; dock</h3>
      <div class="rule"></div>

      <div class="set-grp">
        <span class="lbl">chrome finestre <span class="sub">stile barra titolo + controlli</span></span>
        ${seg("chrome", d.chrome, [
          { v: "ac", t: "hairline recessed", i: "dashboard" },
          { v: "hairline", t: "hairline", i: "horizontal_rule" },
          { v: "console", t: "console", i: "terminal" },
          { v: "recessed", t: "recessed", i: "filter_none" }
        ])}
      </div>

      <div class="set-grp">
        <span class="lbl">tema</span>
        ${seg("theme", d.theme, [
          { v: "dark", t: "scuro", i: "dark_mode" },
          { v: "light", t: "chiara", i: "light_mode" }
        ])}
      </div>

      <div class="set-grp">
        <span class="lbl">dock · ingrandimento <span class="sub">stile macOS</span></span>
        ${seg("magnify", d.magnify, [
          { v: "on", t: "attivo", i: "zoom_in" },
          { v: "off", t: "fisso", i: "zoom_out" }
        ])}
      </div>

      <div class="set-grp">
        <span class="lbl">dock · indicatore app aperte</span>
        ${seg("indicator", d.indicator, [
          { v: "bar", t: "barra", i: "remove" },
          { v: "dot", t: "punto", i: "fiber_manual_record" }
        ])}
      </div>

      <div class="set-grp">
        <span class="lbl">dock · comportamento <span class="sub">nascondi automaticamente</span></span>
        ${seg("autohide", d.autohide, [
          { v: "off", t: "sempre visibile", i: "visibility" },
          { v: "on", t: "nascondi auto", i: "visibility_off" }
        ])}
      </div>

      <p class="set-note">il dock unisce il comportamento di ubuntu (indicatori, click = apri/focus/riduci), l'ergonomia del menu start di windows (lanciatore con ricerca, app aggiunte, controlli sessione) e lo stile del dock macOS (vetro, ingrandimento, rimbalzo).</p>
    </div>`;
  }

  /* -------------------------------------------------- boot */
  load();
  refreshSettings();

  // Curated "in use" composition — deliberate placement, not a cascade.
  const BOOT = [
    ["documenti",   0.035, 0.065, 0.300, 0.625],
    ["terminale",   0.050, 0.470, 0.405, 0.455],
    ["compilatore", 0.380, 0.095, 0.320, 0.500],
    ["monitor",     0.715, 0.120, 0.255, 0.670]
  ];
  function bootScene() {
    cascade = 0;
    BOOT.forEach(o => openApp(o[0]));
    const placeAll = () => {
      const W = workarea.clientWidth, H = workarea.clientHeight;
      if (!W) { requestAnimationFrame(placeAll); return; }
      BOOT.forEach(o => {
        const el = workarea.querySelector('.win[data-app="' + o[0] + '"]');
        if (!el) return;
        el.classList.remove("is-anim");
        el.style.left   = Math.round(o[1] * W) + "px";
        el.style.top    = Math.round(o[2] * H) + "px";
        el.style.width  = Math.round(o[3] * W) + "px";
        el.style.height = Math.round(o[4] * H) + "px";
      });
      // restack so the build window reads as the active focus
      ["documenti", "monitor", "terminale", "compilatore"].forEach(id => {
        const rec = wins.find(w => w.app === id);
        if (rec) focus(rec);
      });
    };
    requestAnimationFrame(() => requestAnimationFrame(placeAll));
  }
  bootScene();

  // wire settings inside any opened settings windows (delegated for safety)
  workarea.addEventListener("click", e => {
    const btn = e.target.closest("[data-set]"); if (!btn) return;
    const k = btn.dataset.set, v = btn.dataset.val;
    if (k === "chrome") setChrome(v); else if (k === "theme") setTheme(v); else setOpt(k, v);
  });

  // peek dock briefly on load when autohide
  if (desk.dataset.autohide === "on") { dockWrap.classList.add("peek"); setTimeout(() => dockWrap.classList.remove("peek"), 1400); }
  $("#dock-hot").addEventListener("pointerenter", () => { dockWrap.classList.add("peek"); });
  desk.addEventListener("pointermove", e => { if (desk.dataset.autohide === "on" && e.clientY < window.innerHeight - 90) dockWrap.classList.remove("peek"); });

  window.cmos = { openApp, setChrome, setTheme };
})();
