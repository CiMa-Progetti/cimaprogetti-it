/* @ds-bundle: {"format":3,"namespace":"CiMaProgettiDesignSystem_046b2a","components":[{"name":"Logo","sourcePath":"components/brand/Logo.jsx"},{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"NameBadge","sourcePath":"components/cards/NameBadge.jsx"},{"name":"ServiceCard","sourcePath":"components/cards/ServiceCard.jsx"},{"name":"BeforeAfter","sourcePath":"components/comparison/BeforeAfter.jsx"},{"name":"FaqItem","sourcePath":"components/disclosure/FaqItem.jsx"},{"name":"Icon","sourcePath":"components/icons/Icon.jsx"},{"name":"Eyebrow","sourcePath":"components/typography/Eyebrow.jsx"},{"name":"SectionHeading","sourcePath":"components/typography/SectionHeading.jsx"}],"sourceHashes":{"components/brand/Logo.jsx":"d63b53665b0f","components/buttons/Button.jsx":"a87c31019e41","components/cards/NameBadge.jsx":"5a441861a1f5","components/cards/ServiceCard.jsx":"df70644f9f2a","components/comparison/BeforeAfter.jsx":"3bd3274ce885","components/disclosure/FaqItem.jsx":"6a52c3262379","components/icons/Icon.jsx":"da49f7cd2e61","components/typography/Eyebrow.jsx":"00061c9851b9","components/typography/SectionHeading.jsx":"e2d03c66baf3","ui_kits/website/WebsiteContatti.jsx":"249298abd2e3","ui_kits/website/WebsiteFooter.jsx":"335700af2930","ui_kits/website/WebsiteHome.jsx":"99c4d1ce3dce","ui_kits/website/WebsiteNav.jsx":"cb2360dd9e4d"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.CiMaProgettiDesignSystem_046b2a = window.CiMaProgettiDesignSystem_046b2a || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const LOGOS = {
  dark: "/assets/logo.svg",
  white: "/assets/logo-white.svg",
  wordmark: "/assets/inline-logo.svg"
};

/**
 * CiMa wordmark. `variant="dark"` (stacked ci/ma_, near-black) for light
 * backgrounds, `white` for dark, `wordmark` for the inline blue "cima_"
 * lockup used in running headlines. `src` overrides the asset path if the
 * design system lives at a different base.
 */
function Logo({
  variant = "dark",
  height = 48,
  src,
  alt = "CiMa Progetti",
  className = "",
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: `cima-logo ${className}`.trim(),
    style: {
      height,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("img", {
    src: src || LOGOS[variant],
    alt: alt
  }));
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Logo.jsx", error: String((e && e.message) || e) }); }

// components/cards/NameBadge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Bordered name badge with the CiMa initials trick — the first two
 * letters of a surname are highlighted blue (Ci-ardi, Ma-daudo).
 * `tilt` rotates it 20° like the About section.
 */
function NameBadge({
  children,
  initials,
  tilt = false,
  className = "",
  ...rest
}) {
  const cls = ["cima-name-badge", tilt ? "cima-name-badge--tilt" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, rest), children, initials ? /*#__PURE__*/React.createElement("span", {
    className: "cima-accent"
  }, initials) : null);
}
Object.assign(__ds_scope, { NameBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/NameBadge.jsx", error: String((e && e.message) || e) }); }

// components/icons/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Material Symbols Outlined icon — the brand's only icon system.
 * Pass the symbol name (e.g. "memory", "verified_user", "call").
 */
function Icon({
  name,
  size,
  fill = 0,
  weight = 400,
  className = "",
  style = {},
  ...rest
}) {
  const merged = {
    fontSize: size != null ? typeof size === "number" ? `${size}px` : size : undefined,
    fontVariationSettings: `'FILL' ${fill}, 'wght' ${weight}, 'GRAD' 0, 'opsz' 24`,
    ...style
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    className: `material-symbols-outlined cima-icon ${className}`.trim(),
    style: merged,
    "aria-hidden": "true"
  }, rest), name);
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/icons/Icon.jsx", error: String((e && e.message) || e) }); }

// components/buttons/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * CiMa primary action button. Filled electric-blue by default; the
 * brand signature is the hover inversion (fill → outline). Renders as
 * <a> when `href` is given, otherwise <button>.
 */
function Button({
  children,
  variant = "primary",
  size = "lg",
  caps = true,
  href,
  icon,
  iconAfter,
  disabled = false,
  className = "",
  ...rest
}) {
  const cls = ["cima-btn", `cima-btn--${variant}`, `cima-btn--${size}`, caps ? "" : "cima-btn--lower", className].filter(Boolean).join(" ");
  const content = /*#__PURE__*/React.createElement(React.Fragment, null, icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon
  }) : null, children, iconAfter ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconAfter
  }) : null);
  if (href && !disabled) {
    return /*#__PURE__*/React.createElement("a", _extends({
      href: href,
      className: cls,
      "data-cursor": "hug"
    }, rest), content);
  }
  return /*#__PURE__*/React.createElement("button", _extends({
    className: cls,
    disabled: disabled,
    "aria-disabled": disabled
  }, rest), content);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/cards/ServiceCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Dark "concrete" service card — Material icon, uppercase black title
 * (supports \n line breaks), muted description. `compact` lays the icon
 * beside the title for shorter cards.
 */
