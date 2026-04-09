"use client";
import { useGsapScrollTrigger } from "@/components/hooks/useGsapScrollTrigger";
import HeroSection from "@/components/sections/HeroSection";
import ApproccioSection from "@/components/sections/ApproccioSection";
import BeforeAfterSection from "@/components/sections/BeforeAfterSection";
import ServicesSection from "@/components/sections/ServicesSection";
import AboutSection from "@/components/sections/AboutSection";
import FilosofiaSection from "@/components/sections/FilosofiaSection";
import CtaSection from "@/components/sections/CtaSection";

export default function Home() {
  useGsapScrollTrigger();

  return (
    <div className="snap-container">
      <HeroSection />
      <ApproccioSection />
      <BeforeAfterSection />
      <ServicesSection />
      <AboutSection />
      <FilosofiaSection />
      <CtaSection />
    </div>
  );
}
