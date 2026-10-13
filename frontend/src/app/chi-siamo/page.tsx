import type { Metadata } from "next";
import ChiSiamoPage from "@/components/cp/pages/ChiSiamo";

export const metadata: Metadata = {
  title: "Chi siamo | CiMa Progetti",
  description: "CiMa Progetti, Software House di persone a Roma: chi siamo e come siamo fatti.",
};

export default function ChiSiamoRoute() {
  return <ChiSiamoPage />;
}
