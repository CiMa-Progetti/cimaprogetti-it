import type { Metadata } from "next";
import LegalePage from "@/components/cp/pages/Legale";

export const metadata: Metadata = {
  title: "Legale | CiMa Progetti",
  description: "Privacy policy, cookie policy e termini e condizioni del sito cimaprogetti.it.",
};

export default function LegaleRoute() {
  return <LegalePage />;
}
