"use client";
import { useRouter } from "next/navigation";
import { ROUTE_PATH } from "@/lib/routes";

/* ---------- Placeholder (clearly signalled) ---------- */
export function Placeholder({ label = "Screenshot progetto", icon = "image" }: { label?: string; icon?: string }) {
  return (
    <div className="cm-ph" role="img" aria-label={"Placeholder: " + label}>
      <div className="cm-ph__inner">
        <span className="material-symbols-outlined">{icon}</span>
        <span>{label}</span>
        <span className="cm-ph__tag">[DA INSERIRE]</span>
      </div>
    </div>
  );
}

export function LogoPlaceholder({ name }: { name: string }) {
  return (
    <span className="cm-logo-ph">
      <span className="cm-logo-ph__dot">
        <span className="material-symbols-outlined">corporate_fare</span>
      </span>
      {name}
    </span>
  );
}

/* ---------- Section CTA footer (reused across pages) ---------- */
export function CtaFooter({ title, sub }: { title: string; sub?: string }) {
  const router = useRouter();
  return (
    <section className="cm-upgrade">
      <h2 dangerouslySetInnerHTML={{ __html: title }} />
      {sub && <p>{sub}</p>}
      <button className="cm-cta-btn" onClick={() => router.push(ROUTE_PATH.contatti)} data-cursor="hug">
        Prenota una call
      </button>
    </section>
  );
}
