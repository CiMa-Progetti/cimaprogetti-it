import type { Metadata } from "next";
import ProgettiPage from "@/components/cp/pages/Progetti";

export const metadata: Metadata = {
  title: "Progetti | CiMa Progetti",
  description: "Progetti online, casi riservati ed equity: cosa abbiamo costruito e per chi.",
};

export default function ProgettiRoute() {
  return <ProgettiPage />;
}
