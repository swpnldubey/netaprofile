import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PoliticiansClient from "@/components/PoliticiansClient";
import { getAllPoliticians } from "@/lib/politicians";

export const metadata: Metadata = {
  title: "All Politicians | NetaProfile",
  description:
    "Browse all Indian politicians tracked on NetaProfile. Filter by party, state, and career history.",
};

export default function PoliticiansPage() {
  const politicians = getAllPoliticians();

  return (
    <>
      <Header />
      <main className="flex-1">
        <PoliticiansClient politicians={politicians} />
      </main>
      <Footer />
    </>
  );
}
