"use client";
// ============================================================
// CiMa Progetti — Design System primitives (ported from DS bundle)
// Class-based, styled by cima-design.css. data-cursor preserved.
// ============================================================
import React from "react";

/* ---------- Logo ---------- */
const LOGOS: Record<string, string> = {
  dark: "/logo.svg",
  white: "/logo-white.svg",
  wordmark: "/inline-logo.svg",
};
export function Logo({
  variant = "dark",
  height = 48,
  src,
  alt = "CiMa Progetti",
  className = "",
  style = {},
  ...rest
}: {
  variant?: "dark" | "white" | "wordmark";
  height?: number;
  src?: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
} & React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={`cima-logo ${className}`.trim()} style={{ height, ...style }} {...rest}>
      <img src={src || LOGOS[variant]} alt={alt} />
    </span>
  );
}

/* ---------- Icon ---------- */
export function Icon({
  name,
  size,
  fill = 0,
  weight = 400,
  className = "",
  style = {},
  ...rest
}: {
  name: string;
  size?: number | string;
  fill?: number;
  weight?: number;
  className?: string;
  style?: React.CSSProperties;
} & React.HTMLAttributes<HTMLSpanElement>) {
  const merged: React.CSSProperties = {
    fontSize: size != null ? (typeof size === "number" ? `${size}px` : size) : undefined,
    fontVariationSettings: `'FILL' ${fill}, 'wght' ${weight}, 'GRAD' 0, 'opsz' 24`,
    ...style,
  };
  return (
    <span className={`material-symbols-outlined cima-icon ${className}`.trim()} style={merged} aria-hidden="true" {...rest}>
      {name}
    </span>
  );
}