function ServiceCard({
  icon,
  title,
  children,
  compact = false,
  className = "",
  ...rest
}) {
  const cls = ["cima-service-card", compact ? "cima-service-card--compact" : "", className].filter(Boolean).join(" ");
  if (compact) {
    return /*#__PURE__*/React.createElement("div", _extends({
      className: cls
    }, rest), /*#__PURE__*/React.createElement("div", {
      className: "cima-service-card__top"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "cima-service-card__title"
    }, title), icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: icon,
      className: "cima-service-card__icon",
      style: {
        marginBottom: 0
      }
    }) : null), /*#__PURE__*/React.createElement("p", {
      className: "cima-service-card__desc"
    }, children));
  }
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, rest), icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    className: "cima-service-card__icon"
  }) : null, /*#__PURE__*/React.createElement("div", {
    className: "cima-service-card__body"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "cima-service-card__title"
  }, title), /*#__PURE__*/React.createElement("p", {
    className: "cima-service-card__desc"
  }, children)));
}
Object.assign(__ds_scope, { ServiceCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/ServiceCard.jsx", error: String((e && e.message) || e) }); }

// components/comparison/BeforeAfter.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Two-column Prima / Dopo (Before / After) comparison panel — the
 * brand's recurring "system upgrade" device. Pass arrays of strings.
 */
function BeforeAfter({
  beforeTitle = "Prima",
  afterTitle = "Dopo",
  beforeIcon = "architecture",
  afterIcon = "domain",
  before = [],
  after = [],
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `cima-ba ${className}`.trim()
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "cima-ba__panel cima-ba__panel--prima"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: beforeIcon,
    className: "cima-ba__icon"
  }), /*#__PURE__*/React.createElement("h3", {
    className: "cima-ba__title"
  }, beforeTitle), /*#__PURE__*/React.createElement("ul", {
    className: "cima-ba__list"
  }, before.map((item, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    className: "cima-ba__dot"
  }), item)))), /*#__PURE__*/React.createElement("div", {
    className: "cima-ba__panel cima-ba__panel--after"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: afterIcon,
    className: "cima-ba__icon",
    style: {
      color: "var(--color-primary)"
    }
  }), /*#__PURE__*/React.createElement("h3", {
    className: "cima-ba__title"
  }, afterTitle), /*#__PURE__*/React.createElement("ul", {
    className: "cima-ba__list"
  }, after.map((item, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    className: "cima-ba__dot"
  }), item)))));
}
Object.assign(__ds_scope, { BeforeAfter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/comparison/BeforeAfter.jsx", error: String((e && e.message) || e) }); }

// components/disclosure/FaqItem.jsx
try { (() => {
/**
 * Accordion FAQ row. Controlled via `open` + `onToggle`, or left
 * uncontrolled (manages its own state). Click the row to expand.
 */
function FaqItem({
  question,
  children,
  open,
  onToggle,
  defaultOpen = false
}) {
  const [internal, setInternal] = React.useState(defaultOpen);
  const isOpen = open != null ? open : internal;
  const toggle = () => {
    if (onToggle) onToggle(!isOpen);
    if (open == null) setInternal(v => !v);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "cima-faq",
    "data-open": isOpen ? "true" : "false",
    "data-cursor": "underline",
    onClick: toggle
  }, /*#__PURE__*/React.createElement("div", {
    className: "cima-faq__row"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "cima-faq__q"
  }, question), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "add",
    size: 24,
    className: "cima-faq__icon"
  })), /*#__PURE__*/React.createElement("div", {
    className: "cima-faq__answer"
  }, /*#__PURE__*/React.createElement("p", null, children)));
}
Object.assign(__ds_scope, { FaqItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/disclosure/FaqItem.jsx", error: String((e && e.message) || e) }); }

// components/typography/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Small tracked label that sits above headings — e.g. "L'APPROCCIO",
 * "soluzioni digitali". Default is uppercase wide-tracked blue.
 */
function Eyebrow({
  children,
  tone = "primary",
  lower = false,
  mega = false,
  as = "p",
  className = "",
  ...rest
}) {
  const Tag = as;
  const cls = ["cima-eyebrow", tone !== "primary" ? `cima-eyebrow--${tone}` : "", lower ? "cima-eyebrow--lower" : "", mega ? "cima-eyebrow--mega" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls
  }, rest), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/typography/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/typography/SectionHeading.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Mono-display section heading. Defaults to the brand's lowercase
 * IBM Plex Mono style. Wrap accented words in <span className="cima-accent">
 * or pass `accent` to color a trailing fragment blue. Renders the blue
 * accent bar beneath when `bar` is set.
 */
function SectionHeading({
  children,
  level = "h2",
  variant = "lower",
  light = false,
  bar = false,
  as,
  className = "",
  ...rest
}) {
  const Tag = as || (level === "display" ? "h1" : level === "h3" ? "h3" : "h2");
  const cls = ["cima-heading", `cima-heading--${level}`, variant !== "default" ? `cima-heading--${variant}` : "", light ? "cima-heading--light" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls
  }, rest), children), bar ? /*#__PURE__*/React.createElement("div", {
    className: "accent-bar",
    style: {
      marginTop: "1.25rem"
    }
  }) : null);
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/typography/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/WebsiteContatti.jsx
try { (() => {
// CiMa website — contatti page (recreates contatti/page.tsx)
const {
  Icon: CIcon
} = window.CiMaProgettiDesignSystem_046b2a;
const PEOPLE = [{
  name: "Nicola Leone Ciardi",
  role: "Co-Founder & CEO",
  bio: "Management and computer science.",
  tel: "+39 338 245 1178",
  mail: "nicolaleone.ciardi@cimaprogetti.it"
}, {
  name: "Valentina Madaudo",
  role: "Co-Founder & CFO",
  bio: "Jr Engineer & economist for sustainable development.",
  tel: "+39 339 358 0805",
  mail: "valentina.madaudo@cimaprogetti.it"
}];
function WebsiteContatti() {
  return /*#__PURE__*/React.createElement("div", {
    className: "web-contatti"
  }, /*#__PURE__*/React.createElement("section", {
    className: "web-contatti__hero"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-huge web-contatti__h1"
  }, "CONTATTI"), /*#__PURE__*/React.createElement("div", {
    className: "accent-bar",
    style: {
      marginTop: "1rem"
    }
  })), /*#__PURE__*/React.createElement("p", {
    className: "web-contatti__intro"
  }, "Parliamo del tuo prossimo progetto. Nessun impegno, solo una conversazione.")), /*#__PURE__*/React.createElement("section", {
    className: "web-contatti__general"
  }, /*#__PURE__*/React.createElement("div", {
    className: "web-contatti__channels"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "web-contatti__eyebrow"
  }, "contatti"), /*#__PURE__*/React.createElement("div", {
    className: "web-contatti__channel"
  }, /*#__PURE__*/React.createElement("p", {
    className: "web-contatti__chlabel"
  }, "whatsapp"), /*#__PURE__*/React.createElement("a", {
    href: "tel:+393382451171",
    "data-cursor": "hug"
  }, "+39 338 245 1171")), /*#__PURE__*/React.createElement("div", {
    className: "web-contatti__channel"
  }, /*#__PURE__*/React.createElement("p", {
    className: "web-contatti__chlabel"
  }, "email"), /*#__PURE__*/React.createElement("a", {
    className: "is-underline",
    href: "mailto:info@cimaprogetti.it",
    "data-cursor": "hug"
  }, "info@cimaprogetti.it"))), /*#__PURE__*/React.createElement("div", {
    className: "web-contatti__img"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/contatti.jpg",
    alt: "Dettaglio architettonico"
  }), /*#__PURE__*/React.createElement("div", {
    className: "web-contatti__imgtint"
  }))), /*#__PURE__*/React.createElement("section", {
    className: "web-contatti__people"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "web-contatti__eyebrow"
  }, "people behind cima"), /*#__PURE__*/React.createElement("div", {
    className: "web-contatti__pgrid"
  }, PEOPLE.map(p => /*#__PURE__*/React.createElement("div", {
    className: "web-person",
    key: p.name
  }, /*#__PURE__*/React.createElement("h3", null, p.name), /*#__PURE__*/React.createElement("p", {
    className: "web-person__role"
  }, p.role), /*#__PURE__*/React.createElement("p", {
    className: "web-person__bio"
  }, p.bio), /*#__PURE__*/React.createElement("div", {
    className: "web-person__links"
  }, /*#__PURE__*/React.createElement("a", {
    href: "tel:" + p.tel.replace(/\s/g, "")
  }, /*#__PURE__*/React.createElement(CIcon, {
    name: "call",
    style: {
      color: "var(--color-primary)"
    }
  }), p.tel), /*#__PURE__*/React.createElement("a", {
    href: "mailto:" + p.mail
  }, /*#__PURE__*/React.createElement(CIcon, {
    name: "mail",
    style: {
      color: "var(--color-primary)"
    }
  }), p.mail)))))));
}
window.WebsiteContatti = WebsiteContatti;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/WebsiteContatti.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/WebsiteFooter.jsx
try { (() => {
// CiMa website — footer (recreates Footer.tsx)
function WebsiteFooter() {
  const social = [{
    label: "Facebook",
    d: "M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.13 8.44 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99C18.34 21.13 22 16.99 22 12z"
  }, {
    label: "Instagram",
    d: "M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 01-1.38-.9 3.7 3.7 0 01-.9-1.38c-.16-.43-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2zm0 3.65A6.15 6.15 0 1018.15 12 6.15 6.15 0 0012 5.85zm0 10.15A4 4 0 1116 12a4 4 0 01-4 4zm6.4-10.4a1.44 1.44 0 11-1.44-1.44 1.44 1.44 0 011.44 1.44z"
  }, {
    label: "LinkedIn",
    d: "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"
  }, {
    label: "TikTok",
    d: "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.3 0 .59.04.86.11V9a6.27 6.27 0 00-.86-.06 6.33 6.33 0 00-6.33 6.33A6.33 6.33 0 009.49 21.6a6.33 6.33 0 006.33-6.33V8.78a8.18 8.18 0 003.77.92V6.69z"
  }];
  return /*#__PURE__*/React.createElement("footer", {
    className: "web-foot"
  }, /*#__PURE__*/React.createElement("div", {
    className: "web-foot__grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "web-foot__col"
  }, /*#__PURE__*/React.createElement("span", {
    className: "web-foot__brand"
  }, "CIMA PROGETTI ", /*#__PURE__*/React.createElement("span", {
    style: {
      textTransform: "none"
    }
  }, "Srls")), /*#__PURE__*/React.createElement("p", {
    className: "web-foot__note"
  }, "Scoprirci anche sui nostri canali social"), /*#__PURE__*/React.createElement("div", {
    className: "web-foot__social"
  }, social.map(s => /*#__PURE__*/React.createElement("a", {
    key: s.label,
    href: "#",
    "aria-label": s.label,
    "data-cursor": "hug",
    onClick: e => e.preventDefault()
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "36",
    height: "36",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: s.d
  })))))), /*#__PURE__*/React.createElement("div", {
    className: "web-foot__col"
  }, /*#__PURE__*/React.createElement("h4", null, "Legals"), /*#__PURE__*/React.createElement("p", {
    className: "web-foot__muted"
  }, "Via Otranto 39", /*#__PURE__*/React.createElement("br", null), "00192 Roma, Italia"), /*#__PURE__*/React.createElement("p", {
    className: "web-foot__muted"
  }, "REA RM-1778381")), /*#__PURE__*/React.createElement("div", {
    className: "web-foot__col"
  }, /*#__PURE__*/React.createElement("h4", null, "Supporto"), /*#__PURE__*/React.createElement("ul", {
    className: "web-foot__list"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault()
  }, "Privacy Policy")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault()
  }, "Termini e Condizioni")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault()
  }, "FAQ")))), /*#__PURE__*/React.createElement("div", {
    className: "web-foot__col"
  }, /*#__PURE__*/React.createElement("h4", null, "Contatti"), /*#__PURE__*/React.createElement("ul", {
    className: "web-foot__list"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "mailto:info@cimaprogetti.it"
  }, "info@cimaprogetti.it")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "tel:+393382451171"
  }, "+39 338 245 1171")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "mailto:cima.progetti@pec-societa.it"
  }, "cima.progetti@pec-societa.it"))))), /*#__PURE__*/React.createElement("div", {
    className: "web-foot__bar"
  }, "\xA9 2025 CIMA PROGETTI. ", /*#__PURE__*/React.createElement("span", {
    style: {
      textTransform: "none"
    }
  }, "Soluzioni digitali"), "."), /*#__PURE__*/React.createElement("span", {
    className: "web-foot__mark"
  }, "CIMA"));
}
window.WebsiteFooter = WebsiteFooter;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/WebsiteFooter.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/WebsiteHome.jsx
try { (() => {
// CiMa website — home page composition
const {
  Button: HBtn,
  Eyebrow,
  SectionHeading,
  ServiceCard,
  BeforeAfter,
  FaqItem,
  NameBadge,
  Logo: HLogo
} = window.CiMaProgettiDesignSystem_046b2a;
const TOP_SERVICES = [{
  icon: "memory",
  title: "POTENZIA\nI TUOI PROCESSI",
  body: /*#__PURE__*/React.createElement(React.Fragment, null, "Dalle ", /*#__PURE__*/React.createElement("strong", null, "automazioni"), " che alleggeriscono lavori ripetitivi, fino a report esaustivi sui tuoi dati realizzati dall'", /*#__PURE__*/React.createElement("strong", null, "intelligenza artificiale"), ".")
}, {
  icon: "schema",
  title: "ORGANIZZA\n& GESTISCI",
  body: /*#__PURE__*/React.createElement(React.Fragment, null, "Sviluppiamo ", /*#__PURE__*/React.createElement("strong", null, "dashboard"), " e ", /*#__PURE__*/React.createElement("strong", null, "gestionali"), " strutturati sulle tue esigenze aziendali: sistemi su misura che riflettono i vostri processi reali.")
}, {
  icon: "verified_user",
  title: "PROTEGGI\nI TUOI DATI",
  body: /*#__PURE__*/React.createElement(React.Fragment, null, "Blindiamo l'ecosistema digitale con ", /*#__PURE__*/React.createElement("strong", null, "soluzioni di cybersicurezza"), " reali: dai protocolli di difesa proattivi a un monitoraggio costante degli asset.")
}];
const FAQS = [{
  q: "Realizzate solo siti web?",
  a: "No. Progettiamo ecosistemi digitali completi: siti, ecommerce, funnel di conversione, piattaforme, dashboard, automazioni, integrazioni e infrastrutture digitali costruite per supportare la crescita."
}, {
  q: "Cosa vi distingue da una classica agenzia?",
  a: "Non ci fermiamo al design o allo sviluppo di singoli asset. Lavoriamo come partner tecnico e strategico, progettando soluzioni che collegano immagine, processi, strumenti e performance in un sistema più ordinato, efficiente e misurabile."
}, {
  q: "Come utilizzate l'IA nei progetti?",
  a: "Usiamo l'IA come leva per accelerare, organizzare e potenziare i processi, senza sostituire il valore umano. La tecnologia aumenta velocità e precisione; strategia, controllo e decisioni restano guidati dall'esperienza."
}, {
  q: "Ci seguite anche dopo la realizzazione?",
  a: "Sì. Un progetto digitale funziona davvero quando può evolversi nel tempo. Per questo accompagniamo il cliente anche nelle fasi di ottimizzazione, miglioramento e crescita del sistema implementato."
}, {
  q: "Perché scegliere CiMa come partner?",
  a: "Perché uniamo visione progettuale, competenze tecniche e un approccio aggiornato ai sistemi digitali contemporanei. Costruiamo soluzioni concrete, utili, sostenibili e davvero integrate nel lavoro quotidiano."
}];
function WebsiteHome({
  onNavigate
}) {
  const [openFaq, setOpenFaq] = React.useState(0);
  return /*#__PURE__*/React.createElement("div", {
    className: "web-home"
  }, /*#__PURE__*/React.createElement("section", {
    className: "web-hero"
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    lower: true
  }, "soluzioni digitali"), /*#__PURE__*/React.createElement("h1", {
    className: "web-hero__title"
  }, "Porta in ", /*#__PURE__*/React.createElement(HLogo, {
    variant: "wordmark",
    height: 64,
    src: "../../assets/inline-logo.svg"
  }), /*#__PURE__*/React.createElement("br", null), "il tuo business."), /*#__PURE__*/React.createElement("p", {
    className: "web-hero__sub"
  }, "Il tuo partner per scalare nella transizione 5.0:", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("strong", null, "leader in automazioni IA, conversione online e infrastrutture digitali per le aziende.")), /*#__PURE__*/React.createElement("div", {
    className: "web-hero__cta"
  }, /*#__PURE__*/React.createElement(HBtn, {
    href: "#servizi",
    onClick: e => {
      e.preventDefault();
      document.getElementById("servizi").scrollIntoView({
        behavior: "smooth"
      });
    }
  }, "Vai ai servizi"), /*#__PURE__*/React.createElement(HBtn, {
    variant: "outline",
    onClick: () => onNavigate("contatti")
  }, "Contattaci"))), /*#__PURE__*/React.createElement("section", {
    className: "web-band"
  }, /*#__PURE__*/React.createElement("div", {
    className: "web-band__inner"
  }, /*#__PURE__*/React.createElement("h2", null, "Scopri la nostra garanzia."), /*#__PURE__*/React.createElement("p", null, "Tutti i nostri servizi sono coperti da garanzia completa."))), /*#__PURE__*/React.createElement("section", {
    id: "servizi",
    className: "web-sec web-services"
  }, /*#__PURE__*/React.createElement("div", {
    className: "web-services__head"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    level: "h2",
    bar: true
  }, "Servizi ", /*#__PURE__*/React.createElement("span", {
    className: "cima-accent"
  }, "essenziali"), ". Impatto concreto."), /*#__PURE__*/React.createElement("p", {
    className: "web-lead"
  }, "Trasformiamo esigenze operative e obiettivi aziendali in strumenti concreti. Ogni servizio \xE8 pensato per semplificare la gestione, migliorare i processi e dare struttura alla crescita.")), /*#__PURE__*/React.createElement("div", {
    className: "web-services__grid"
  }, TOP_SERVICES.map(s => /*#__PURE__*/React.createElement(ServiceCard, {
    key: s.icon,
    icon: s.icon,
    title: s.title
  }, s.body)), /*#__PURE__*/React.createElement("div", {
    className: "web-services__wide"
  }, /*#__PURE__*/React.createElement(ServiceCard, {
    compact: true,
    icon: "hub",
    title: "CONNETTI & DAI FORMA\nALLA TUA IDEA"
  }, /*#__PURE__*/React.createElement("strong", null, "App"), ", ", /*#__PURE__*/React.createElement("strong", null, "piattaforme"), " e ", /*#__PURE__*/React.createElement("strong", null, "infrastrutture digitali"), ": architetture progettate per dare vita ai tuoi progetti e connettere il tuo lavoro.")), /*#__PURE__*/React.createElement(ServiceCard, {
    compact: true,
    icon: "shopping_bag",
    title: "VENDI I TUOI\nPRODOTTI"
  }, "Sviluppiamo E-commerce per gestire ogni fase della vendita."))), /*#__PURE__*/React.createElement("section", {
    className: "web-quote"
  }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "\"Trasformiamo le tue idee in realt\xE0 digitale"), ":", /*#__PURE__*/React.createElement("br", null), "velocit\xE0 dell'IA ed esperienza umana, animate della tua esperienza.\"")), /*#__PURE__*/React.createElement("section", {
    id: "approccio",
    className: "web-sec web-approccio"
  }, /*#__PURE__*/React.createElement("div", {
    className: "web-approccio__head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "L'approccio"), /*#__PURE__*/React.createElement(SectionHeading, {
    level: "h2"
  }, "Ecosistema", /*#__PURE__*/React.createElement("br", null), "integrato")), /*#__PURE__*/React.createElement("p", {
    className: "web-lead"
  }, "Non costruiamo software isolati, ma infrastrutture digitali portanti. Ogni riga di codice \xE8 un pilastro, ogni interfaccia un varco funzionale verso l'efficienza operativa. La nostra visione architettonica trasforma il caos informativo in un sistema di precisione millimetrica.")), /*#__PURE__*/React.createElement(BeforeAfter, {
    before: ["Database frammentati", "Processi manuali obsoleti", "Vulnerabilità di sistema", "Perdita di controllo strategico"],
    after: ["Flussi centralizzati", "Automazione intelligente", "Crittografia militare", "Dashboard decisionali real-time"]
  })), /*#__PURE__*/React.createElement("section", {
    id: "chi-siamo",
    className: "web-sec web-about"
  }, /*#__PURE__*/React.createElement("div", {
    className: "web-about__photo",
    "data-cursor": "hug"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/team.jpg",
    alt: "Nicola Leone Ciardi e Valentina Madaudo"
  })), /*#__PURE__*/React.createElement("div", {
    className: "web-about__body"
  }, /*#__PURE__*/React.createElement("p", {
    className: "web-muted"
  }, "Due figure giovani, ma strutturate: il dualismo di tecnica e visione, processo e creativit\xE0, velocit\xE0 e consapevolezza."), /*#__PURE__*/React.createElement(SectionHeading, {
    level: "h2"
  }, "Dall'idea", /*#__PURE__*/React.createElement("br", null), "ai processi.", /*#__PURE__*/React.createElement("br", null), "Dalla ", /*#__PURE__*/React.createElement("span", {
    className: "cima-accent"
  }, "visione"), /*#__PURE__*/React.createElement("br", null), "al sistema."), /*#__PURE__*/React.createElement("p", {
    className: "web-muted"
  }, "Perch\xE9 per noi innovare significa integrare competenze e prospettive, per costruire soluzioni che non siano solo funzionali, ma solide nel tempo."), /*#__PURE__*/React.createElement("div", {
    className: "web-about__divider"
  }), /*#__PURE__*/React.createElement("div", {
    className: "web-about__badges"
  }, /*#__PURE__*/React.createElement(NameBadge, {
    initials: "Ciardi"
  }, "Nicola Leone\xA0"), /*#__PURE__*/React.createElement(NameBadge, {
    initials: "Madaudo",
    tilt: true
  }, "Valentina\xA0")))), /*#__PURE__*/React.createElement("section", {
    id: "progetti",
    className: "web-cta"
  }, /*#__PURE__*/React.createElement("h2", null, "SYSTEM", /*#__PURE__*/React.createElement("br", null), "UPGRADE"), /*#__PURE__*/React.createElement("p", null, "Progettiamo insieme", /*#__PURE__*/React.createElement("br", null), "il prossimo tassello digitale", /*#__PURE__*/React.createElement("br", null), "della tua azienda."), /*#__PURE__*/React.createElement(HBtn, {
    variant: "white",
    onClick: () => onNavigate("contatti")
  }, "Contattaci")), /*#__PURE__*/React.createElement("section", {
    className: "web-sec web-faq"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "web-faq__title"
  }, "FAQs"), /*#__PURE__*/React.createElement("div", {
    className: "web-faq__list"
  }, FAQS.map((f, i) => /*#__PURE__*/React.createElement(FaqItem, {
    key: i,
    question: f.q,
    open: openFaq === i,
    onToggle: () => setOpenFaq(openFaq === i ? null : i)
  }, f.a)))));
}
window.WebsiteHome = WebsiteHome;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/WebsiteHome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/WebsiteNav.jsx
try { (() => {
// CiMa website — top navigation bar (recreates Navbar.tsx)
const {
  Logo,
  Button
} = window.CiMaProgettiDesignSystem_046b2a;
function WebsiteNav({
  route,
  onNavigate,
  active
}) {
  const [scrolled, setScrolled] = React.useState(false);
  const links = [{
    label: "Servizi",
    id: "servizi"
  }, {
    label: "Il metodo",
    id: "approccio"
  }, {
    label: "Progetti",
    id: "progetti"
  }, {
    label: "Chi Siamo",
    id: "chi-siamo"
  }];
  React.useEffect(() => {
    const scroller = document.querySelector(".kit-scroll");
    if (!scroller) return;
    const onScroll = () => setScrolled(scroller.scrollTop > 40);
    scroller.addEventListener("scroll", onScroll, {
      passive: true
    });
    return () => scroller.removeEventListener("scroll", onScroll);
  }, []);
  const go = id => {
    if (route !== "home") {
      onNavigate("home", id);
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };
  return /*#__PURE__*/React.createElement("nav", {
    className: "web-nav" + (scrolled ? " web-nav--scrolled" : "")
  }, /*#__PURE__*/React.createElement("div", {
    className: "web-nav__inner"
  }, /*#__PURE__*/React.createElement("button", {
    className: "web-nav__logo",
    onClick: () => onNavigate("home"),
    "aria-label": "Home"
  }, /*#__PURE__*/React.createElement(Logo, {
    variant: "dark",
    height: scrolled ? 40 : 56,
    src: "../../assets/logo.svg"
  })), /*#__PURE__*/React.createElement("div", {
    className: "web-nav__links"
  }, links.map(l => /*#__PURE__*/React.createElement("button", {
    key: l.id,
    className: "web-nav__link" + (active === l.id ? " is-active" : ""),
    onClick: () => go(l.id),
    "data-cursor": "hug"
  }, l.label))), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    caps: false,
    size: "sm",
    onClick: () => onNavigate("contatti")
  }, "Contattaci")));
}
window.WebsiteNav = WebsiteNav;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/WebsiteNav.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.NameBadge = __ds_scope.NameBadge;

__ds_ns.ServiceCard = __ds_scope.ServiceCard;

__ds_ns.BeforeAfter = __ds_scope.BeforeAfter;

__ds_ns.FaqItem = __ds_scope.FaqItem;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

})();
