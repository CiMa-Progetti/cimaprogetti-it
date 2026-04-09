"use client";
import dynamic from "next/dynamic";
import { useGsapScrollTrigger } from "@/components/hooks/useGsapScrollTrigger";

const ApproccioSection = dynamic(() => import("@/components/sections/ApproccioSection"), { ssr: false });
const BeforeAfterSection = dynamic(() => import("@/components/sections/BeforeAfterSection"), { ssr: false });
const ServicesSection = dynamic(() => import("@/components/sections/ServicesSection"), { ssr: false });
const AboutSection = dynamic(() => import("@/components/sections/AboutSection"), { ssr: false });
const FilosofiaSection = dynamic(() => import("@/components/sections/FilosofiaSection"), { ssr: false });
const CtaSection = dynamic(() => import("@/components/sections/CtaSection"), { ssr: false });

export default function HomeSections() {
  useGsapScrollTrigger();

  return (
    <>
      <ApproccioSection />
      <BeforeAfterSection />
      <ServicesSection />
      <AboutSection />
      <FilosofiaSection />
      <CtaSection />
    </>
  );
}