/* ---------- Button ---------- */
export function Button({
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
}: {
  children?: React.ReactNode;
  variant?: "primary" | "outline" | "white" | "outline-light";
  size?: "sm" | "md" | "lg";
  caps?: boolean;
  href?: string;
  icon?: string;
  iconAfter?: string;
  disabled?: boolean;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement> & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const cls = ["cima-btn", `cima-btn--${variant}`, `cima-btn--${size}`, caps ? "" : "cima-btn--lower", className]
    .filter(Boolean)
    .join(" ");
  const content = (
    <>
      {icon ? <Icon name={icon} /> : null}
      {children}
      {iconAfter ? <Icon name={iconAfter} /> : null}
    </>
  );
  if (href && !disabled) {
    return (
      <a href={href} className={cls} data-cursor="hug" {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </a>
    );
  }
  return (
    <button className={cls} disabled={disabled} aria-disabled={disabled} data-cursor="hug" {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}

/* ---------- Eyebrow ---------- */
export function Eyebrow({
  children,
  tone = "primary",
  lower = false,
  mega = false,
  as: Tag = "p",
  className = "",
  ...rest
}: {
  children?: React.ReactNode;
  tone?: "primary" | "muted" | "faint" | "light";
  lower?: boolean;
  mega?: boolean;
  as?: React.ElementType;
  className?: string;
} & React.HTMLAttributes<HTMLElement>) {
  const cls = [
    "cima-eyebrow",
    tone !== "primary" ? `cima-eyebrow--${tone}` : "",
    lower ? "cima-eyebrow--lower" : "",
    mega ? "cima-eyebrow--mega" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <Tag className={cls} {...rest}>
      {children}
    </Tag>
  );
}

/* ---------- Section heading ---------- */
export function SectionHeading({
  children,
  level = "h2",
  variant = "lower",
  light = false,
  bar = false,
  as,
  className = "",
  ...rest
}: {
  children?: React.ReactNode;
  level?: "display" | "h2" | "h3";
  variant?: "lower" | "upper" | "default";
  light?: boolean;
  bar?: boolean;
  as?: React.ElementType;
  className?: string;
} & React.HTMLAttributes<HTMLHeadingElement>) {
  const Tag: React.ElementType = as || (level === "display" ? "h1" : level === "h3" ? "h3" : "h2");
  const cls = [
    "cima-heading",
    `cima-heading--${level}`,
    variant !== "default" ? `cima-heading--${variant}` : "",
    light ? "cima-heading--light" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <>
      <Tag className={cls} {...rest}>
        {children}
      </Tag>
      {bar ? <div className="accent-bar" style={{ marginTop: "1.25rem" }} /> : null}
    </>
  );
}

/* ---------- Service card ---------- */
export function ServiceCard({
  icon,
  title,
  children,
  compact = false,
  className = "",
  ...rest
}: {
  icon?: string;
  title?: React.ReactNode;
  children?: React.ReactNode;
  compact?: boolean;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  const cls = ["cima-service-card", compact ? "cima-service-card--compact" : "", className].filter(Boolean).join(" ");
  if (compact) {
    return (
      <div className={cls} {...rest}>
        <div className="cima-service-card__top">
          <h3 className="cima-service-card__title">{title}</h3>
          {icon ? <Icon name={icon} className="cima-service-card__icon" style={{ marginBottom: 0 }} /> : null}
        </div>
        <p className="cima-service-card__desc">{children}</p>
      </div>
    );
  }
  return (
    <div className={cls} {...rest}>
      {icon ? <Icon name={icon} className="cima-service-card__icon" /> : null}
      <div className="cima-service-card__body">
        <h3 className="cima-service-card__title">{title}</h3>
        <p className="cima-service-card__desc">{children}</p>
      </div>
    </div>
  );
}

/* ---------- Before / After ---------- */
export function BeforeAfter({
  beforeTitle = "Prima",
  afterTitle = "Dopo",
  beforeIcon = "architecture",
  afterIcon = "domain",
  before = [],
  after = [],
  className = "",
  ...rest
}: {
  beforeTitle?: string;
  afterTitle?: string;
  beforeIcon?: string;
  afterIcon?: string;
  before?: string[];
  after?: string[];
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`cima-ba ${className}`.trim()} {...rest}>
      <div className="cima-ba__panel cima-ba__panel--prima">
        <Icon name={beforeIcon} className="cima-ba__icon" />
        <h3 className="cima-ba__title">{beforeTitle}</h3>
        <ul className="cima-ba__list">
          {before.map((item, i) => (
            <li key={i}>
              <span className="cima-ba__dot" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="cima-ba__panel cima-ba__panel--after">
        <Icon name={afterIcon} className="cima-ba__icon" style={{ color: "var(--color-primary)" }} />
        <h3 className="cima-ba__title">{afterTitle}</h3>
        <ul className="cima-ba__list">
          {after.map((item, i) => (
            <li key={i}>
              <span className="cima-ba__dot" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---------- Name badge ---------- */
export function NameBadge({
  children,
  initials,
  tilt = false,
  className = "",
  ...rest
}: {
  children?: React.ReactNode;
  initials?: string;
  tilt?: boolean;
  className?: string;
} & React.HTMLAttributes<HTMLSpanElement>) {
  const cls = ["cima-name-badge", tilt ? "cima-name-badge--tilt" : "", className].filter(Boolean).join(" ");
  return (
    <span className={cls} {...rest}>
      {children}
      {initials ? <span className="cima-accent">{initials}</span> : null}
    </span>
  );
}

/* ---------- FAQ item ---------- */
export function FaqItem({
  question,
  children,
  open,
  onToggle,
  defaultOpen = false,
}: {
  question: React.ReactNode;
  children?: React.ReactNode;
  open?: boolean;
  onToggle?: (next: boolean) => void;
  defaultOpen?: boolean;
}) {
  const [internal, setInternal] = React.useState(defaultOpen);
  const isOpen = open != null ? open : internal;
  const toggle = () => {
    if (onToggle) onToggle(!isOpen);
    if (open == null) setInternal((v) => !v);
  };
  return (
    <div
      className="cima-faq"
      data-open={isOpen ? "true" : "false"}
      {...(isOpen ? { "data-faq-open": "true" } : {})}
      data-cursor="underline"
      onClick={toggle}
    >
      <div className="cima-faq__row">
        <h3 className="cima-faq__q">{question}</h3>
        <Icon name="add" size={24} className="cima-faq__icon" />
      </div>
      <div className="cima-faq__answer">
        <p>{children}</p>
      </div>
    </div>
  );
}
