"use client";
import dynamic from "next/dynamic";
import { useGsapScrollTrigger } from "@/components/hooks/useGsapScrollTrigger";
import MaterialSymbolsFont from "@/components/MaterialSymbolsFont";

const ApproccioSection = dynamic(() => import("@/components/sections/ApproccioSection"), { ssr: false });
const QuoteSection = dynamic(() => import("@/components/sections/QuoteSection"), { ssr: false });
const ServicesSection = dynamic(() => import("@/components/sections/ServicesSection"), { ssr: false });
const AboutSection = dynamic(() => import("@/components/sections/AboutSection"), { ssr: false });
const FaqSection = dynamic(() => import("@/components/sections/FaqSection"), { ssr: false });
const CtaSection = dynamic(() => import("@/components/sections/CtaSection"), { ssr: false });

export default function HomeSections() {
  useGsapScrollTrigger();

  return (
    <>
      <MaterialSymbolsFont />
      <ApproccioSection />
      <QuoteSection />
      <ServicesSection />
      <AboutSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
