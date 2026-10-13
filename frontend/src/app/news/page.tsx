import type { Metadata } from "next";
import NewsPage from "@/components/cp/pages/News";

export const metadata: Metadata = {
  title: "News | CiMa Progetti",
  description: "Aggiornamenti, press e progetti di CiMa Progetti.",
};

export default function NewsRoute() {
  return <NewsPage />;
}
